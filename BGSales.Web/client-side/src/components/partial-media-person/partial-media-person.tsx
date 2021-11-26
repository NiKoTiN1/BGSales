import React from "react";
import "./partial-media-person.scss";
import { Link } from "react-router-dom";
import PartialAdvertiserOrderInterface from "../../interfaces/PartialAdvertiserOrderInterface";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteOrder } from "../../actions";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import PartialMediaProfileInterface from "../../interfaces/PartialMediaProfileInterface";
import PropsPartialMediaPersonInterface from "../../interfaces/PropsPartialMediaPersonInterface";

const PartialMediaPerson = ({
  userId,
  imageUrl,
  firstName,
  secondName,
  activity,
  numberSubscribers,
  onItemSelected,
}: PropsPartialMediaPersonInterface) => {

  return(  
    <>
      <div className="partial-media-person-img">
        <img className="partial-media-person-img__img" src={imageUrl?String(imageUrl): imageSrc} alt="" />
      </div>
      <div className="partial-media-person-info">
        <div className="partial-media-person-info__container">
            <p>{firstName}</p> 
            <p>{secondName}</p>  
            <p>Activity:  {activity?activity:"empty"}</p> 
            <p>Subscribers:  {numberSubscribers?numberSubscribers:"empty"}</p> 
        </div>
        <div className="partial-media-person-info__container">
            <Button className="partial-media-person-info__container__btn-look btn" variant="outlined" onClick={()=>onItemSelected(userId)}>Look</Button>
        </div>
      </div>
   </>
  )
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(PartialMediaPerson);
