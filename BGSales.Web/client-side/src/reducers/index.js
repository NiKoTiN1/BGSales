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
import { ActionType } from '../interfaces/ActionType';
var initialState = {
    checkUser: false
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionType.ADD_CHECK:
            return __assign(__assign({}, state), { checkUser: action.payload });
        default:
            return state;
    }
};
export default reducer;
