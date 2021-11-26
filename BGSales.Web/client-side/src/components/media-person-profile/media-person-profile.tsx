import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./media-person-profile.scss";
import { Button } from "@material-ui/core";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getProfileData } from "../../actions";

const MediaPersonProfile = ({
  currentUser,
  dispatch,
}: PersonProfileInterface) => {
  useEffect(() => {
    dispatch(getProfileData());
  }, []);
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
            src={
              currentUser.profile.imageUrl
                ? currentUser.profile.imageUrl
                : imageSrc
            }
            alt=""
          />
        </div>
        <div className="information">
          <div className="information__name col-1">
            <p>First name:</p>
            <p>Second name:</p>
            <p>Age of working in media:</p>
            <p>Link to channel:</p>
            <p>Number of completed orders:</p>
          </div>
          <div className="information__name col-2">
            <p>{currentUser.profile.firstName}</p>
            <p>{currentUser.profile.secondName}</p>
            <p>{currentUser.profile.ageAdvertising?currentUser.profile.ageAdvertising:"empty"}</p>
            <a href={currentUser.profile.linkChannel?currentUser.profile.linkChannel:"empty"}>link to channel/page</a>
            <p>{currentUser.profile.ordersCompleted?currentUser.profile.ordersCompleted:"empty"}</p>
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
          <p>{currentUser.profile.activity?currentUser.profile.activity:"empty"}</p>
          <p>{currentUser.profile.subjects?currentUser.profile.subjects:"empty"}</p>
          <p>{currentUser.profile.numberSubscribers?currentUser.profile.numberSubscribers:"empty"}</p>
          <p>{currentUser.profile.ageAudience?currentUser.profile.ageAudience:"empty"}</p>
        </div>
      </div>
      <div className="edit">
        {currentUser.role === "Blogger"? <Link className="edit__link" to="/profileMediaEdit">
          <Button variant="outlined">Edit</Button>
        </Link>: <Link className="edit__link" to="/chat">
          <Button variant="outlined">Write message</Button>
        </Link>}
       
      </div>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(MediaPersonProfile);
