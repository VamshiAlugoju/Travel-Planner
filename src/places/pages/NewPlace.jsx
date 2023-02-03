import React from 'react';

 import Input from '../../shared/components/Button/Input'; 
import { VALIDATOR_REQUIRE } from '../../shared/components/validators';

import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input element="input"
       type="text" 
       label="Title" 
       validators = {[VALIDATOR_REQUIRE()]}
       errorText = "please enter valid text" />
    </form>
  );
};



export default NewPlace;