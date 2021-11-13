import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postProfileData } from "../../actions";
import LogFormPropsInterface from "../../interfaces/LogFormPropsInterface";
import "./login-form.scss";

const LoginForm = ({ dispatch, history }: LogFormPropsInterface) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    const user = {
      Email: form.email,
      Password: form.password,
    };
    dispatch(postProfileData(user));
    history.push("/");
  };
  return (
    <form className="registration-form" onSubmit={submitForm}>
      <h2 className="registration-form__heading">Sign in</h2>
      <div className="registration-form__container">
        <TextField
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="registration-form__container">
        <TextField
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="registration-form__button">
        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <Link className="registration-form__button_signin" to="/registration">
          <Button variant="outlined">Sign up</Button>
        </Link>
      </div>
    </form>
  );
};

export default connect()(LoginForm);
