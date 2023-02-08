import React, { useCallback, useReducer ,useContext} from 'react';
 import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/Button/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/validators.js';
import { MoonLoader } from 'react-spinners';
import useHttpClient from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/components/UIElements/ImageUpload';

import './NewPlace.css';
 

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      image:{
        value:null,
        isValid:false
      },
      address:{
        value:"",
        isValid:false
      }
    },
    isValid: false
  });

  const auth = useContext(AuthContext)
  
  const {isLoading , sendRequest} = useHttpClient()
  const history  = useHistory()
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const placeSubmitHandler = async event => {
    event.preventDefault();
       
    try{
      let formData = new FormData()
      formData.append("title",formState.inputs.title.value)
      formData.append("description",formState.inputs.description.value)
      formData.append("address",formState.inputs.address.value)
      formData.append("image",formState.inputs.image.value)

      formData.append("creator", auth.userId)

      await sendRequest("http://localhost:5000/api/Places" ,"POST" , formData )

     history.push("/")
    }
    catch(err)
    { 
      console.log(err)
    }

  };
 
  return ( 
    <>

     {  isLoading ? <div className='spinner' >
     <MoonLoader color='green' loading={isLoading} size="70px" />
     </div> : 
     <div>
        <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <ImageUpload id={"image"} onInput={inputHandler}  center />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
    </div>
    }
    </>
        
   
  
  );
};

export default NewPlace;