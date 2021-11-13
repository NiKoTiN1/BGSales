import axios from "axios";
import { ActionType } from "../interfaces/ActionType";
import TokenDataInterface from "../interfaces/TokenDataInterface";
import RegistrationUserInterface from "../interfaces/RegistrationUserInterface";
import LogInUserInterface from "../interfaces/LogInUserInterface";
import UserProfileInterface from "../interfaces/UserProfileInterface";

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
const addToken = (data: TokenDataInterface) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
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
      //dispatch(registrUser());
      addToken(data.data);
      dispatch(addCheckUser(true));
    });
  };
};
const refreshToken = () => {
  return (dispatch: Function) => {
    const checkUser = {
      AccessToken: localStorage.getItem("accessToken"),
      RefreshToken: localStorage.getItem("refreshToken"),
    };
    axios({
      method: "PUT",
      url: "https://localhost:5001/api/Token/refresh",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...checkUser },
    })
      .then((data: any) => {
        addToken(data.data);
        dispatch(addCheckUser(true));
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(addCheckUser(false));
      });
  };
};
export { refreshToken, addCheckUser, postProfileData, postData, changeProfile };
