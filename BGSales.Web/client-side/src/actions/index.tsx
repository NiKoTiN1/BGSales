import axios from "axios";
import { ActionType } from "../interfaces/ActionType";
import TokenDataInterface from "../interfaces/TokenDataInterface";
import RegistrationUserInterface from "../interfaces/RegistrationUserInterface";
import LogInUserInterface from "../interfaces/LogInUserInterface";
import UserProfileInterface from "../interfaces/UserProfileInterface";
import AdvertiserProfileInterface from "../interfaces/AdvertiserProfileInterface";
import PartialProfileInterface from "../interfaces/PartialProfileInterface";
import MediaProfileInterface from "../interfaces/MediaProfileInterface";

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

const addToken = (data: TokenDataInterface) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
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
          ageAdvertising: data.data.ageAdvertising
            ? data.data.ageAdvertising
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
