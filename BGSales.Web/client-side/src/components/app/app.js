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
import { useEffect } from "react";
import Main from "../main";
import LoginForm from "../login-form";
import RegistrationForm from "../registration-form";
import MediaPersonProfile from "../media-person-profile";
import MediaPersonProfileEdit from "../media-person-profile-edit";
import AdvertiserPersonProfile from "../advertiser-person-profile";
import AdvertiserPersonProfileEdit from "../advertiser-person-profile-edit";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import AppHeader from "../app-header";
import AppFooter from "../app-footer";
import "./app.scss";
var App = function (_a) {
    var currentUser = _a.currentUser, dispatch = _a.dispatch;
    useEffect(function () {
        // dispatch(refreshToken());
    });
    return (_jsxs("div", __assign({ className: "main-content" }, { children: [_jsx(AppHeader, {}, void 0), _jsxs(Switch, { children: [_jsx(Route, { path: "/authorization", exact: true, component: LoginForm }, void 0), _jsx(Route, { path: "/registration", exact: true, component: RegistrationForm }, void 0), _jsx(Route, { path: "/", exact: true, component: Main }, void 0), _jsx(Route, __assign({ path: "/profileMedia", exact: true }, { children: currentUser.role !== "Blogger" ? (_jsx(Redirect, { to: "/authorization" }, void 0)) : (_jsx(MediaPersonProfile, {}, void 0)) }), void 0), _jsx(Route, __assign({ path: "/profileMediaEdit", exact: true }, { children: currentUser.role !== "Blogger" ? (_jsx(Redirect, { to: "/authorization" }, void 0)) : (_jsx(Route, { component: MediaPersonProfileEdit }, void 0)) }), void 0), _jsx(Route, __assign({ path: "/profileAdvertiser", exact: true }, { children: currentUser.role !== "Businessman" ? (_jsx(Redirect, { to: "/authorization" }, void 0)) : (_jsx(AdvertiserPersonProfile, {}, void 0)) }), void 0), _jsx(Route, __assign({ path: "/profileAdvertiserEdit", exact: true }, { children: currentUser.role !== "Businessman" ? (_jsx(Redirect, { to: "/authorization" }, void 0)) : (_jsx(Route, { component: AdvertiserPersonProfileEdit }, void 0)) }), void 0)] }, void 0), _jsx(AppFooter, {}, void 0)] }), void 0));
};
var mapStateToProps = function (state) {
    return {
        currentUser: state.reducer.currentUser,
    };
};
export default connect(mapStateToProps)(App);
