import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Route} from "react-router-dom";
import "./orders.scss";
import { Button } from "@material-ui/core";
import AdvertiserOrdersInterface from "../../interfaces/AdvertiserOrdersInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getAllAdvertiserOrders } from "../../actions";
import PartialAdvertiserOrder from "../partial-order";
import PartialOrderInformationInterface from "../../interfaces/PartialOrderInformationInterface";

const Orders = ({
  orders,
  currentUser,
  dispatch,
  history,
}: AdvertiserOrdersInterface) => {
  const [ordersSelectName, setOrdersSelectName] = useState(window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
  useEffect(() => {
    dispatch(getAllAdvertiserOrders(currentUser.profile.userId));
  }, [currentUser.profile.userId, dispatch]);

  const elements = orders.map((item:PartialOrderInformationInterface) => {
    return(        
    <li  key={item.orderId} className='list-orders__item-order'>
        <PartialAdvertiserOrder
            id={currentUser.profile.userId}
            {...item}
            onItemSelected={(orderId:string) => {
              console.log(window.location.href);
              history.push(`${ordersSelectName}/${orderId}`)
            }}
        />
        {currentUser.role === "Businessman"? <p className='list-orders__item-order__notif'>{item.requests}</p>
         : null
         }
       
    </li>
    )
  });
  return(  
    <>
      <ul className="list-orders">
        {elements}
      </ul>
      <Link className="button-gradient" to="/createProjects" >Add project</Link>
    </>
  )
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
    orders: state.order.orders,
  };
};
export default connect(mapStateToProps)(Orders);
