import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./order.scss";
import { Button } from "@material-ui/core";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getOrder } from "../../actions";
import OrderInterface from "../../interfaces/OrderInterface";
import AdvertiserInterface from "../../interfaces/AdvertiserInterface";
import MediaPersonsIterface from "../../interfaces/MediaPersonsIterface";
import PartialMediaPersonOrder from "../partial-media-person-order";
import HistoryPropsInterface from "../../interfaces/HistoryPropsInterface";

interface PropsOrderInterface {
  id: string;
  dispatch: Function;
  order: OrderInterface;
  role: string;
}
const Order = ({ id, order, dispatch, role }: PropsOrderInterface) => {
  useEffect(() => {
    dispatch(getOrder(id));
  }, []);
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
            <Link
              className="edit__link"
              to={`profileAdvertiser/${order.advitiser.userId}`}
            >
              <Button variant="outlined">Look the advertiser</Button>
            </Link>
          )}
        </div>
      </div>
      {role === "Businessman" ? (
        <div>
          <ul className="media-person-ul">
            {order.blogger ? (
              <PartialMediaPersonOrder
                checked={false}
                orderId={order.orderId}
                {...order.blogger}
                onItemSelected={(orderId: string) => {
                  //history.push(`${ordersSelectName}/${orderId}`)
                }}
              />
            ) : (
              elements
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(Order);
