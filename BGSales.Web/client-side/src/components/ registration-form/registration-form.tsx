import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './registration-form.scss';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

function RegistrationForm(props:any) {
  const [form , setForm] = useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      rePassword: ''
  })

  const submitForm = async(e:any) => {
    e.preventDefault();
    if(form.password !== form.rePassword){
      setErrorChecked(true);
    } else {
      setErrorChecked(false);
      const newUser = {
        FirstName: form.firstName,
        LastName: form.lastName,
        UserType: form.role ? 'Businessman' : 'Blogger',
        Email: form.email,
        Password: form.password,
      }
      await props.dispatch(postData(newUser));
      props.history.push('/');
    }
  }
  
    return (
      <form className="registration-form" onSubmit ={submitForm}>
        <h2 className="registration-form__heading">Sign up</h2>
        <div className="registration-form__blok">
          <label className="registration-form__label">Email address</label>
          <TextField  type='email' name='email'  onChange={(e:any) => setForm({ ...form, email: e.target.value })}/>
        </div>
        <div className="registration-form__blok">
          <label className="registration-form__label" htmlFor="password">Password</label>
          <TextField type="password"name="password"  onChange={(e:any) => setForm({ ...form, password: e.target.value })}/>
        </div>
        <div className="registration-form__blok">
          <label className="registration-form__label" htmlFor="firstName">FirstName</label>
          <TextField type="firstName" name="firstName"  onChange={(e:any) => setForm({ ...form, firstName: e.target.value })}/>
        </div>
        <div className="registration-form__blok">
          <label className="registration-form__label" htmlFor="lastName">LastName</label>
          <TextField type="lastName" name="lastName"  onChange={(e:any) => setForm({ ...form, lastName: e.target.value })}/>
        </div>
        <Button type="submit">
           Sign up
        </Button>
        <Link className="registration-form__link" to='/authorization'>Sign in</Link>
      </form>
    )
}

const mapStateToProps =  (state: any) =>{
  return {
    checkUser: state.reducer.checkUser,
  }
}

export default connect(mapStateToProps)(RegistrationForm) ;

