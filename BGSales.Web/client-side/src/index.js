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
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
ReactDOM.render(_jsx(Provider, __assign({ store: store }, { children: _jsx(Router, { children: _jsx(App, {}, void 0) }, void 0) }), void 0), document.getElementById("root"));
