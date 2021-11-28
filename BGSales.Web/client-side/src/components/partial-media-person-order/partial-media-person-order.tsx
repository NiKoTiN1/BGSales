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
        <div className="partial-media-person-order-info__container col-1">
          <p>{firstName}</p>
          <p>{secondName}</p>
        </div>
        <div className="partial-media-person-order-info__container col-2">
          <p>Activity: {activity ? activity : "empty"}</p>
          <p>Subscribers: {numberSubscribers ? numberSubscribers : "empty"}</p>
        </div>
        <div className="partial-media-person-order-info__container col-3">
          <Link className="edit__link" to={`profileMedia/${userId}`}>
            <Button
              className="partial-media-person-order-info__container__btn-look btn"
              variant="outlined"
            >
              Look
            </Button>{" "}
          </Link>
          {checked ? (
            <Button
              className="partial-media-person-order-info__container__btn-look btn"
              variant="outlined"
              onClick={() =>
                dispatch(postOrderAccept(orderId, userId, currentUserId))
              }
            >
              Approve
            </Button>
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
