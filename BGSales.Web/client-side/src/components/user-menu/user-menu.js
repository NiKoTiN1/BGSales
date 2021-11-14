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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { connect } from "react-redux";
import "./user-menu.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { addCheckUser } from "../../actions";
import { imageSrc } from "../../imageRequire";
var UserMenu = function (_a) {
    var dispatch = _a.dispatch, currentUser = _a.currentUser;
    var _b = useState(false), userMenu = _b[0], setUserMenu = _b[1];
    var logOut = function () {
        dispatch(addCheckUser(false));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };
    return (_jsxs("div", __assign({ className: "user-menu" }, { children: [_jsx("p", { children: _jsx("img", { className: "user-menu__img", src: imageSrc, alt: "", onClick: function () { return setUserMenu(!userMenu); } }, void 0) }, void 0), userMenu ? (_jsxs("div", __assign({ className: "user-menu__select" }, { children: [_jsx("div", { children: _jsx(Link, __assign({ className: "user-menu__select__button", to: currentUser.role === "Blogger"
                                ? "/profileMedia"
                                : "/profileAdvertiser" }, { children: _jsx(Button, __assign({ className: "user-menu__select__button_exit", variant: "contained" }, { children: "Profile" }), void 0) }), void 0) }, void 0), _jsx("div", { children: _jsx(Button, __assign({ className: "user-menu__select__button_exit", variant: "contained", onClick: function () { return logOut(); } }, { children: "Exit" }), void 0) }, void 0)] }), void 0)) : null] }), void 0));
};
var mapStateToProps = function (state) {
    return {
        currentUser: state.reducer.currentUser,
    };
};
export default connect(mapStateToProps)(UserMenu);
