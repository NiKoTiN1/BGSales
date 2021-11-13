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
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { imageSrc } from "../../imageRequire";
import { changeProfile } from "../../actions";
import "./advertiser-person-profile-edit.scss";
var AdvertiserPersonProfileEdit = function (_a) {
    var dispatch = _a.dispatch, currentUser = _a.currentUser, history = _a.history;
    var _b = useState({
        imageUrl: currentUser.profile.imageUrl,
        firstName: currentUser.profile.firstName,
        secondName: currentUser.profile.secondName,
        ageAdvertising: currentUser.profile.ageAdvertising,
        linkChannel: currentUser.profile.linkChannel,
        ordersCompleted: "" + currentUser.profile.ordersCompleted,
        activity: currentUser.profile.activity,
        subjects: currentUser.profile.subjects,
        numberSubscribers: "" + currentUser.profile.numberSubscribers,
        ageAudience: currentUser.profile.ageAudience,
        nameCompany: currentUser.profile.nameCompany,
        numberOffers: "" + currentUser.profile.numberOffers,
    }), form = _b[0], setForm = _b[1];
    var submitForm = function (e) {
        e.preventDefault();
        var errorFlag = false;
        for (var item in form) {
            if (form[item] === "") {
                errorFlag = true;
            }
        }
        if (!Number(form["numberOffers"])) {
            errorFlag = true;
        }
        var userProfile = {
            imageUrl: form.imageUrl,
            firstName: String(form.firstName),
            secondName: String(form.secondName),
            ageAdvertising: String(form.ageAdvertising),
            linkChannel: String(form.linkChannel),
            ordersCompleted: Number(form.ordersCompleted),
            activity: String(form.activity),
            subjects: String(form.subjects),
            numberSubscribers: Number(form.numberSubscribers),
            ageAudience: String(form.ageAudience),
            nameCompany: String(form.nameCompany),
            numberOffers: Number(form.numberOffers),
        };
        if (!errorFlag) {
            dispatch(changeProfile(userProfile));
            history.push("/profileAdvertiser");
        }
    };
    var imageChange = function (e) {
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.onloadend = function () {
            setForm(__assign(__assign({}, form), { imageUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };
    return (_jsx(_Fragment, { children: _jsxs("form", __assign({ onSubmit: submitForm }, { children: [_jsxs("div", __assign({ className: "media-profile-form" }, { children: [_jsxs("div", __assign({ className: "media-profile-form__file" }, { children: [_jsx("img", { className: "media-profile-form__file__img", src: form.imageUrl ? form.imageUrl : imageSrc, alt: "" }, void 0), _jsx("input", { className: "media-profile-form__file__input", type: "file", onChange: function (e) { return imageChange(e); } }, void 0)] }), void 0), _jsxs("div", __assign({ className: "media-profile-form__col-1" }, { children: [_jsx("h2", { children: "Personal information" }, void 0), _jsx("div", { children: _jsx(TextField, { label: "First name", defaultValue: form.firstName, variant: "outlined", error: form.firstName === "", onChange: function (e) {
                                            return setForm(__assign(__assign({}, form), { firstName: e.target.value }));
                                        } }, void 0) }, void 0), _jsx("div", __assign({ className: "container" }, { children: _jsx(TextField, { label: "Second name", defaultValue: form.secondName, variant: "outlined", error: form.secondName === "", onChange: function (e) {
                                            return setForm(__assign(__assign({}, form), { secondName: e.target.value }));
                                        } }, void 0) }), void 0), _jsx("div", __assign({ className: "container" }, { children: _jsx(TextField, { label: "Name Company", defaultValue: form.nameCompany, variant: "outlined", error: form.nameCompany === "", onChange: function (e) {
                                            return setForm(__assign(__assign({}, form), { nameCompany: e.target.value }));
                                        } }, void 0) }), void 0), _jsx("div", __assign({ className: "container" }, { children: _jsx(TextField, { label: "Number Offers", defaultValue: form.numberOffers, error: form.numberOffers === "" || !Number(form.numberOffers), variant: "outlined", onChange: function (e) {
                                            return setForm(__assign(__assign({}, form), { numberOffers: e.target.value }));
                                        } }, void 0) }), void 0)] }), void 0)] }), void 0), _jsx(Button, __assign({ className: "button-save", type: "submit", variant: "contained" }, { children: "Apply changes" }), void 0)] }), void 0) }, void 0));
};
var mapStateToProps = function (state) {
    return {
        currentUser: state.reducer.currentUser,
    };
};
export default connect(mapStateToProps)(AdvertiserPersonProfileEdit);
