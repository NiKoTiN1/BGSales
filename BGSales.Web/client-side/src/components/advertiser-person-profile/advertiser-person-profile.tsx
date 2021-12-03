import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./advertiser-person-profile.scss";
import { Button } from "@material-ui/core";
import { imageSrc } from "../../imageRequire";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getProfileData, getNewProfileData, joinChat } from "../../actions";
import { createBrowserHistory } from 'history';
const AdvertiserPersonProfile = ({
  profile,
  dispatch,
  selectedProfile,
  role,
  id,
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
  return (
    <>
      <div className="advertise-profile">
        <div className="advertise-profile__container-img">
          <img
            className="advertise-profile__container-img__img"
            src={selectedProfile.imageUrl ? selectedProfile.imageUrl : imageSrc}
            alt=""
          />
        </div>
        <div className="information-container">
          <div className="information col-1">
            <div className="information__name">
              <p className="information__name__text">First name:</p>
              <p className="information__name__text">Second name:</p>
            </div>
            <div className="information__name">
              <p className="information__name__text">
                {selectedProfile.firstName}
              </p>
              <p className="information__name__text">
                {selectedProfile.secondName}
              </p>
            </div>
          </div>
          <div className="information col-2">
            <div className="information__name">
              <p className="information__name__text">Name Company:</p>
              <p className="information__name__text">Number Offers:</p>
            </div>
            <div className="information__name">
              <p className="information__name__text">
                {selectedProfile.nameCompany
                  ? selectedProfile.nameCompany
                  : "empty"}
              </p>
              <p className="information__name__text">
                {selectedProfile.numberOffers
                  ? selectedProfile.numberOffers
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="edit">
          {role === "Businessman" ? (
            <Link className="edit__link" to="/profileAdvertiserEdit">
              <Button className="edit__link__btn" variant="outlined">
                Edit
              </Button>
            </Link>
          ) : (
        
              <Button className="edit__link__btn" variant="outlined" onClick={()=> dispatch(joinChat(profile.userId,selectedProfile.userId))}>
                Write message
              </Button>
   
          )}
        </div>
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
export default connect(mapStateToProps)(AdvertiserPersonProfile);
