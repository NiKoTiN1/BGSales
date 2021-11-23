import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Route} from "react-router-dom";
import "./advertiser-orders.scss";
import { Button } from "@material-ui/core";
import AdvertiserOrdersInterface from "../../interfaces/AdvertiserOrdersInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import { getAllAdvertiserOrders } from "../../actions";
import PartialAdvertiserOrder from "../partial-advertiser-order";
import PartialOrderInformationInterface from "../../interfaces/PartialOrderInformationInterface";

const AdvertiserOrders = ({
  ordersAdvertiser,
  currentUser,
  dispatch,
  history,
}: AdvertiserOrdersInterface) => {
  useEffect(() => {
    dispatch(getAllAdvertiserOrders(currentUser.profile.userId));
  }, []);
  const elements = ordersAdvertiser.map((item:PartialOrderInformationInterface) => {
    return(        
    <li  key={item.orderId} className='list-orders__item-order'>
        <PartialAdvertiserOrder
            id={currentUser.profile.userId}
            {...item}
            onItemSelected={(orderId:string) => {
              history.push(`myProjects/${orderId}`)
            }}
        />
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
    ordersAdvertiser: state.order.ordersAdvertiser,
  };
};
export default connect(mapStateToProps)(AdvertiserOrders);
