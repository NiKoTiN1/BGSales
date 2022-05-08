import React, { useState } from "react";
import "./registration-form.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postData } from "../../actions";
import LogFormPropsInterface from "../../interfaces/LogFormPropsInterface";
import { assetList } from "../../assets";

function RegistrationForm({ dispatch, history }: LogFormPropsInterface) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    role: true,
  });
  const [visible, setVisible] = useState({
    password: false,
    passwordConfirm: false,
  });
  const [warningEmail, setWarningEmail] = useState(false);
  const [warningComparePassword, setWarningComparePassword] = useState(false);
  const [errorEmptyFirstName, setErrorEmptyFirstName] = useState(false);
  const [errorEmptyLastName, setErrorEmptyLastName] = useState(false);
  const [errorEmptyPassword, setErrorEmptyPassword] = useState(false);

  const submitForm = (e: any) => {
    e.preventDefault();
    let allCorrect = true;
    setErrorEmptyFirstName(false);
    setErrorEmptyLastName(false);
    setErrorEmptyPassword(false);
    setWarningEmail(false);
    setWarningComparePassword(false);

    if (form.firstName === "") {
      setErrorEmptyFirstName(true);
      allCorrect = false;
    }
    if (form.lastName === "") {
      setErrorEmptyLastName(true);
      allCorrect = false;
    }
    if (!EMAIL_REGEXP.test(form.email)) {
      setWarningEmail(true);
      allCorrect = false;
    }
    if (form.password === "") {
      setErrorEmptyPassword(true);
      allCorrect = false;
    }
    if (form.password !== form.rePassword) {
      setWarningComparePassword(true);
      allCorrect = false;
    }
    if (allCorrect) {
      const newUser = {
        FirstName: form.firstName,
        LastName: form.lastName,
        UserType: form.role ? "Businessman" : "Blogger",
        Email: form.email,
        Password: form.password,
      };
      dispatch(postData(newUser));
      history.push("/");
    }
  };

  return (
    <form className="registration-form" onSubmit={submitForm}>
      <h2 className="registration-form__heading">Sign up</h2>
      <div className="registration-form__container-checkbox">
        <div className="registration-form__container-checkbox__checkbox">
          <input
            type="radio"
            checked={form.role}
            onChange={() => setForm({ ...form, role: true })}
          />
          <label>Advertiser</label>
        </div>
        <div className="registration-form__container-checkbox__checkbox">
          <input
            type="radio"
            checked={!form.role}
            onChange={() => setForm({ ...form, role: false })}
          />
          <label>Media person</label>
        </div>
      </div>
      <div className="registration-form__field">
        <input
          className={errorEmptyFirstName ? "warning" : ""}
          type="text"
          placeholder="First Name"
          onChange={(e: any) => setForm({ ...form, firstName: e.target.value })}
        />
        {errorEmptyFirstName ? (
          <>
            <div className="registration-form__field__image">
              <img src={assetList.info} />
            </div>
            <div className="registration-form__field__text">
              The field cannot be empty
            </div>
          </>
        ) : null}
      </div>
      <div className="registration-form__field">
        <input
          className={errorEmptyLastName ? "warning" : ""}
          type="text"
          placeholder="Last Name"
          onChange={(e: any) => setForm({ ...form, lastName: e.target.value })}
        />
        {errorEmptyLastName ? (
          <>
            <div className="registration-form__field__image">
              <img src={assetList.info} />
            </div>
            <div className="registration-form__field__text">
              The field cannot be empty
            </div>
          </>
        ) : null}
      </div>
      <div className="registration-form__field">
        <input
          className={warningEmail ? "warning" : ""}
          type="text"
          placeholder="Email"
          onChange={(e: any) => setForm({ ...form, email: e.target.value })}
        />
        {warningEmail ? (
          <>
            <div className="registration-form__field__image">
              <img src={assetList.info} />
            </div>
            <div className="registration-form__field__text">
              Please enter correct email
            </div>
          </>
        ) : null}
      </div>
      <div className="registration-form__field">
        <input
          className={errorEmptyPassword ? "warning" : ""}
          type={visible.password ? "text" : "password"}
          placeholder="Password"
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        />
        {errorEmptyPassword ? (
          <>
            <div className="registration-form__field__image">
              <img src={assetList.info} />
            </div>
            <div className="registration-form__field__text-wrong">Wrong password</div>
          </>
        ) : (
          <button
            type="button"
              className="registration-form__field__visible"
            onClick={() =>
              setVisible({ ...visible, password: !visible.password })
            }
          >
            <img
              src={visible.password ? assetList.look : assetList.noLook}
              alt="visible"
            />
          </button>
        )}
      </div>
      <div className="registration-form__field">
        <input
          className={warningComparePassword ? "warning" : ""}
          type={visible.passwordConfirm ? "text" : "password"}
          placeholder="Password confirmation"
          onChange={(e: any) =>
            setForm({ ...form, rePassword: e.target.value })
          }
        />
        {warningComparePassword ? (
          <>
            <div className="registration-form__field__image">
              <img src={assetList.info} />
            </div>
            <div className="registration-form__field__text-match">
              Passwords do not match
            </div>
          </>
        ) : (
          <button
            type="button"
              className="registration-form__field__visible"
            onClick={() =>
              setVisible({ ...visible, passwordConfirm: !visible.passwordConfirm })
            }
          >
            <img
              src={visible.passwordConfirm ? assetList.look : assetList.noLook}
              alt="visible"
            />
          </button>
        )}
      </div>
      <div className="registration-form__button">
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
}

export default connect()(RegistrationForm);
