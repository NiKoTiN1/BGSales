import axios from "axios";
import { ActionType } from "../interfaces/ActionType";
import RegistrationUserInterface from "../interfaces/RegistrationUserInterface";
import LogInUserInterface from "../interfaces/LogInUserInterface";
import UserProfileInterface from "../interfaces/UserProfileInterface";
import AdvertiserProfileInterface from "../interfaces/AdvertiserProfileInterface";
import PartialProfileInterface from "../interfaces/PartialProfileInterface";
import MediaProfileInterface from "../interfaces/MediaProfileInterface";
import jwt from "jwt-decode";
import OrderInterface from "../interfaces/OrderInterface";
import { addToken, refreshToken } from "./token";
import { bgsApi } from "../modules/api";

const addMediaPersons = (mediaPersons: OrderInterface) => {
  return {
    type: ActionType.ADD_MEDIA_PERSONS,
    payload: mediaPersons,
  };
};

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
const addSelectedProfile = (selectedProfile: UserProfileInterface) => {
  return {
    type: ActionType.ADD_SELECTED_PROFILE,
    payload: selectedProfile,
  };
};

const getMediaPersons = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `${bgsApi}Blogger/all`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        let allMediaPersons: any = [];
        data.data.map((item: any) => {
          const userInfo = {
            userId: item.userId,
            imageUrl: item.imageUrl,
            nickname: item.nickname ? item.nickname : "",
            firstName: item.firstName,
            secondName: item.secondName,
            activity: item.activity ? item.activity : "",
            numberSubscribers: item.subscribers ? item.subscribers : "",
          };
          allMediaPersons.push(userInfo);
        });
        dispatch(addMediaPersons(allMediaPersons));
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

const getProfileData = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `${bgsApi}Account/profile`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        console.log(data.data);
        dispatch(changeProfile(data.data));
        dispatch(addSelectedProfile(data.data));
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
const getNewProfileData = (id: string) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch: Function) => {
    axios({
      method: "GET",
      url: `${bgsApi}Account/profile/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data: any) => {
        console.log(data.data);
        dispatch(addSelectedProfile(data.data));
      })
      .catch((data: any) => {
        if (data.response.status === 401) {
          refreshToken()
            .then((data: any) => {
              addToken(data.data);
              dispatch(getNewProfileData(id));
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
    formCheck.append("UrlYouTube", changedProfile.urlYouTube);
    formCheck.append("ImageFile", changedProfile.imageUrl);
    formCheck.append("Activity", changedProfile.activity);
    formCheck.append("Subjects", changedProfile.subjects);
    formCheck.append("Subscribers", String(changedProfile.subscribers));
    formCheck.append("AgeAudience", String(changedProfile.ageAudience));
    axios({
      method: "PUT",
      url: `${bgsApi}Account/update/blogger`,
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
    formCheck.append("ImageFile", changedProfileAdvertiser.imageUrl);
    axios({
      method: "PUT",
      url: `${bgsApi}Account/update/businessman`,
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
      url: `${bgsApi}Account/profile/parital`,
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
      url: `${bgsApi}Account/register`,
      data: formCheck,
    }).then((data: any) => {
      dispatch(getPartialProfileData());
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
      url: `${bgsApi}Account/login`,
      data: formCheck,
    }).then((data: any) => {
      dispatch(getPartialProfileData());
      addToken(data.data);
      const user = jwt(data.data.accessToken);
      dispatch(addRole(Object(user).Role));
      dispatch(addCheckUser(true));
    });
  };
};

export {
  getMediaPersons,
  addCheckUser,
  postProfileData,
  postData,
  changeProfile,
  getPartialProfileData,
  getProfileData,
  putMediaProfileData,
  putAdvertiserProfileData,
  addRole,
  getNewProfileData,
};
