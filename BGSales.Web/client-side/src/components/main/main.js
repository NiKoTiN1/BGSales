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
import "./main.scss";
var Main = function () {
    return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: "cards" }, { children: [_jsx("div", __assign({ className: "card-1 card" }, { children: _jsx("div", __assign({ className: "card-1__image image" }, { children: _jsx("div", __assign({ className: "data" }, { children: _jsxs("div", __assign({ className: "content" }, { children: [_jsx("h1", __assign({ className: "title" }, { children: "Boxing icon has the will for a couple more fights" }), void 0), _jsx("p", __assign({ className: "text" }, { children: "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years." }), void 0)] }), void 0) }), void 0) }), void 0) }), void 0), _jsx("div", __assign({ className: "card-2 card" }, { children: _jsx("div", __assign({ className: "card-2__image image" }, { children: _jsx("div", __assign({ className: "data" }, { children: _jsxs("div", __assign({ className: "content" }, { children: [_jsx("h1", __assign({ className: "title" }, { children: "Boxing icon has the will for a couple more fights" }), void 0), _jsx("p", __assign({ className: "text" }, { children: "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years." }), void 0)] }), void 0) }), void 0) }), void 0) }), void 0)] }), void 0), _jsx("div", __assign({ className: "info" }, { children: _jsx("label", __assign({ className: "info__label" }, { children: "Thanks to this site, many media personalities were able to get decent pay, and advertisers gained new customers through advertising media personalities." }), void 0) }), void 0), _jsx("div", __assign({ className: "button-container" }, { children: _jsx(Link, __assign({ className: "button-container__pressed", to: "/authorization" }, { children: "Start now" }), void 0) }), void 0)] }, void 0));
};
export default Main;
