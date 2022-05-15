import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./advertiser-person-profile.scss";
import { Button } from "@material-ui/core";
import { imageSrc } from "../../imageRequire";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getProfileData, getNewProfileData, joinChat } from "../../actions";
import { assetList } from "../../assets";
const AdvertiserPersonProfile = ({
  profile,
  dispatch,
  selectedProfile,
  role,
  id,
}: PersonProfileInterface) => {
  const history = useHistory();
  useEffect(() => {
    if (id) {
      dispatch(getNewProfileData(id));
    } else {
      dispatch(getProfileData());
    }
  }, []);
  if (role === "") {
    history.push("/error");
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
        <div className="advertise-profile__information">
          <div className="advertise-profile__information__container">
            <p className="information__container__name">
              {selectedProfile.firstName} {selectedProfile.secondName}
            </p>
            <p className="information__container__info">
              Name Company:{" "}
              {selectedProfile.nameCompany
                ? selectedProfile.nameCompany
                : "Not specified"}
            </p>
            <p className="information__container__info">
              Number offers:{" "}
              {selectedProfile.ordersCount
                ? selectedProfile.ordersCount
                : "Not specified"}
            </p>
          </div>
        </div>
      </div>

      <div className="edit-advertiser">
        {role === "Businessman" ? (
          <Link className="edit-advertiser__link" to="/profileAdvertiserEdit">
            <img src={assetList.edit} />
          </Link>
        ) : null}
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
