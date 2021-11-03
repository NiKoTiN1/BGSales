import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import {checkUsername} from '../../actions';
// import Service from '../../services/services'
import {connect} from 'react-redux';
// import ServiceToken from '../../services/servicesToken'
// import {StateProps, HistoryProps} from '../../interfaces/interfaces'
import './login-form.scss';
import { Link } from 'react-router-dom';


// type Props = HistoryProps & StateProps

const LoginForm = (props:any) => {
    const [form , setForm] = useState({
        email: '',
        password: ''
    })

  const submitForm = (e:any) => {
    e.preventDefault();
    // ser.postData('api/login',{
    //   Username: form.email,
    //   Password: form.password,
    // })
    // .then((data:any) => {
    //   props.checkUsername(true)
    //   serToken.addToken(data);
    //   setTimeout(()=>props.history.push('/infopage'),900);
    // })  
    // .catch((data:any) => {
    //   console.log(data);
    // })
  };
    return (
        <form className="registration-form" onSubmit={submitForm}>
        <h2 className="registration-form__heading">Sign in</h2>
        <div className="registration-form__blok">
          <TextField label="Email" type="email" name="email" variant="outlined" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        </div>
        <div className="registration-form__blok">
          <TextField label="Password" type="password"name="password" variant="outlined" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
        </div>
        <div className="registration-form__button">
            <Button type="submit" variant="contained">
              Sign in 
            </Button>
            <Link className="registration-form__button_signin" to='/registration'><Button variant="outlined">Sign up</Button></Link>
        </div>
      </form>
    )
}

// const mapDispatchToProps = {
//   checkUsername

// }

export default connect()(LoginForm) ;