import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./chat.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getAllChats, getChat } from "../../actions";
import MessageSendForm from "../message-send-form";
import ChatInterface from "../../interfaces/ChatInterface";
const Chat = ({
  chatId,
  chats,
  dispatch,
  userId,
}: any) => {
  useEffect(() => {
    dispatch(getAllChats());
    if (chatId) {
      dispatch(getChat(chatId));
    }
  }, [chatId]);
  const elements = chats.map((item: ChatInterface) => {
    return (
      <Link to={`/chat/${item.chatId}`}>
        <li key={item.userId+12}>
          <p>{item.firstName}</p>
          <p>{item.secondName}</p>
        </li>
      </Link>
    );
  });
  return (
    <div className="chat-page">
      <ul className="chats">{elements}</ul>
      <div className="chat">
        <div className="chat__message"></div>
        <MessageSendForm chatId={chatId} userId={userId}/>
      </div>
    </div>
  );
};


const mapStateToProps = (state: StateInterface) => {
  return {
    chats: state.chat.chats,
    userId: state.profile.currentUser.profile.userId,
  };
};
export default connect(mapStateToProps)(Chat);
