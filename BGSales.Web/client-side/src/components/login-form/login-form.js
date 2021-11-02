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
// import {checkUsername} from '../../actions';
// import Service from '../../services/services'
import { connect } from 'react-redux';
// import ServiceToken from '../../services/servicesToken'
// import {StateProps, HistoryProps} from '../../interfaces/interfaces'
import './login-form.scss';
import { Link } from 'react-router-dom';
// type Props = HistoryProps & StateProps
var LoginForm = function (props) {
    var _a = useState({
        email: '',
        password: ''
    }), form = _a[0], setForm = _a[1];
    var submitForm = function (e) {
        e.preventDefault();
        // ser.postData('api/login',{
        //   Username: form.email,
        //   Password: form.password,
        // })
        // .then((data:any) => {
        //   props.checkUsername(true)
        //   serToken.addToken(data);
        //   setTimeout(()=>props.history.push('/infopage'),900);
        // })  
        // .catch((data:any) => {
        //   console.log(data);
        // })
    };
    return (_jsxs("form", __assign({ className: "registration-form", onSubmit: submitForm }, { children: [_jsx("h2", __assign({ className: "registration-form__heading" }, { children: "Sign in" }), void 0), _jsxs("div", __assign({ className: "registration-form__blok" }, { children: [_jsx("label", __assign({ className: "registration-form__label" }, { children: "Email address" }), void 0), _jsx(TextField, { type: "email", name: "email", onChange: function (e) { return setForm(__assign(__assign({}, form), { email: e.target.value })); } }, void 0)] }), void 0), _jsxs("div", __assign({ className: "registration-form__blok" }, { children: [_jsx("label", __assign({ className: "registration-form__label", htmlFor: "password" }, { children: "Password" }), void 0), _jsx(TextField, { type: "password", name: "password", onChange: function (e) { return setForm(__assign(__assign({}, form), { password: e.target.value })); } }, void 0)] }), void 0), _jsx(Button, __assign({ type: "submit" }, { children: "Sign in" }), void 0), _jsx(Link, __assign({ className: "registration-form__link", to: '/registration' }, { children: "Create acount?" }), void 0)] }), void 0));
};
// const mapDispatchToProps = {
//   checkUsername
// }
export default connect()(LoginForm);
