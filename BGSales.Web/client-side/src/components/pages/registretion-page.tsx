import React from 'react';
import { Route } from 'react-router-dom';
import RegistartionForm from '../ registration-form'


const RegistartionPage = () => {

    return (
        <div>
            <Route component={RegistartionForm}/>
        </div>
        
    )
}

  
  export default RegistartionPage ;