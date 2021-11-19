import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./advertiser-person-profile.scss";
import { Button } from "@material-ui/core";
import { imageSrc } from "../../imageRequire";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getProfileData } from "../../actions";

const AdvertiserPersonProfile = ({
  currentUser,
  dispatch,
}: PersonProfileInterface) => {
  useEffect(() => {
    dispatch(getProfileData());
  }, []);
  return (
    <>
      <div className="edit">
        <Link className="edit__link" to="/profileAdvertiserEdit">
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
            <p>Name Company:</p>
            <p>Number Offers:</p>
          </div>
          <div className="information__name col-2">
            <p>{currentUser.profile.firstName}</p>
            <p>{currentUser.profile.secondName}</p>
            <p>{currentUser.profile.nameCompany}</p>
            <p>
              {currentUser.profile.numberOffers
                ? currentUser.profile.numberOffers
                : 0}
            </p>
          </div>
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
export default connect(mapStateToProps)(AdvertiserPersonProfile);
