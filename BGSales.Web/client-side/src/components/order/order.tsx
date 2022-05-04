import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./order.scss";
import { Button } from "@material-ui/core";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getOrder, joinChat, payOrder } from "../../actions";
import OrderInterface from "../../interfaces/OrderInterface";
import AdvertiserInterface from "../../interfaces/AdvertiserInterface";
import MediaPersonsIterface from "../../interfaces/MediaPersonsIterface";
import PartialMediaPersonOrder from "../partial-media-person-order";
import HistoryPropsInterface from "../../interfaces/HistoryPropsInterface";
import UserProfileInterface from "../../interfaces/UserProfileInterface";
import history from "../../history";

interface Props {
  id: string;
  dispatch: Function;
  order: OrderInterface;
  role: string;
  profile: UserProfileInterface;
  selectedProfile: UserProfileInterface;
}
const Order = ({
  id,
  order,
  dispatch,
  role,
  profile,
  selectedProfile,
}: Props) => {
  useEffect(() => {
    dispatch(getOrder(id));
  }, [order.isPaid]);
  const elements = order.bloggerRequests.map((item: any) => {
    return (
      <li key={item.userId} className="list-orders__item-order">
        <PartialMediaPersonOrder
          checked={true}
          orderId={order.orderId}
          {...item}
          onItemSelected={(userId: string) => {
            //history.push(`profileAdvertiser/${id}`)
          }}
        />
      </li>
    );
  });
  if (role === "") {
    return <p>Error this page is not available</p>;
  }
  const chekedChatId = () => {
    if (!order.chatId) {
      dispatch(joinChat(profile.userId, order.advitiser.userId));
    } else {
      history.push(`/chat/${order.chatId}`);
    }
  };
  return (
    <div className="container">
      <div className="order">
        <div className="information">
          <div className="information__name__title ">
            <p>{order.title}</p>
          </div>
          <div className="information__name__description ">
            <p>{order.description}</p>
          </div>
          <div className="information__name-main">
            <div className="information__name col-1">
              <p>Budget:</p>
              <p>AudienceAge:</p>
              <p>Name Company:</p>
            </div>
            <div className="information__name col-2">
              <p>{order.budget ? order.budget + "$" : "empty"}</p>
              <p>{order.audienceAge ? order.audienceAge : "empty"}</p>
              <p>{order.advitiser.nameCompany}</p>
            </div>
          </div>
        </div>
        <div className="order__edit">
          {role === "Businessman" ? (
            <Link className="order__edit__link" to="/projectEdit">
              <Button variant="outlined">Edit</Button>
            </Link>
          ) : (
            <div className="order__edit-media">
              <Link
                className="order__edit-media__link"
                to={`profileAdvertiser/${order.advitiser.userId}`}
              >
                <Button className="order__edit-media__btn" variant="outlined">
                  Look the advertiser
                </Button>
              </Link>
              <Button
                className="order__edit-media__btn"
                variant="outlined"
                onClick={chekedChatId}
              >
                Write message
              </Button>
            </div>
          )}
        </div>
      </div>
      {role === "Businessman" ? (
        <div>
          <ul className="media-person-ul">
            {order.blogger ? (
              <div>
                <p className="div-accept-text">Working on an order</p>
                <div className="div-accept">
                  <PartialMediaPersonOrder
                    checked={false}
                    orderId={order.orderId}
                    {...order.blogger}
                    onItemSelected={(orderId: string) => {
                      //history.push(`${ordersSelectName}/${orderId}`)
                    }}
                  />
                </div>
              </div>
            ) : (
              elements
            )}
          </ul>
          {!order.isPaid && order.blogger ? (
            <Button
              className="order__edit-media__btn-pay"
              variant="outlined"
              onClick={() => dispatch(payOrder(order.stripeId, order.orderId))}
            >
              Pay order
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
    profile: state.profile.currentUser.profile,
    selectedProfile: state.profile.selectedProfile,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(Order);
