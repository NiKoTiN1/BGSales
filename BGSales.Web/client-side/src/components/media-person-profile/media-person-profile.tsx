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
      <div className="edit">
        <Link className="edit__link" to="/profileMediaEdit">
          <Button variant="outlined">Edit</Button>
        </Link>
      </div>
      <div className="media-profile">
        <p>
          <img
            className="media-profile__img"
            src={
              currentUser.profile.imageUrl
                ? currentUser.profile.imageUrl
                : imageSrc
            }
            alt=""
          />
        </p>
        <div className="information">
          <div className="information__name col-1">
            <p>First name:</p>
            <p>Second name:</p>
            <p>Age of working with advertising:</p>
            <p>Link to channel:</p>
            <p>Number of completed orders:</p>
          </div>
          <div className="information__name col-2">
            <p>{currentUser.profile.firstName}</p>
            <p>{currentUser.profile.secondName}</p>
            <p>0</p>
            {/* <p>{currentUser.profile.ageAdvertising}</p> */}
            <a href={currentUser.profile.linkChannel}>link to channel/page</a>
            <p>{currentUser.profile.ordersCompleted}</p>
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
          <p>{currentUser.profile.activity}</p>
          <p>{currentUser.profile.subjects}</p>
          <p>{currentUser.profile.numberSubscribers}</p>
          <p>{currentUser.profile.ageAudience}</p>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.reducer.currentUser,
  };
};
export default connect(mapStateToProps)(MediaPersonProfile);
