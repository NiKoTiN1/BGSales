import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "./orders.scss";
import { Button } from "@material-ui/core";
import AdvertiserOrdersInterface from "../../interfaces/AdvertiserOrdersInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { deleteOrders, getOrders, addNameOrderUrl } from "../../actions";
import PartialOrder from "../partial-order";
import PartialOrderInformationInterface from "../../interfaces/PartialOrderInformationInterface";

const Orders = ({
  orders,
  currentUser,
  dispatch,
  history,
  nameOrderUrl,
}: AdvertiserOrdersInterface) => {
  const [ordersSelectName, setOrdersSelectName] = useState(nameOrderUrl);
  useEffect(() => {
    if (!nameOrderUrl) {
      dispatch(
        addNameOrderUrl(
          window.location.href.slice(window.location.href.lastIndexOf("/") + 1)
        )
      );
    }
    let nameReqest = "";
    if (nameOrderUrl === "myProjects" && currentUser.role === "Businessman") {
      nameReqest = "all";
    } else if (
      nameOrderUrl === "allProjects" &&
      currentUser.role === "Blogger"
    ) {
      nameReqest = "available";
    } else if (
      nameOrderUrl === "selectedProjects" &&
      currentUser.role === "Blogger"
    ) {
      nameReqest = "requested";
    } else if (
      nameOrderUrl === "acceptedProjects" &&
      currentUser.role === "Blogger"
    ) {
      nameReqest = "accepted";
    }
    dispatch(deleteOrders());
    dispatch(getOrders(currentUser.profile.userId, nameReqest));
  }, [currentUser.profile.userId, dispatch, nameOrderUrl, ordersSelectName]);
  const elements = orders.map((item: PartialOrderInformationInterface) => {
    return (
      <li key={item.orderId} className="list-orders__item-order">
        <PartialOrder
          id={currentUser.profile.userId}
          {...item}
          onItemSelected={(orderId: string) => {
            history.push(`${nameOrderUrl}/${orderId}`);
          }}
        />
        {currentUser.role === "Businessman" && !item.acceptedUserId? (
          <p className="list-orders__item-order__notif">{item.requests}</p>
        ) : null}
      </li>
    );
  });
  return (
    <>
      <ul className="list-orders">{elements}</ul>
      {currentUser.role === "Businessman" ? (
        <Link className="button-gradient" to="/createProjects">
          Add project
        </Link>
      ) : null}
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
    orders: state.order.orders,
    nameOrderUrl: state.order.nameOrderUrl,
  };
};
export default connect(mapStateToProps)(Orders);
