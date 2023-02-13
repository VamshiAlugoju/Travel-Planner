
import React, { useEffect, useState,useContext } from 'react';
import { useParams ,useHistory } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Input from '../../shared/components/Button/Input';
import Button from '../../shared/components/Button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/validators';
import { useForm } from '../../shared/hooks/hook';
import useHttpClient from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
 
import "./NewPlace.css"
  
  


const UpdatePlace = () => {
  
  const placeId = useParams().placeId;
  const {isLoading , sendRequest} = useHttpClient()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const[ loadedPlace , setloadedPlace ]= useState()

  useEffect(() => {
      
     (async function(){
             try{

               let place =  await sendRequest(`http://localhost:5000/api/Places/${placeId}`)
               setloadedPlace(place.place);
               setFormData(
                 {
                   title: {
                     value: loadedPlace.title,
                     isValid: true
                   },
                   description: {
                     value: loadedPlace.description,
                     isValid: true
                   }
                 },
                 true
               );

             }catch(err){}
     })()
    
  }, [setFormData,sendRequest, placeId]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    
    let data;
          async function update(){

          try{
            
             data =  await sendRequest(import.meta.env.VITE_REACT_APP_BACKEND_URL+`/Places/${placeId}` ,"PATCH" ,JSON.stringify({
              title:formState.inputs.title.value,
              description:formState.inputs.description.value,
            }),{
                "Content-Type":"application/json",
                Authorization:"Bearer " + auth.token
              } 
              )
              
              }catch(err)
              {
            console.log(err)
               }
        }
         update()
      
        
       
  };

  if (isLoading) {
    return (
      <div className="spinner">
          <MoonLoader color='green' loading={isLoading} size="70px" />
      </div>
    );
  }

  if (!loadedPlace && isLoading ) {
    return (
      <div className="center">
         <h1>couldn't find places</h1>
      </div>
    );
  }

  return (
    <>
    {!isLoading && loadedPlace &&    
    
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
    }
    </>
  );
};

export default UpdatePlace;