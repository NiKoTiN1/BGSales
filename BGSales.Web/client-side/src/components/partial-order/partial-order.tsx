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
  const removeOrder = () => {
    dispatch(deleteOrder(id, orderId));
  };
  const [checkedAccept, setCheckedAccept] = useState(acceptedUserId);
  return (
    <div className="order-partial-info">
      <div className="order-partial-info__container">
        <p>{title}</p>
        <p>{companyName}</p>
        <p>{budget}$</p>
      </div>
      <div className="order-partial-info__container">
        <Button
          className="order-partial-info__container__btn-look btn"
          variant="outlined"
          onClick={() => onItemSelected(orderId)}
        >
          Look
        </Button>
        {currentUser.role === "Businessman" ? (
          <Button
            className="order-partial-info__container__btn-delete btn"
            variant="contained"
            onClick={removeOrder}
          >
            <p>Delete</p>
          </Button>
        ) : window.location.href.slice(
            window.location.href.lastIndexOf("/") + 1
          ) !== "selectedProjects" && checkedAccept === null ? (
          <Button
            className="order-partial-info__container__btn-delete btn"
            variant="contained"
            onClick={() => {
              dispatch(postOrderReqest(id, orderId));
              setCheckedAccept("1");
            }}
          >
            <p>Respond</p>
          </Button>
        ) : null}
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
