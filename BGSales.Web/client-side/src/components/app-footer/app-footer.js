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
import './app-footer.scss';
var AppFooter = function () {
    return (_jsx("div", __assign({ className: "footer" }, { children: _jsx("label", __assign({ className: "footer__label" }, { children: "\u00A9 Gatskevich Rodion, Biletsky Nikita" }), void 0) }), void 0));
};
export default AppFooter;
