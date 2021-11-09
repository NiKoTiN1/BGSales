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
import { connect } from 'react-redux';
import './app-header.scss';
import UserMenu from '../user-menu';
var AppHeader = function (props) {
    return (_jsx("header", __assign({ className: "header" }, { children: props.checkUser ? _jsx(UserMenu, {}, void 0)
            : _jsx(Link, __assign({ className: "header__link", to: '/authorization' }, { children: "Authorization" }), void 0) }), void 0));
};
var mapStateToProps = function (state) {
    return {
        checkUser: state.reducer.checkUser,
    };
};
export default connect(mapStateToProps)(AppHeader);
