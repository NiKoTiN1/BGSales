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
      <div className="advertise-profile">
        <div className="advertise-profile__container-img">
          <img
            className="advertise-profile__container-img__img"
            src={
              currentUser.profile.imageUrl
                ? currentUser.profile.imageUrl
                : imageSrc
            }
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
              <p className="information__name__text">{currentUser.profile.firstName}</p>
              <p className="information__name__text">{currentUser.profile.secondName}</p>
            </div>
          </div>
          <div className="information col-2">
            <div className="information__name">
              <p className="information__name__text">Name Company:</p>
              <p className="information__name__text">Number Offers:</p>
            </div>
            <div className="information__name">
              <p className="information__name__text">{currentUser.profile.nameCompany ? currentUser.profile.nameCompany : "empty"}</p>
              <p className="information__name__text"> 
                {currentUser.profile.numberOffers
                  ? currentUser.profile.numberOffers
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="edit">
          {currentUser.role === "Businessman"?<Link className="edit__link" to="/profileAdvertiserEdit">
            <Button className="edit__link__btn" variant="outlined">Edit</Button>
          </Link>:<Link className="edit__link" to="/chat">
            <Button className="edit__link__btn" variant="outlined">Write message</Button>
          </Link>}
      </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(AdvertiserPersonProfile);
