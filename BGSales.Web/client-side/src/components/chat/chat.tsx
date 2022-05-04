import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./chat.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getAllChats, getChat, addChat, addMessage } from "../../actions";
import MessageSendForm from "../message-send-form";
import ChatInterface from "../../interfaces/ChatInterface";
import MessagesInterface from "../../interfaces/MessagesInterface";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from "@microsoft/signalr";
import { imageSrc } from "../../imageRequire";

const Chat = ({ chatId, chats, dispatch, chat, userId, role }: any) => {
  const [connection, setConnection] = useState<HubConnection>();
  const [chated, setChat] = useState<any>([]);
  const latestChat = useRef<any>();
  latestChat.current = chated;
  useEffect(() => {}, [chat]);
  useEffect(() => {
    dispatch(getAllChats());
    if (chatId) {
      dispatch(getChat(chatId));
    }
  }, [chatId]);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/chatsocket", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("ReceiveOne", (message) => {
            setTimeout(() => {}, 200);
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            dispatch(addMessage(message));
            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    } else {
      console.log("No");
    }
  }, [connection]);
  const elements = chats.map((item: ChatInterface) => {
    return (
      <Link className="chats__person-link" to={`/chat/${item.chatId}`}>
        <li className="chats__person" key={item.userId + "12dfk;bdf"}>
          <img
            className="chats__person__img"
            src={item.imageUrl ? item.imageUrl : imageSrc}
            alt=""
          />
          <p className="chats__person__name">{item.firstName}</p>
          <p className="chats__person__name">{item.secondName}</p>
        </li>
      </Link>
    );
  });
  const messages = chat.messages.map((item: MessagesInterface) => {
    return (
      <li
        key={item.messageId}
        className={
          userId === item.senderUserId
            ? "chat__message__right-message"
            : "chat__message__left-message"
        }
      >
        <p>{item.text}</p>
      </li>
    );
  });
  if (role === "") {
    return <p>Error this page is not available</p>;
  }
  return (
    <div className="chat-page">
      <ul className="chats">{elements}</ul>
      <div className="chat">
        {chatId ? (
          <div className="chat__header">
            <img
              className="chat__header__img"
              src={
                chat.recivierInfo.imageUrl
                  ? chat.recivierInfo.imageUrl
                  : imageSrc
              }
              alt=""
            />
            <p className="chat__header__name">{chat.recivierInfo.firstName}</p>
            <p className="chat__header__name">{chat.recivierInfo.secondName}</p>
          </div>
        ) : null}
        <ul className="chat__message"> {messages}</ul>
        {chatId ? <MessageSendForm chatId={chatId} userId={userId} /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => {
  return {
    chats: state.chat.chats,
    chat: state.chat.chat,
    userId: state.profile.currentUser.profile.userId,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(Chat);
