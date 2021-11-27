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

interface PropsOrderInterface{
  id: string;
  dispatch: Function;
  order: OrderInterface;
  role: string;
}
const Order = ({
  id,
  order,
  dispatch,
  role,
}: PropsOrderInterface) => {
  useEffect(() => {
    dispatch(getOrder(id));
  }, []);
  const elements = order.bloggerRequests.map((item:any) => {
    return(        
    <li  key={item.userId} className='list-orders__item-order'>
           <PartialMediaPersonOrder
            checked={order.blogger}
            orderId={order.orderId}
            {...item}
            onItemSelected={(orderId:string) => {
              //history.push(`${ordersSelectName}/${orderId}`)
            }} />
    </li>
    )
  });
  return (
    <div className="container-edit">
      <div className="order">
        <div className="information">
          <div className="information__name col-1">
            <p>Title:</p>
            <p>Description:</p>
            <p>Budget:</p>
            <p>AudienceAge:</p>
            <p>Name Company:</p>
          </div>
          <div className="information__name col-2">
            <p>{order.title}</p>
            <p>{order.description}</p>
            <p>{order.budget?order.budget:"empty"}</p>
            <p>{order.audienceAge?order.audienceAge:"empty"}</p>
            <p>{order.advitiser.nameCompany}</p>
          </div>
        </div>
        <div className="order__edit">
          {role === "Businessman"?
          <Link className="order__edit__link" to="/projectEdit">
            <Button variant="outlined">Edit</Button>
          </Link>
          :<Link className="edit__link" to="/chat">
            <Button variant="outlined">Write message</Button>
          </Link>}
        </div>
      </div>
      <div>
        <ul className="list-orders">
          {elements}
        </ul>
      </div>
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
