import React , {useContext , useState } from 'react';
import { MoonLoader } from 'react-spinners';

import Card from '../shared/components/UIElements/Card';
import Input from '../shared/components/Button/Input';
import Button from '../shared/components/Button/Button';
 import useHttpClient from '../shared/hooks/http-hook';
import ImageUpload from '../shared/components/UIElements/ImageUpload';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../shared/components/validators.js';
import { AuthContext } from '../shared/context/auth-context';

import { useForm } from '../shared/hooks/hook';
import './Auth.css';
 

 
 
  const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading , sendRequest} = useHttpClient()
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value:null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler =async event => {
    event.preventDefault();
  
    if(isLoginMode)
    {
      try{
        const url = "http://localhost:5000/api/users/login";

        let user =  await sendRequest(url,"POST",JSON.stringify({
          email:formState.inputs.email.value,
          password:formState.inputs.password.value 
        }),{
          "Content-Type":"application/json"
        });
         
        auth.login(user.userId , user.token , user.name)
      }catch(err){
        console.log( "this error " , err)
      } 
    } else{
      try{
         
        let formData = new FormData()
        formData.append("name",formState.inputs.name.value)
        formData.append("email",formState.inputs.email.value)
        formData.append("password",formState.inputs.password.value)
        formData.append("image",formState.inputs.image.value)


        let user =   await sendRequest("http://localhost:5000/api/users/signUp",
             "POST", 
              formData 
        );
       
        auth.login(user.userId,user.token ,user.name)
      }catch(err){
        console.log( "this error " , err)
      }
    }
    
  

  };
  
  return (
    <>  
     
    { isLoading ? <div className='spinner' >
     <MoonLoader color='green' loading={isLoading} size="70px" />
     </div> :
     <Card className="authentication">
     <h2>Login Required</h2>
     <hr />
     <form onSubmit={authSubmitHandler}>
       {!isLoginMode && (
         <Input
           element="input"
           id="name"
           type="text"
           label="Your Name"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a name."
           onInput={inputHandler}
         />
       )}

      
       <Input
         element="input"
         id="email"
         type="email"
         label="E-Mail"
         validators={[VALIDATOR_EMAIL()]}
         errorText="Please enter a valid email address."
         onInput={inputHandler}
       />
       <Input
         element="input"
         id="password"
         type="password"
         label="Password"
         validators={[VALIDATOR_MINLENGTH(6)]}
         errorText="Please enter a valid password, at least 5 characters."
         onInput={inputHandler}
       />
        {!isLoginMode && 
            <ImageUpload center id="image" onInput = {inputHandler} />
       }
       <Button type="submit" disabled={!formState.isValid}>
         {isLoginMode ? 'LOGIN' : 'SIGNUP'}
       </Button>
     </form>
     <Button inverse onClick={switchModeHandler}>
       SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
     </Button>
   </Card>
     
     }
   
    
    </>
  );
};

export default Auth;