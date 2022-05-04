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
    return <p>Error this page is not available</p>;
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
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <img
            className="media-profile__container-img__img"
            src={selectedProfile.imageUrl ? selectedProfile.imageUrl : imageSrc}
            alt=""
          />
        </div>
        <div className="information">
          <div className="information__name col-1">
            <p>First name:</p>
            <p>Second name:</p>
            <p>Link to channel:</p>
            <p>Number of completed orders:</p>
          </div>
          <div className="information__name col-2">
            <p>{selectedProfile.firstName}</p>
            <p>{selectedProfile.secondName}</p>
            <a
              href={
                selectedProfile.urlYouTube
                  ? selectedProfile.urlYouTube
                  : "empty"
              }
            >
              link to channel/page
            </a>
            <p>{selectedProfile.ordersCompleted}</p>
          </div>
        </div>
      </div>
      <div className="media-header">
        <h1>Activity information</h1>
      </div>
      <div className="information-activity">
        <div className="information-activity__name col-1">
          <p>Activity:</p>
          <p>Subjects:</p>
          <p>Number of subscribers:</p>
          <p>Average age of the audience:</p>
        </div>
        <div className="information-activity__name col-2">
          <p>{selectedProfile.activity ? selectedProfile.activity : "empty"}</p>
          <p>{selectedProfile.subjects ? selectedProfile.subjects : "empty"}</p>
          <p>
            {selectedProfile.subscribers
              ? selectedProfile.subscribers
              : "empty"}
          </p>
          <p>
            {selectedProfile.ageAudience
              ? selectedProfile.ageAudience
              : "empty"}
          </p>
        </div>
      </div>
      <div className="edit">
        {role === "Blogger" ? (
          <Link className="edit__link" to="/profileMediaEdit">
            <Button variant="outlined">Edit</Button>
          </Link>
        ) : (
          <Button
            className="edit__link"
            variant="outlined"
            onClick={chekedChatId}
          >
            Write message
          </Button>
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
