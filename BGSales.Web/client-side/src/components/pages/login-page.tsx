import React from 'react';
import {Route} from 'react-router-dom';
import LoginForm from '../login-form';


const LoginPage = () => {

    return (
        <div>
            <Route component={LoginForm}/>
        </div>
        
    )
}  
export default LoginPage ;