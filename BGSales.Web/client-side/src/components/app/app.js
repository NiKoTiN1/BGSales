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
import { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../app-header';
import { MainPage, LoginPage, RegistretionPage } from '../pages/index';
import './app.scss';
var App = function (props) {
    return (_jsxs("div", { children: [_jsx(AppHeader, {}, void 0), _jsx(Suspense, __assign({ fallback: _jsx("div", { children: "Loading..." }, void 0) }, { children: _jsxs(Switch, { children: [_jsx(Route, { path: '/authorization', exact: true, component: LoginPage }, void 0), _jsx(Route, { path: '/registration', exact: true, component: RegistretionPage }, void 0), _jsx(Route, { path: '/', exact: true, component: MainPage }, void 0)] }, void 0) }), void 0)] }, void 0));
};
export default connect()(App);
