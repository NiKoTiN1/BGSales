import React from "react";
import "./partial-advertiser-order.scss";
import { Link } from "react-router-dom";
import PartialAdvertiserOrderInterface from "../../interfaces/PartialAdvertiserOrderInterface";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteOrder } from "../../actions";

const PartialAdvertiserOrder = ({
  id,
  orderId,
  companyName,
  title,
  budget,
  requests,
  dispatch,
  onItemSelected
}: PartialAdvertiserOrderInterface) => {
  const removeOrder = () => {
    dispatch(deleteOrder(id, orderId));
  }
  return(  
   <div className="order-partial-info">
     <div>
        <p>{companyName}</p>  
        <p>{title}</p> 
        <p>{budget}</p> 
        <p>{requests}</p> 
     </div>
     <div>

        <Button variant="outlined" onClick={()=>onItemSelected(orderId)}>Look</Button>
       

        <Button onClick={removeOrder}><p>Delete</p></Button>
     </div>
   </div>
  )
};
export default connect()(PartialAdvertiserOrder);
