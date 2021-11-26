import React from "react";
import "./partial-order.scss";
import { Link } from "react-router-dom";
import PartialAdvertiserOrderInterface from "../../interfaces/PartialAdvertiserOrderInterface";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteOrder } from "../../actions";
import StateInterface from "../../interfaces/StateInterface";

const PartialOrder = ({
  id,
  orderId,
  companyName,
  title,
  budget,
  currentUser,
  dispatch,
  onItemSelected
}: PartialAdvertiserOrderInterface) => {
  const removeOrder = () => {
    dispatch(deleteOrder(id, orderId));
  }
  return(  
   <div className="order-partial-info">
     <div className="order-partial-info__container">
        <p>{title}</p> 
        <p>{companyName}</p>  
        <p>{budget}$</p> 
     </div>
     <div className="order-partial-info__container">
        <Button className="order-partial-info__container__btn-look btn" variant="outlined" onClick={()=>onItemSelected(orderId)}>Look</Button>
        {currentUser.role === "Businessman"?<Button className="order-partial-info__container__btn-delete btn" variant="contained" onClick={removeOrder}><p>Delete</p></Button>
        : <Button className="order-partial-info__container__btn-delete btn" variant="contained"><p>Respond</p></Button>}
        
     </div>
   </div>
  )
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(PartialOrder);
