var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import axios from "axios";
import { ActionType } from "../interfaces/ActionType";
var addCheckUser = function (checkUser) {
    return {
        type: ActionType.ADD_CHECK,
        payload: checkUser,
    };
};
var changeProfile = function (changeProfile) {
    return {
        type: ActionType.CHANGE_PROFILE,
        payload: changeProfile,
    };
};
var addToken = function (data) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
};
var postData = function (user) {
    return function (dispatch) {
        var formCheck = new FormData();
        formCheck.append("FirstName", user.FirstName);
        formCheck.append("LastName", user.LastName);
        formCheck.append("UserType", user.UserType);
        formCheck.append("Email", user.Email);
        formCheck.append("Password", user.Password);
        axios({
            method: "POST",
            url: "https://localhost:5001/api/Account/register",
            data: formCheck,
        }).then(function (data) {
            addToken(data.data);
            dispatch(addCheckUser(true));
        });
    };
};
var postProfileData = function (user) {
    return function (dispatch) {
        var formCheck = new FormData();
        formCheck.append("Email", user.Email);
        formCheck.append("Password", user.Password);
        axios({
            method: "POST",
            url: "https://localhost:5001/api/Account/login",
            data: formCheck,
        }).then(function (data) {
            //dispatch(registrUser());
            addToken(data.data);
            dispatch(addCheckUser(true));
        });
    };
};
var refreshToken = function () {
    return function (dispatch) {
        var checkUser = {
            AccessToken: localStorage.getItem("accessToken"),
            RefreshToken: localStorage.getItem("refreshToken"),
        };
        axios({
            method: "PUT",
            url: "https://localhost:5001/api/Token/refresh",
            headers: {
                "Content-Type": "application/json",
            },
            data: __assign({}, checkUser),
        })
            .then(function (data) {
            addToken(data.data);
            dispatch(addCheckUser(true));
        })
            .catch(function () {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(addCheckUser(false));
        });
    };
};
export { refreshToken, addCheckUser, postProfileData, postData, changeProfile };
