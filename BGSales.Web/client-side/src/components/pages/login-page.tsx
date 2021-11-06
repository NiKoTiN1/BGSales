import React from 'react';
import LoginForm from '../login-form';
import { Route } from 'react-router-dom';

const LoginPage = () => {

    return (
        <div>
             <Route component={LoginForm}/>
        </div>
        
    )
}  
export default LoginPage ;