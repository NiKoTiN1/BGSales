import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postProfileData } from "../../actions";
import { assetList } from "../../assets";
import LogFormPropsInterface from "../../interfaces/LogFormPropsInterface";
import "./login-form.scss";

const LoginForm = ({ dispatch, history }: LogFormPropsInterface) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  

  const [visible, setVisible] = useState(false);
  const [warningEmail, setWarningEmail] = useState(false);
  const [warningPassword, setWarningPassword] = useState(false);

  const submitForm = (e: any) => {
    e.preventDefault();
    let allCorrect = true;
    const user = {
      Email: form.email,
      Password: form.password,
    };
    setWarningEmail(false);
    setWarningPassword(false);
    if (!EMAIL_REGEXP.test(form.email)){
      setWarningEmail(true);
      allCorrect = false;
    }
    if (form.password === "") {
      setWarningPassword(true);
      allCorrect = false;
    }
    if (allCorrect){
      dispatch(postProfileData(user));
      history.push("/");
    }
  };
  return (
    <form className="login-form" onSubmit={submitForm}>
      <h2 className="login-form__heading">Sign in</h2>
      <div className="login-form__container">
        <input
          className={warningEmail ? "warning" : ""}
          type="text"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {warningEmail ? (
          <>
            <div className="login-form__container__image">
              <img src={assetList.info} />
            </div>
            <div className="login-form__container__text">
              Please enter correct email
            </div>
          </>
        ) : null}
      </div>
      <div className="login-form__container">
        <input
          className={warningPassword ? "warning" : ""}
          type={visible ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {warningPassword ? (
          <>
            <div className="login-form__container__image">
              <img src={assetList.info} />
            </div>
            <div className="login-form__container__text-password">
              Wrong password
            </div>
          </>
        ) : (
          <button
            type="button"
            className="login-form__container__visible"
            onClick={() => setVisible(!visible)}
          >
            <img
              src={visible ? assetList.look : assetList.noLook}
              alt="visible"
            />
          </button>
        )}
      </div>
      <div className="login-form__button">
        <button type="submit">Log in</button>
      </div>
    </form>
  );
};

export default connect()(LoginForm);
