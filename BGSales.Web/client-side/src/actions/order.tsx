import axios from "axios";
import { addToken, refreshToken } from "./token";
import { addCheckUser } from "./profile";
import AddOrderInterface from "../interfaces/AddOrderInterface";
import PutOrderInterface from "../interfaces/PutOrderInterface";
import PartialOrderInformationInterface from "../interfaces/PartialOrderInformationInterface";
import { ActionType } from "../interfaces/ActionType";
import OrderInterface from "../interfaces/OrderInterface";
import { bgsApi } from "../modules/api";

const deleteOrders = () => {
  return {
    type: ActionType.DELETE_ORDERS,
    payload: [],
  };
};
const addNameOrderUrl = (nameOrderUrl: string) => {
  return {
    type: ActionType.ADD_NAME_ORDER_URL,
    payload: nameOrderUrl,
  };
};

const addOrders = (orders: Array<PartialOrderInformationInterface>) => {
  return {
    type: ActionType.ADD_ORDERS,
    payload: orders,
  };
};
const addOrder = (order: OrderInterface) => {
  return {
    type: ActionType.ADD_ORDER,
    payload: order,
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
      url: `${bgsApi}/Order/purchase`,
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
const postOrderAccept = (
  orderId: string,
  bloggerUserId: string,
  businessmanUserId: string
) => {
  return (dispatch: Function) => {
    const token = localStorage.getItem("accessToken");
    const formCheck = new FormData();
    formCheck.append("OrderId", orderId);
    formCheck.append("BloggerUserId", bloggerUserId);
    formCheck.append("BusinessmanUserId", businessmanUserId);
    axios({
      method: "POST",
      url: `${bgsApi}/Order/accept`,
      headers: { Authorization: `Bearer ${token}` },
      data: formCheck,
    })
      .then((data: any) => {
        dispatch(getOrder(orderId));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(
                postOrderAccept(orderId, bloggerUserId, businessmanUserId)
              );
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

const postOrderReqest = (userId: string, orderId: string) => {
  return (dispatch: Function) => {
    const token = localStorage.getItem("accessToken");
    const formCheck = new FormData();
    formCheck.append("UserId", userId);
    formCheck.append("OrderId", orderId);
    axios({
      method: "POST",
      url: `${bgsApi}/Order/request`,
      headers: { Authorization: `Bearer ${token}` },
      data: formCheck,
    })
      .then((data: any) => {
        dispatch(getOrders(userId, "available"));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(postOrderReqest(userId, orderId));
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

const getOrder = (idOrder: string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `${bgsApi}/Order/${idOrder}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(addOrder(data.data));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(getOrder(idOrder));
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

const putOrder = (order: PutOrderInterface) => {
  const token = localStorage.getItem("accessToken");
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("OrderId", order.orderId);
    formCheck.append("Title", order.title);
    formCheck.append("AudienceAge", String(order.audienceAge));
    formCheck.append("Description", order.description);
    formCheck.append("Budget", String(order.budget));
    axios({
      method: "PUT",
      url: `${bgsApi}/Order/update`,
      data: formCheck,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(getOrder(order.orderId));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(putOrder(order));
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

const deleteOrder = (id: string, idOrder: string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "DELETE",
      url: `${bgsApi}/Order/remove/${idOrder}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(getOrders(id, "all"));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(deleteOrder(idOrder, id));
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

const postOrder = (order: AddOrderInterface, id: string) => {
  const token = localStorage.getItem("accessToken");
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("Title", order.title);
    formCheck.append("AudienceAge", String(order.audienceAge));
    formCheck.append("Description", order.description);
    formCheck.append("Budget", String(order.budget));
    axios({
      method: "POST",
      url: `${bgsApi}/Order/create`,
      data: formCheck,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(getOrders(id, "all"));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(postOrder(order, id));
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
const getSearchOrders = (
  bloggerId: string,
  searchString: string,
  typeSearch: string
) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `${bgsApi}/Order/${typeSearch}/${bloggerId}/${searchString}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(addOrders(data.data));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(getSearchOrders(bloggerId, searchString, typeSearch));
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
const getOrders = (id: string, name: string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `${bgsApi}/Order/${name}/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(addOrders(data.data));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(getOrders(id, name));
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
  getSearchOrders,
  postOrderAccept,
  postOrderReqest,
  deleteOrders,
  addNameOrderUrl,
  putOrder,
  getOrder,
  deleteOrder,
  postOrder,
  getOrders,
};
