import React , {useContext , useState } from 'react';
import { MoonLoader } from 'react-spinners';

import Card from '../shared/components/UIElements/Card';
import Input from '../shared/components/Button/Input';
import Button from '../shared/components/Button/Button';

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
  const [loading , setloading] = useState(false)
 
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
          name: undefined
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
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler =async event => {

    event.preventDefault();
    setloading(true)

    if(isLoginMode)
    {
      try{
        let response = await fetch("http://localhost:5000/api/users/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email:formState.inputs.email.value,
            password:formState.inputs.password.value 
          })
        });

        let responseData = await response.json()
         
        if(!response.ok)
        { 
           throw new Error(responseData.message)
        }
        setloading(false)
        auth.login()
      }catch(err){
        setloading(false)
        console.log( "this error " , err)
      }
    }
    else{
      try{
        let response = await fetch("http://localhost:5000/api/users/signUp",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name:formState.inputs.name.value,
            email:formState.inputs.email.value,
            password:formState.inputs.password.value 
          })
        });

        let responseData = await response.json()
         
        if(!response.ok)
        { 
           throw new Error(responseData.message)
        }
        setloading(false)
        auth.login()
      }catch(err){
        setloading(false)
        console.log( "this error " , err)
      }
    }
    
  

  };
  
  return (
    <>  
     
    { loading ? <div className='spinner' >
     <MoonLoader color='green' loading={loading} size="70px" />
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
         validators={[VALIDATOR_MINLENGTH(5)]}
         errorText="Please enter a valid password, at least 5 characters."
         onInput={inputHandler}
       />
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