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
import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './app-header.scss';
var AppHeader = function () {
    return (_jsx("header", __assign({ className: "header" }, { children: _jsx(Link, __assign({ className: "header__link", to: '/authorization' }, { children: "Authorization" }), void 0) }), void 0));
};
export default AppHeader;
