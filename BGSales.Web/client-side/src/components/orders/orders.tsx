import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Route} from "react-router-dom";
import "./orders.scss";
import { Button } from "@material-ui/core";
import AdvertiserOrdersInterface from "../../interfaces/AdvertiserOrdersInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getOrders } from "../../actions";
import PartialOrder from "../partial-order";
import PartialOrderInformationInterface from "../../interfaces/PartialOrderInformationInterface";

const Orders = ({
  orders,
  currentUser,
  dispatch,
  history,
}: AdvertiserOrdersInterface) => {
  const [ordersSelectName, setOrdersSelectName] = useState(window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
  useEffect(() => {
    let nameReqest = "";
    if(ordersSelectName === "myProjects"){
      nameReqest = "all";
    } else if(ordersSelectName === "allProjects"){
      nameReqest = "available";
    } else if(ordersSelectName === "selectedProjects"){
      nameReqest = "reqested";
    }
    dispatch(getOrders(currentUser.profile.userId, nameReqest));
  }, [currentUser.profile.userId, dispatch, ordersSelectName]);
  const elements = orders.map((item:PartialOrderInformationInterface) => {
    return(        
    <li  key={item.orderId} className='list-orders__item-order'>
        <PartialOrder
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
