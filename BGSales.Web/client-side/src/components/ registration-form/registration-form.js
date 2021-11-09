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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './registration-form.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postData } from '../../actions';
function RegistrationForm(_a) {
    var _this = this;
    var dispatch = _a.dispatch, history = _a.history;
    var _b = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        role: true,
    }), form = _b[0], setForm = _b[1];
    var _c = useState(false), errorChecked = _c[0], setErrorChecked = _c[1];
    var submitForm = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var newUser;
        return __generator(this, function (_a) {
            e.preventDefault();
            if (form.password !== form.rePassword) {
                setErrorChecked(true);
            }
            else {
                setErrorChecked(false);
                newUser = {
                    FirstName: form.firstName,
                    LastName: form.lastName,
                    UserType: form.role ? 'Businessman' : 'Blogger',
                    Email: form.email,
                    Password: form.password,
                };
                dispatch(postData(newUser));
                history.push('/');
            }
            return [2 /*return*/];
        });
    }); };
    return (_jsxs("form", __assign({ className: "registration-form", onSubmit: submitForm }, { children: [_jsx("h2", __assign({ className: "registration-form__heading" }, { children: "Sign up" }), void 0), _jsxs("div", { children: [_jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "FirstName", type: "firstName", name: "firstName", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { firstName: e.target.value })); } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "LastName", type: "lastName", name: "lastName", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { lastName: e.target.value })); } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "Email", type: 'email', name: 'email', variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { email: e.target.value })); } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "Password", type: "password", name: "password", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { password: e.target.value })); } }, void 0) }), void 0), _jsx("div", __assign({ className: "registration-form__blok" }, { children: _jsx(TextField, { label: "Password", error: errorChecked, type: "password", name: "password", variant: "outlined", onChange: function (e) { return setForm(__assign(__assign({}, form), { rePassword: e.target.value })); } }, void 0) }), void 0), _jsxs("div", __assign({ className: "registration-form__checkbox" }, { children: [_jsx("input", { type: "checkbox", checked: form.role, onChange: function () { return setForm(__assign(__assign({}, form), { role: true })); } }, void 0), _jsx("label", { children: "advertiser" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "registration-form__checkbox" }, { children: [_jsx("input", { type: "checkbox", checked: !form.role, onChange: function () { return setForm(__assign(__assign({}, form), { role: false })); } }, void 0), _jsx("label", { children: "media person" }, void 0)] }), void 0), _jsxs("div", __assign({ className: "registration-form__button" }, { children: [_jsx(Button, __assign({ type: "submit", variant: "contained" }, { children: "Sign up" }), void 0), _jsx(Link, __assign({ className: "registration-form__button_signin", to: '/authorization' }, { children: _jsx(Button, __assign({ variant: "outlined" }, { children: "Sign in" }), void 0) }), void 0)] }), void 0)] }, void 0)] }), void 0));
}
export default connect()(RegistrationForm);
