import React from "react";
import "./partial-media-person-order.scss";
import { Link } from "react-router-dom";
import PartialAdvertiserOrderInterface from "../../interfaces/PartialAdvertiserOrderInterface";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteOrder } from "../../actions";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { postOrderAccept } from "../../actions";
import CurrentUserInterface from "../../interfaces/CurrentUserInterface";
interface PropsPartialMediaPersonOrderInterface {
  orderId: string;
  userId: string;
  imageUrl: string | ArrayBuffer | null;
  nickname: string;
  firstName: string;
  secondName: string;
  activity: string;
  numberSubscribers: number | string;
  onItemSelected: Function;
  checked: boolean;
  dispatch: Function;
  currentUserId: string;
}
const PartialMediaPerson = ({
  orderId,
  userId,
  imageUrl,
  firstName,
  secondName,
  activity,
  numberSubscribers,
  checked,
  onItemSelected,
  dispatch,
  currentUserId,
}: PropsPartialMediaPersonOrderInterface) => {
  return (
    <>
      <div className="partial-media-person-order-info">
        <div className="partial-media-person-order-info__container">
          <p className="partial-media-person-order-info__container__name">
            {firstName} {secondName}
          </p>
        </div>
        <div className="partial-media-person-order-info__container">
          <Link
            className="partial-media-person-order-info__container__btn-look"
            to={`profileMedia/${userId}`}
          >
            Look
          </Link>
          {checked ? (
            <button
              className="partial-media-person-order-info__container__btn-approve btn"
              onClick={() =>
                dispatch(postOrderAccept(orderId, userId, currentUserId))
              }
            >
              Approve
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUserId: state.profile.currentUser.profile.userId,
  };
};
export default connect(mapStateToProps)(PartialMediaPerson);
