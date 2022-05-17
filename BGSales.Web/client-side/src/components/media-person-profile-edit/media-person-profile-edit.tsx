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
import Error from "../error";

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
    urlYouTube: currentUser.profile.urlYouTube,
    activity: currentUser.profile.activity,
    subjects: currentUser.profile.subjects,
    subscribers: `${currentUser.profile.subscribers}`,
    ageAudience: `${currentUser.profile.ageAudience}`,
  });
  const [imgResult, setImgResult] = useState(currentUser.profile.imageUrl);
  const submitForm = (e: any) => {
    e.preventDefault();

    const userProfile = {
      userId: currentUser.profile.userId,
      imageUrl: form.imageUrl,
      nickname: String(form.nickname),
      firstName: String(form.firstName),
      secondName: String(form.secondName),
      urlYouTube: String(form.urlYouTube),
      activity: String(form.activity),
      subjects: String(form.subjects),
      subscribers: Number(form.subscribers),
      ageAudience: Number(form.ageAudience),
    };

    dispatch(putMediaProfileData(userProfile));
    history.push("/profileMedia");
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
  if (currentUser.role !== "Blogger") {
    return <Error />;
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="media-profile-form">
          <div className="media-profile-form__file">
            <img
              className="media-profile-form__file__img"
              src={form.imageUrl ? imgResult : imageSrc}
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
              <div className="container">
                <input
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e: any) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>
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
                placeholder="Nickname"
                value={form.nickname}
                onChange={(e: any) =>
                  setForm({ ...form, nickname: e.target.value })
                }
              />
            </div>
            <div className="container">
              <input
                placeholder="Link to channel"
                value={form.urlYouTube}
                onChange={(e: any) =>
                  setForm({ ...form, urlYouTube: e.target.value })
                }
              />
            </div>
          </div>
          <div className="media-profile-form__col-2">
            <h2>Activity information</h2>
            <div>
              <div className="container">
                <input
                  placeholder="Activity"
                  value={form.activity}
                  onChange={(e: any) =>
                    setForm({ ...form, activity: e.target.value })
                  }
                />
              </div>
              <div className="container">
                <input
                  placeholder="Subjects"
                  value={form.subjects}
                  onChange={(e: any) =>
                    setForm({ ...form, subjects: e.target.value })
                  }
                />
              </div>
              <div className="container">
                <p>Number of subscribers</p>
                <input
                  placeholder="Number of subscribers"
                  value={form.subscribers}
                  onChange={(e: any) =>
                    setForm({ ...form, subscribers: e.target.value })
                  }
                />
              </div>
              <div className="container">
                <p>Average age of the audience</p>
                <input
                  placeholder="Average age of the audience"
                  value={form.ageAudience}
                  onChange={(e: any) =>
                    setForm({ ...form, ageAudience: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="button-save-media">
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
export default connect(mapStateToProps)(MediaPersonProfileEdit);
