import axios from "axios";
import { ActionType } from "../interfaces/ActionType";
import TokenDataInterface from "../interfaces/TokenDataInterface";
import RegistrationUserInterface from "../interfaces/RegistrationUserInterface";
import LogInUserInterface from "../interfaces/LogInUserInterface";
import UserProfileInterface from "../interfaces/UserProfileInterface";
import AdvertiserProfileInterface from "../interfaces/AdvertiserProfileInterface";
import PartialProfileInterface from "../interfaces/PartialProfileInterface";
import MediaProfileInterface from "../interfaces/MediaProfileInterface";
import jwt from "jwt-decode";
import InitialStateInterfaceOrders from "../interfaces/InitialStateInterfaceOrders";
import OrderInterface from "../interfaces/OrderInterface";
import AddOrderInterface from "../interfaces/AddOrderInterface";

const addCheckUser = (checkUser: boolean) => {
  return {
    type: ActionType.ADD_CHECK,
    payload: checkUser,
  };
};
const changeProfile = (changeProfile: UserProfileInterface) => {
  return {
    type: ActionType.CHANGE_PROFILE,
    payload: changeProfile,
  };
};
const addPatialProfile = (patialProfile: PartialProfileInterface) => {
  return {
    type: ActionType.ADD_PARTIAL_PROFILE,
    partProfile: patialProfile,
  };
};
const addRole = (role: string) => {
  return {
    type: ActionType.ADD_ROLE,
    payload: role,
  };
};
const addOrdersAdvertiser = (orders: InitialStateInterfaceOrders) => {
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
const addMediaPersons = (mediaPersons: OrderInterface) => {
  return {
    type: ActionType.ADD_MEDIA_PERSONS,
    payload: mediaPersons,
  };
};
const deleteMediaPersons = () => {
  return {
    type: ActionType.DELETE_MEDIA_PERSONS,
    payload: [],
  };
};
const addToken = (data: TokenDataInterface) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

const getMediaPersons = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: "https://localhost:5001/api/Blogger/all",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
          let allMediaPersons:any = [];
          data.data.map((item:any)=>{
            const userInfo = {
              userId: item.userId,
              imageUrl: item.imageUrl,
              nickname: item.nickname ? item.nickname : "",
              firstName: item.firstName,
              secondName: item.secondName,
              activity: item.activity ? item.activity : "",
              numberSubscribers: item.subscribers ?item.subscribers : "",
            };
            allMediaPersons.push(userInfo);
          })
          dispatch(addMediaPersons(allMediaPersons))
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
        refreshToken()
          .then((data: any) => {
            addToken(data.data);
            dispatch(getMediaPersons());
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

const getOrder = (idOrder:string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `https://localhost:5001/api/Order/${idOrder}`,
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
          dispatch(addOrder(data.data));
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
interface PutOrderInterface{
  orderId: string;
  title: string;
  audienceAge: number;
  description: string;
  budget: number;
  updateDate: string;
}
const putOrder = (order:PutOrderInterface) => {
  const token = localStorage.getItem("accessToken");
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("OrderId", order.orderId);
    formCheck.append("Title", order.title);
    formCheck.append("AudienceAge", String(order.audienceAge));
    formCheck.append("Description", order.description);
    formCheck.append("Budget", String(order.budget));
    formCheck.append("UpdateDate", String(order.updateDate));
    axios({
      method: "PUT",
      url: `https://localhost:5001/api/Order/update`,
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


const deleteOrder = (id: string, idOrder : string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "DELETE",
      url: `https://localhost:5001/api/Order/remove/${idOrder}`,
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

const postOrder = (order : AddOrderInterface) => {
  const token = localStorage.getItem("accessToken");
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("Title", order.title);
    formCheck.append("AudienceAge", String(order.audienceAge));
    formCheck.append("Description", order.description);
    formCheck.append("Budget", String(order.budget));
    formCheck.append("CreateDate", String(order.createDate));
    axios({
      method: "POST",
      url: "https://localhost:5001/api/Order/create",
      data: formCheck,
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((data: any) => {
      if (data.response.status === 401) {
      refreshToken()
        .then((data: any) => {
          addToken(data.data);
          dispatch(postOrder(order));
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
const getOrders = (id : string, name:string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `https://localhost:5001/api/Order/${name}/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((data: any) => {
      dispatch(addOrdersAdvertiser(data.data));
    })
    .catch((data: any) => {
      dispatch(deleteMediaPersons());
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





const getProfileData = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: "https://localhost:5001/api/Account/profile",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        const userInfo = {
          userId: data.data.userId,
          imageUrl: data.data.imageUrl,
          nickname: data.data.nickname ? data.data.nickname : "",
          firstName: data.data.firstName,
          secondName: data.data.secondName,
          ageAdvertising: data.data.bloggerExperience
            ? data.data.bloggerExperience
            : "",
          linkChannel: data.data.urlYouTube ? data.data.urlYouTube : "",
          ordersCompleted: data.data.ordersCompleted
            ? data.data.ordersCompleted
            : "",
          activity: data.data.activity ? data.data.activity : "",
          subjects: data.data.subjects ? data.data.subjects : "",
          numberSubscribers: data.data.subscribers ? data.data.subscribers : "",
          ageAudience: data.data.ageAudience ? data.data.ageAudience : "",
          nameCompany: data.data.nameCompany ? data.data.nameCompany : "",
          numberOffers: data.data.numberOffers ? data.data.numberOffers : "",
        };
        dispatch(changeProfile(userInfo));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
        refreshToken()
          .then((data: any) => {
            addToken(data.data);
            dispatch(getProfileData());
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
const putMediaProfileData = (changedProfile: MediaProfileInterface) => {
  const token = localStorage.getItem("accessToken");
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("UserId", changedProfile.userId);
    formCheck.append("FirstName", changedProfile.firstName);
    formCheck.append("SecondName", changedProfile.secondName);
    formCheck.append("Nickname", changedProfile.nickname);
    formCheck.append("UrlYouTube", changedProfile.linkChannel);
    formCheck.append("ImageFile", String(changedProfile.imageUrl));
    formCheck.append("Activity", changedProfile.activity);
    formCheck.append("Subjects", changedProfile.subjects);
    formCheck.append("Subscribers", String(changedProfile.numberSubscribers));
    formCheck.append("AgeAudience", String(changedProfile.ageAudience));
    formCheck.append("BloggerExperience", String(changedProfile.ageAdvertising));
    axios({
      method: "PUT",
      url: "https://localhost:5001/api/Account/update/blogger",
      data: formCheck,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(getProfileData());
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
        refreshToken()
          .then((data: any) => {
            addToken(data.data);
            dispatch(putMediaProfileData(changedProfile));
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
const putAdvertiserProfileData = (
  changedProfileAdvertiser: AdvertiserProfileInterface
) => {
  const token = localStorage.getItem("accessToken");
  const formCheck = new FormData();
  return (dispatch: Function) => {
    formCheck.append("UserId", changedProfileAdvertiser.userId);
    formCheck.append("FirstName", changedProfileAdvertiser.firstName);
    formCheck.append("SecondName", changedProfileAdvertiser.secondName);
    formCheck.append("NameCompany", changedProfileAdvertiser.nameCompany);
    formCheck.append("ImageFile", String(changedProfileAdvertiser.imageUrl));
    console.log(String(changedProfileAdvertiser.imageUrl));
    axios({
      method: "PUT",
      url: "https://localhost:5001/api/Account/update/businessman",
      data: formCheck,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        dispatch(getProfileData());
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
        refreshToken()
          .then((data: any) => {
            addToken(data.data);
            dispatch(putAdvertiserProfileData(changedProfileAdvertiser));
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
const getPartialProfileData = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: "https://localhost:5001/api/Account/profile/parital",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        const partInfo = {
          userId: data.data.userId,
          imageUrl: data.data.imageUrl,
          money: data.data.money,
        };
        dispatch(addPatialProfile(partInfo));
        dispatch(addCheckUser(true));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
        refreshToken()
          .then((data: any) => {
            addToken(data.data);
            dispatch(getPartialProfileData());
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

const postData = (user: RegistrationUserInterface) => {
  return (dispatch: Function) => {
    const formCheck = new FormData();
    formCheck.append("FirstName", user.FirstName);
    formCheck.append("LastName", user.LastName);
    formCheck.append("UserType", user.UserType);
    formCheck.append("Email", user.Email);
    formCheck.append("Password", user.Password);
    axios({
      method: "POST",
      url: "https://localhost:5001/api/Account/register",
      data: formCheck,
    }).then((data: any) => {
      addToken(data.data);
      const user = jwt(data.data.accessToken);
      dispatch(addRole(Object(user).Role));
      dispatch(addCheckUser(true));
    });
  };
};

const postProfileData = (user: LogInUserInterface) => {
  return (dispatch: Function) => {
    const formCheck = new FormData();
    formCheck.append("Email", user.Email);
    formCheck.append("Password", user.Password);
    axios({
      method: "POST",
      url: "https://localhost:5001/api/Account/login",
      data: formCheck,
    }).then((data: any) => {
      addToken(data.data);
      const user = jwt(data.data.accessToken);
      dispatch(addRole(Object(user).Role));
      dispatch(addCheckUser(true));
    });
  };
};
const refreshToken = () => {
  const checkUser = {
    AccessToken: localStorage.getItem("accessToken"),
    RefreshToken: localStorage.getItem("refreshToken"),
  };
  return axios({
    method: "PUT",
    url: "https://localhost:5001/api/Token/refresh",
    headers: {
      "Content-Type": "application/json",
    },
    data: { ...checkUser },
  });
};
export {
  getMediaPersons,
  putOrder,
  getOrder,
  deleteOrder,
  postOrder,
  getOrders,
  refreshToken,
  addCheckUser,
  postProfileData,
  postData,
  changeProfile,
  getPartialProfileData,
  getProfileData,
  putMediaProfileData,
  putAdvertiserProfileData,
  addRole,
};
