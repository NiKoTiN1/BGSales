import axios from "axios";
import TokenDataInterface from "../interfaces/TokenDataInterface";
import { bgsApi } from "../modules/api";

const addToken = (data: TokenDataInterface) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};
const refreshToken = () => {
  const checkUser = {
    AccessToken: localStorage.getItem("accessToken"),
    RefreshToken: localStorage.getItem("refreshToken"),
  };
  return axios({
    method: "PUT",
    url: `${bgsApi}/Token/refresh`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { ...checkUser },
  });
};

export { addToken, refreshToken };
