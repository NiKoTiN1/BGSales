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
  const [formImg, setFormImg] = useState({
    imageUrl: currentUser.profile.imageUrl,
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    let errorFlag = false;
    for (let item in form) {
      if (form[item] === "") {
        errorFlag = true;
      }
    }
    const userProfile = {
      userId: currentUser.profile.userId,
      imageUrl: formImg.imageUrl,
      firstName: String(form.firstName),
      secondName: String(form.secondName),
      nameCompany: String(form.nameCompany),
    };
    if (!errorFlag) {
      dispatch(putAdvertiserProfileData(userProfile));
      history.push("/profileAdvertiser");
    }
  };
  const imageChange = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFormImg({ imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };
  if (currentUser.role !== "Businessman") {
    return <p>Error this page is not available</p>;
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="advertiser-profile-form">
          <div className="advertiser-profile-form__file">
            <img
              className="advertiser-profile-form__file__img"
              src={form.imageUrl ? form.imageUrl : imageSrc}
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
            <div>
              <TextField
                label="First name"
                defaultValue={form.firstName}
                variant="outlined"
                error={form.firstName === ""}
                onChange={(e: any) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Second name"
                defaultValue={form.secondName}
                variant="outlined"
                error={form.secondName === ""}
                onChange={(e: any) =>
                  setForm({ ...form, secondName: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Name Company"
                defaultValue={form.nameCompany}
                variant="outlined"
                error={form.nameCompany === ""}
                onChange={(e: any) =>
                  setForm({ ...form, nameCompany: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="button-save">
          <Button type="submit" variant="contained">
            Apply changes
          </Button>
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
