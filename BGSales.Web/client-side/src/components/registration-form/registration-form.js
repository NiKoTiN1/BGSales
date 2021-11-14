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
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./registration-form.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postData } from "../../actions";
function RegistrationForm(_a) {
    var dispatch = _a.dispatch, history = _a.history;
    var _b = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
        role: true,
    }), form = _b[0], setForm = _b[1];
    var _c = useState(false), errorChecked = _c[0], setErrorChecked = _c[1];
    var submitForm = function (e) {
        e.preventDefault();
        if (form.password !== form.rePassword) {
            setErrorChecked(true);
        }
        else {
            setErrorChecked(false);
            var newUser = {
                FirstName: form.firstName,
                LastName: form.lastName,
                UserType: form.role ? "Businessman" : "Blogger",
                Email: form.email,
                Password: form.password,
            };
            dispatch(postData(newUser));
            history.push("/");
        }
    };
    return (_jsxs("form", __assign({ className: "registration-form", onSubmit: submitForm }, { children: [_jsx("h2", __assign({ className: "registration-form__heading" }, { children: "Sign up" }), void 0), _jsxs("div", { children: [_jsx("div", __assign({ className: "registration-form__field" }, { children: _jsx(TextField, { label: "FirstName", variant: "outlined", onChange: function (e) {
                                return setForm(__assign(__assign({}, form), { firstName: e.target.value }));
                            } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__field" }, { children: _jsx(TextField, { label: "LastName", variant: "outlined", onChange: function (e) {
                                return setForm(__assign(__assign({}, form), { lastName: e.target.value }));
                            } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__field" }, { children: _jsx(TextField, { label: "Email", type: "email", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { email: e.target.value })); } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__field" }, { children: _jsx(TextField, { label: "Password", type: "password", variant: "outlined", onChange: function (e) {
                                return setForm(__assign(__assign({}, form), { password: e.target.value }));
                            } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__field" }, { children: _jsx(TextField, { label: "Password", error: errorChecked, type: "password", variant: "outlined", onChange: function (e) {
                                return setForm(__assign(__assign({}, form), { rePassword: e.target.value }));
                            } }, void 0) }), void 0), _jsxs("div", __assign({ className: "registration-form__checkbox" }, { children: [_jsx("input", { type: "checkbox", checked: form.role, onChange: function () { return setForm(__assign(__assign({}, form), { role: true })); } }, void 0), _jsx("label", { children: "advertiser" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "registration-form__checkbox" }, { children: [_jsx("input", { type: "checkbox", checked: !form.role, onChange: function () { return setForm(__assign(__assign({}, form), { role: false })); } }, void 0), _jsx("label", { children: "media person" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "registration-form__button" }, { children: [_jsx(Button, __assign({ type: "submit", variant: "contained" }, { children: "Sign up" }), void 0), _jsx(Link, __assign({ className: "registration-form__button_signin", to: "/authorization" }, { children: _jsx(Button, __assign({ variant: "outlined" }, { children: "Sign in" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0));
}
export default connect()(RegistrationForm);
