import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./registration-form.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postData } from "../../actions";
import LogFormPropsInterface from "../../interfaces/LogFormPropsInterface";

function RegistrationForm({ dispatch, history }: LogFormPropsInterface) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    role: true,
  });
  const [errorChecked, setErrorChecked] = useState(false);

  const submitForm = (e: any) => {
    e.preventDefault();
    if (form.password !== form.rePassword) {
      setErrorChecked(true);
    } else {
      setErrorChecked(false);
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
      <div>
        <div className="registration-form__field">
          <TextField
            label="FirstName"
            variant="outlined"
            onChange={(e: any) =>
              setForm({ ...form, firstName: e.target.value })
            }
          />
        </div>
        <div className="registration-form__field">
          <TextField
            label="LastName"
            variant="outlined"
            onChange={(e: any) =>
              setForm({ ...form, lastName: e.target.value })
            }
          />
        </div>
        <div className="registration-form__field">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e: any) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="registration-form__field">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e: any) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>
        <div className="registration-form__field">
          <TextField
            label="Password"
            error={errorChecked}
            type="password"
            variant="outlined"
            onChange={(e: any) =>
              setForm({ ...form, rePassword: e.target.value })
            }
          />
        </div>
        <div className="registration-form__checkbox">
          <input
            type="checkbox"
            checked={form.role}
            onChange={() => setForm({ ...form, role: true })}
          />
          <label>advertiser</label>
        </div>
        <div className="registration-form__checkbox">
          <input
            type="checkbox"
            checked={!form.role}
            onChange={() => setForm({ ...form, role: false })}
          />
          <label>media person</label>
        </div>
        <div className="registration-form__button">
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <Link
            className="registration-form__button_signin"
            to="/authorization"
          >
            <Button variant="outlined">Sign in</Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default connect()(RegistrationForm);
