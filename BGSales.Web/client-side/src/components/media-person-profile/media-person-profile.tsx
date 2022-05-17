import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./media-person-profile.scss";
import { Button } from "@material-ui/core";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getProfileData, getNewProfileData, joinChat } from "../../actions";
import history from "../../history";
import { assetList } from "../../assets";
import Error from "../error";

const MediaPersonProfile = ({
  profile,
  dispatch,
  id,
  selectedProfile,
  role,
}: PersonProfileInterface) => {
  useEffect(() => {
    if (id) {
      dispatch(getNewProfileData(id));
    } else {
      dispatch(getProfileData());
    }
  }, []);
  if (role === "") {
    return <Error />;
  }
  const chekedChatId = () => {
    if (!selectedProfile.chatId) {
      dispatch(joinChat(selectedProfile.userId, profile.userId));
    } else {
      history.push(`/chat/${selectedProfile.chatId}`);
    }
  };
  return (
    <>
      <div className="media-profile">
        <div className="media-profile__container-img">
          <img
            className="media-profile__container-img__img"
            src={
              selectedProfile.imageUrl
                ? String(selectedProfile.imageUrl)
                : imageSrc
            }
            alt=""
          />
        </div>
        <div className="media-profile__information">
          <div className="media-profile__information__container">
            <p className="information__container__name">
              {selectedProfile.firstName} {selectedProfile.secondName}
            </p>
            <p className="information__container__info">
              Activity:{" "}
              {selectedProfile.activity
                ? selectedProfile.activity
                : "Not specified"}
            </p>
            <p className="information__container__info">
              Subscribers:{" "}
              {selectedProfile.subscribers
                ? selectedProfile.subscribers
                : "Not specified"}
            </p>
            <p className="information__container__info">
              Link to channel:{" "}
              <a
                href={
                  selectedProfile.urlYouTube
                    ? selectedProfile.urlYouTube
                    : "Not specified"
                }
              >
                link to channel/page
              </a>
            </p>
            <p className="information__container__info">
              Number of completed orders: {selectedProfile.ordersCompleted}
            </p>
          </div>
        </div>
      </div>
      <div className="media-header">
        <h1>Activity information</h1>
      </div>
      <div className="information-activity">
        <div className="information-activity__name col-1">
          <p>
            Activity:{" "}
            {selectedProfile.activity
              ? selectedProfile.activity
              : "Not specified"}
          </p>
          <p>
            Subjects:{" "}
            {selectedProfile.subjects
              ? selectedProfile.subjects
              : "Not specified"}
          </p>
          <p>
            Number of subscribers:{" "}
            {selectedProfile.subscribers
              ? selectedProfile.subscribers
              : "Not specified"}
          </p>
          <p>
            Average age of the audience:{" "}
            {selectedProfile.ageAudience
              ? selectedProfile.ageAudience
              : "Not specified"}
          </p>
        </div>
      </div>
      <div className="edit">
        {role === "Blogger" ? (
          <Link className="edit__link" to="/profileMediaEdit">
            <img src={assetList.edit} />
          </Link>
        ) : (
          <button className="edit__message" onClick={chekedChatId}>
            Write message
          </button>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    profile: state.profile.currentUser.profile,
    selectedProfile: state.profile.selectedProfile,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(MediaPersonProfile);
