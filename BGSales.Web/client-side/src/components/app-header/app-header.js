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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";
import UserMenu from "../user-menu";
var AppHeader = function (_a) {
    var checkUser = _a.checkUser, currentUser = _a.currentUser;
    return (_jsx("header", __assign({ className: "header" }, { children: checkUser ? (_jsxs(_Fragment, { children: [currentUser.role === "Blogger" ? (_jsxs(_Fragment, { children: [_jsx(Link, __assign({ className: "header__link projects", to: "/allProjects" }, { children: "All Projects" }), void 0), _jsx(Link, __assign({ className: "header__link projects", to: "/selectedProjects" }, { children: "Selected Projects" }), void 0)] }, void 0)) : (_jsxs(_Fragment, { children: [_jsx(Link, __assign({ className: "header__link projects", to: "/bloggers" }, { children: "Bloggers" }), void 0), _jsx(Link, __assign({ className: "header__link projects", to: "/myProjects" }, { children: "My Projects" }), void 0), " "] }, void 0)), _jsxs(Link, __assign({ className: "header__link notification", to: "#" }, { children: [_jsx("span", { children: "Inbox" }, void 0), _jsx("span", __assign({ className: "notification__badge" }, { children: "1" }), void 0)] }), void 0), _jsx(Link, __assign({ className: "header__link wallet", to: "/wallet" }, { children: "0.00 $" }), void 0), _jsx(UserMenu, {}, void 0)] }, void 0)) : (_jsx(Link, __assign({ className: "header__link", to: "/authorization" }, { children: "Authorization" }), void 0)) }), void 0));
};
var mapStateToProps = function (state) {
    return {
        checkUser: state.reducer.checkUser,
        currentUser: state.reducer.currentUser,
    };
};
export default connect(mapStateToProps)(AppHeader);
