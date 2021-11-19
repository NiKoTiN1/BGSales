/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { imageSrc } from "../../imageRequire";
import { putMediaProfileData } from "../../actions";
import "./media-person-profile-edit.scss";
import FormInterface from "../../interfaces/FormInterface";
import PersonProfileEditInterface from "../../interfaces/PersonProfileEditInterface";
import StateInterface from "../../interfaces/StateInterface";
const MediaPersonProfileEdit = ({
  dispatch,
  currentUser,
  history,
}: PersonProfileEditInterface) => {
  const [form, setForm] = useState<FormInterface>({
    imageUrl: currentUser.profile.imageUrl,
    firstName: currentUser.profile.firstName,
    secondName: currentUser.profile.secondName,
    nickname: currentUser.profile.nickname,
    ageAdvertising: currentUser.profile.ageAdvertising,
    linkChannel: currentUser.profile.linkChannel,
    activity: currentUser.profile.activity,
    subjects: currentUser.profile.subjects,
    numberSubscribers: `${currentUser.profile.numberSubscribers}`,
    ageAudience: `${currentUser.profile.ageAudience}`,
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    let errorFlag = false;
    for (let item in form) {
      if (form[item] === "") {
        errorFlag = true;
      }
    }
    if (!Number(form["numberSubscribers"])) {
      errorFlag = true;
    }
    const userProfile = {
      userId: currentUser.profile.userId,
      imageUrl: form.imageUrl,
      nickname: String(form.nickname),
      firstName: String(form.firstName),
      secondName: String(form.secondName),
      ageAdvertising: String(form.ageAdvertising),
      linkChannel: String(form.linkChannel),
      activity: String(form.activity),
      subjects: String(form.subjects),
      numberSubscribers: Number(form.numberSubscribers),
      ageAudience: Number(form.ageAudience),
    };
    if (!errorFlag) {
      dispatch(putMediaProfileData(userProfile));
      history.push("/profileMedia");
    }
  };
  const imageChange = (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setForm({ ...form, imageUrl: reader.result });
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="media-profile-form">
          <div className="media-profile-form__file">
            <img
              className="media-profile-form__file__img"
              src={form.imageUrl ? form.imageUrl : imageSrc}
              alt=""
            />
            <input
              className="media-profile-form__file__input"
              type="file"
              onChange={(e) => imageChange(e)}
            />
          </div>
          <div className="media-profile-form__col-1">
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
                label="Nickname"
                defaultValue={form.nickname}
                variant="outlined"
                error={form.nickname === ""}
                onChange={(e: any) =>
                  setForm({ ...form, nickname: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Age working with advertising"
                defaultValue={form.ageAdvertising}
                variant="outlined"
                error={form.ageAdvertising === ""}
                onChange={(e: any) =>
                  setForm({ ...form, ageAdvertising: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Link to channel"
                defaultValue={form.linkChannel}
                variant="outlined"
                error={form.linkChannel === ""}
                onChange={(e: any) =>
                  setForm({ ...form, linkChannel: e.target.value })
                }
              />
            </div>
          </div>
          <div className="media-profile-form__col-2">
            <h2>Activity information</h2>
            <div>
              <TextField
                label="Activity"
                defaultValue={form.activity}
                variant="outlined"
                error={form.activity === ""}
                onChange={(e: any) =>
                  setForm({ ...form, activity: e.target.value })
                }
              />
              <div className="container">
                <TextField
                  label="Subjects"
                  defaultValue={form.subjects}
                  variant="outlined"
                  error={form.subjects === ""}
                  onChange={(e: any) =>
                    setForm({ ...form, subjects: e.target.value })
                  }
                />
              </div>
              <div className="container">
                <TextField
                  label="Number of subscribers"
                  defaultValue={form.numberSubscribers}
                  variant="outlined"
                  error={
                    form.numberSubscribers === "" ||
                    !Number(form.numberSubscribers)
                  }
                  onChange={(e: any) =>
                    setForm({ ...form, numberSubscribers: e.target.value })
                  }
                />
              </div>
              <div className="container">
                <TextField
                  label="Average age of the audience"
                  defaultValue={form.ageAudience}
                  variant="outlined"
                  error={form.ageAudience === ""}
                  onChange={(e: any) =>
                    setForm({ ...form, ageAudience: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Button className="button-save" type="submit" variant="contained">
          Apply changes
        </Button>
      </form>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.reducer.currentUser,
  };
};
export default connect(mapStateToProps)(MediaPersonProfileEdit);
