import React, { useState } from "react";
import "./partial-order.scss";
import { Link } from "react-router-dom";
import PartialAdvertiserOrderInterface from "../../interfaces/PartialAdvertiserOrderInterface";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteOrder, postOrderReqest } from "../../actions";
import StateInterface from "../../interfaces/StateInterface";

const PartialOrder = ({
  id,
  orderId,
  companyName,
  title,
  budget,
  currentUser,
  acceptedUserId,
  dispatch,
  onItemSelected,
}: PartialAdvertiserOrderInterface) => {
  return (
    <div className="order-partial-info">
      <div className="order-partial-info__container">
        <p className="order-partial-info__container__title">{title}</p>
        <p>
          Company name: {companyName === "" ? "Not specified" : companyName}
        </p>
        <p>Budget: {budget}$</p>
      </div>
      <div className="order-partial-info__container">
        <button
          className="order-partial-info__container__btn-look btn"
          onClick={() => onItemSelected(orderId)}
        >
          more
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(PartialOrder);
