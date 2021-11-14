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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./advertiser-person-profile.scss";
import { Button } from "@material-ui/core";
import { imageSrc } from "../../imageRequire";
var AdvertiserPersonProfile = function (_a) {
    var currentUser = _a.currentUser, dispatch = _a.dispatch;
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ className: "edit" }, { children: _jsx(Link, __assign({ className: "edit__link", to: "/profileAdvertiserEdit" }, { children: _jsx(Button, __assign({ variant: "outlined" }, { children: "Edit" }), void 0) }), void 0) }), void 0), _jsxs("div", __assign({ className: "media-profile" }, { children: [_jsx("p", { children: _jsx("img", { className: "media-profile__img", src: currentUser.profile.imageUrl
                                ? currentUser.profile.imageUrl
                                : imageSrc, alt: "" }, void 0) }, void 0), _jsxs("div", __assign({ className: "information" }, { children: [_jsxs("div", __assign({ className: "information__name col-1" }, { children: [_jsx("p", { children: "First name:" }, void 0), _jsx("p", { children: "Second name:" }, void 0), _jsx("p", { children: "Name Company:" }, void 0), _jsx("p", { children: "Number Offers:" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "information__name col-2" }, { children: [_jsx("p", { children: currentUser.profile.firstName }, void 0), _jsx("p", { children: currentUser.profile.secondName }, void 0), _jsx("p", { children: currentUser.profile.nameCompany }, void 0), _jsx("p", { children: currentUser.profile.numberOffers }, void 0)] }), void 0)] }), void 0)] }), void 0)] }, void 0));
};
var mapStateToProps = function (state) {
    return {
        currentUser: state.reducer.currentUser,
    };
};
export default connect(mapStateToProps)(AdvertiserPersonProfile);
