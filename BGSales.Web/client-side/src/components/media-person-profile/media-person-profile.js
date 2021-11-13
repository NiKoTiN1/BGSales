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
import "./media-person-profile.scss";
import { Button } from "@material-ui/core";
import { imageSrc } from "../../imageRequire";
var MediaPersonProfile = function (_a) {
    var currentUser = _a.currentUser, dispatch = _a.dispatch;
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ className: "edit" }, { children: _jsx(Link, __assign({ className: "edit__link", to: "/profileMediaEdit" }, { children: _jsx(Button, __assign({ variant: "outlined" }, { children: "Edit" }), void 0) }), void 0) }), void 0), _jsxs("div", __assign({ className: "media-profile" }, { children: [_jsx("p", { children: _jsx("img", { className: "media-profile__img", src: currentUser.profile.imageUrl
                                ? currentUser.profile.imageUrl
                                : imageSrc, alt: "" }, void 0) }, void 0), _jsxs("div", __assign({ className: "information" }, { children: [_jsxs("div", __assign({ className: "information__name col-1" }, { children: [_jsx("p", { children: "First name:" }, void 0), _jsx("p", { children: "Second name:" }, void 0), _jsx("p", { children: "Age of working with advertising:" }, void 0), _jsx("p", { children: "Link to channel:" }, void 0), _jsx("p", { children: "Number of completed orders:" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "information__name col-2" }, { children: [_jsx("p", { children: currentUser.profile.firstName }, void 0), _jsx("p", { children: currentUser.profile.secondName }, void 0), _jsx("p", { children: currentUser.profile.ageAdvertising }, void 0), _jsx("a", __assign({ href: currentUser.profile.linkChannel }, { children: "link to channel/page" }), void 0), _jsx("p", { children: "0" }, void 0)] }), void 0)] }), void 0)] }), void 0), _jsx("div", __assign({ className: "media-header" }, { children: _jsx("h1", { children: "Activity information" }, void 0) }), void 0), _jsxs("div", __assign({ className: "information-activity" }, { children: [_jsxs("div", __assign({ className: "information-activity__name col-1" }, { children: [_jsx("p", { children: "Activity:" }, void 0), _jsx("p", { children: "Subjects:" }, void 0), _jsx("p", { children: "Number of subscribers:" }, void 0), _jsx("p", { children: "Average age of the audience:" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "information-activity__name col-2" }, { children: [_jsx("p", { children: currentUser.profile.ordersCompleted }, void 0), _jsx("p", { children: currentUser.profile.subjects }, void 0), _jsx("p", { children: currentUser.profile.numberSubscribers }, void 0), _jsx("p", { children: currentUser.profile.ageAudience }, void 0)] }), void 0)] }), void 0)] }, void 0));
};
var mapStateToProps = function (state) {
    return {
        currentUser: state.reducer.currentUser,
    };
};
export default connect(mapStateToProps)(MediaPersonProfile);
