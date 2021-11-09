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
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postProfileData } from '../../actions';
import './login-form.scss';
var LoginForm = function (_a) {
    var dispatch = _a.dispatch, history = _a.history;
    var _b = useState({
        email: '',
        password: ''
    }), form = _b[0], setForm = _b[1];
    var submitForm = function (e) {
        e.preventDefault();
        var user = {
            Email: form.email,
            Password: form.password,
        };
        dispatch(postProfileData(user));
        history.push('/');
    };
    return (_jsxs("form", __assign({ className: "registration-form", onSubmit: submitForm }, { children: [_jsx("h2", __assign({ className: "registration-form__heading" }, { children: "Sign in" }), void 0), _jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "Email", type: "email", name: "email", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { email: e.target.value })); } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "Password", type: "password", name: "password", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { password: e.target.value })); } }, void 0) }), void 0), _jsxs("div", __assign({ className: "registration-form__button" }, { children: [_jsx(Button, __assign({ type: "submit", variant: "contained" }, { children: "Sign in" }), void 0), _jsx(Link, __assign({ className: "registration-form__button_signin", to: '/registration' }, { children: _jsx(Button, __assign({ variant: "outlined" }, { children: "Sign up" }), void 0) }), void 0)] }), void 0)] }), void 0));
};
export default connect()(LoginForm);
