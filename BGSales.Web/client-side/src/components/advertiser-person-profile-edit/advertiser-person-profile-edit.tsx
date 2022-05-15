/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { imageSrc } from "../../imageRequire";
import { putAdvertiserProfileData } from "../../actions";
import "./advertiser-person-profile-edit.scss";
import FormInterface from "../../interfaces/FormInterface";
import PersonProfileEditInterface from "../../interfaces/PersonProfileEditInterface";
import StateInterface from "../../interfaces/StateInterface";
import { useHistory } from "react-router-dom";

const AdvertiserPersonProfileEdit = ({
  dispatch,
  currentUser,
  history,
}: PersonProfileEditInterface) => {
  const [form, setForm] = useState<FormInterface>({
    imageUrl: currentUser.profile.imageUrl,
    firstName: currentUser.profile.firstName,
    secondName: currentUser.profile.secondName,
    nameCompany: currentUser.profile.nameCompany,
  });
  const [imgResult, setImgResult] = useState(currentUser.profile.imageUrl);
  const submitForm = (e: any) => {
    e.preventDefault();
    const userProfile = {
      userId: currentUser.profile.userId,
      imageUrl: form.imageUrl,
      firstName: String(form.firstName),
      secondName: String(form.secondName),
      nameCompany: String(form.nameCompany),
    };

    dispatch(putAdvertiserProfileData(userProfile));
    history.push("/profileAdvertiser");
  };
  const imageChange = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setForm({ ...form, imageUrl: file });
    reader.onloadend = () => {
      setImgResult(reader.result);
    };
    reader.readAsDataURL(file);
  };
  if (currentUser.role !== "Businessman") {
    history.push("/error");
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="advertiser-profile-form">
          <div className="advertiser-profile-form__file">
            <img
              className="advertiser-profile-form__file__img"
              src={form.imageUrl ? imgResult : imageSrc}
              alt=""
            />
            <input
              className="advertiser-profile-form__file__input"
              type="file"
              onChange={(e) => imageChange(e)}
            />
          </div>
          <div className="advertiser-profile-form__col-1">
            <h2>Personal information</h2>
            <div className="container">
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e: any) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
            <div className="container">
              <input
                placeholder="Second name"
                value={form.secondName}
                onChange={(e: any) =>
                  setForm({ ...form, secondName: e.target.value })
                }
              />
            </div>
            <div className="container">
              <input
                placeholder="Name Company"
                value={form.nameCompany}
                onChange={(e: any) =>
                  setForm({ ...form, nameCompany: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="button-save-adv">
          <button type="submit">Apply changes</button>
        </div>
      </form>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(AdvertiserPersonProfileEdit);
