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

interface PropsOrderInterface{
  id: string;
  dispatch: Function;
  order: OrderInterface;
}
const Order = ({
  id,
  order,
  dispatch,
}: PropsOrderInterface) => {
  useEffect(() => {
    dispatch(getOrder(id));
  }, []);
  return (
    <>
      <div className="edit">
        <Link className="edit__link" to="/projectEdit">
          <Button variant="outlined">Edit</Button>
        </Link>
      </div>
      <div className="media-profile">
        <div className="information">
          <div className="information__name col-1">
            <p>Title:</p>
            <p>Description:</p>
            <p>Budget:</p>
            <p>AudienceAge:</p>
          </div>
          <div className="information__name col-2">
            <p>{order.title}</p>
            <p>{order.description}</p>
            <p>{order.budget}</p>
            <p>{order.audienceAge}</p>
          </div>
        </div>
      </div>
      <div className="media-header">
        <h1>Activity information</h1>
      </div>
      <div className="information-activity">
        <div className="information-activity__name col-1">
          <p>Name Company:</p>
        </div>
        <div className="information-activity__name col-2">
          <p>{order.advitiser.nameCompany}</p>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
  };
};
export default connect(mapStateToProps)(Order);
