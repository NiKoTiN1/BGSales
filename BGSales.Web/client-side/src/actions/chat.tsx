import axios from "axios";
import { ActionType } from "../interfaces/ActionType";
import history from "../history";
import ChatInterface from "../interfaces/ChatInterface";
import FullChatInterface from "../interfaces/FullChatInterface";
import MessagesInterface from "../interfaces/MessagesInterface";
import { addCheckUser } from "./profile";
import { addToken, refreshToken } from "./token";

const addChats = (chats: Array<ChatInterface>) => {
  return {
    type: ActionType.ADD_CHATS,
    payload: chats,
  };
};

const addChat = (chat: FullChatInterface) => {
  return {
    type: ActionType.ADD_CHAT,
    payload: chat,
  };
};
const addMessage = (message: MessagesInterface) => {
  return {
    type: ActionType.ADD_MESSAGE,
    payload: message,
  };
};

const payOrder = (stripeId: string, orderId: string) => {
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("StripeId", stripeId);
    formCheck.append("OrderId", orderId);
    const token = localStorage.getItem("accessToken");
    axios({
      method: "POST",
      url: "https://localhost:5001/api/Order/purchase",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      data: formCheck,
    })
      .then((data: any) => {
        window.location.href = data.data;
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(payOrder(stripeId, orderId));
            })
            .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(addCheckUser(false));
            });
        }
      });
  };
};
const sendMessage = (senderUserId: string, text: string, chatId: string) => {
  return (dispatch: Function) => {
    const token = localStorage.getItem("accessToken");
    const formCheck = new FormData();
    formCheck.append("SenderUserId", senderUserId);
    formCheck.append("Text", text);
    formCheck.append("ChatId", chatId);
    axios({
      method: "POST",
      url: "https://localhost:5001/api/Chat/send",
      headers: { Authorization: `Bearer ${token}` },
      data: formCheck,
    })
      .then((data: any) => {
        dispatch(getChat(chatId));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(sendMessage(senderUserId, text, chatId));
            })
            .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(addCheckUser(false));
            });
        }
      });
  };
};

const getAllChats = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: "https://localhost:5001/api/Chat/all",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(addChats(data.data));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(getAllChats());
            })
            .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(addCheckUser(false));
            });
        }
      });
  };
};
const getChat = (chatId: string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `https://localhost:5001/api/Chat/${chatId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(addChat(data.data));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(getChat(chatId));
            })
            .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(addCheckUser(false));
            });
        }
      });
  };
};

const joinChat = (bloggerUserId: string, businessmanUserId: string) => {
  return (dispatch: Function) => {
    const token = localStorage.getItem("accessToken");
    const formCheck = new FormData();
    formCheck.append("BloggerUserId", bloggerUserId);
    formCheck.append("BusinessmanUserId", businessmanUserId);
    axios({
      method: "POST",
      url: "https://localhost:5001/api/Chat/join",
      headers: { Authorization: `Bearer ${token}` },
      data: formCheck,
    })
      .then((data: any) => {
        history.push(`/chat/${data.data}`);
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(joinChat(bloggerUserId, businessmanUserId));
            })
            .catch(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(addCheckUser(false));
            });
        }
      });
  };
};

export {
  payOrder,
  addMessage,
  addChat,
  sendMessage,
  getAllChats,
  getChat,
  joinChat,
};
