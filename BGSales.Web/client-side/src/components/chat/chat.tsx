import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./chat.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getPartialProfileData, getChat } from "../../actions";
import MessageSendForm from "../message-send-form";
const Chat = ({
  checkUser,
  currentUser,
  dispatch,
}: AppHeaderInterface) => {
  const [chekedChatId, setChekedChatId] = useState( window.location.href.slice(window.location.href.lastIndexOf("/") + 1))
  useEffect(() => {
    if (chekedChatId) {
      dispatch(getChat(chekedChatId));
    }
  }, []);
  return (
    <div>
       <MessageSendForm />
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => {
  return {
    checkUser: state.profile.checkUser,
    currentUser: state.profile.currentUser,
  };
};

export default connect(mapStateToProps)(Chat);
