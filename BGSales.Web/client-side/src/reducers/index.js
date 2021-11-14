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
import { ActionType } from "../interfaces/ActionType";
import { imageSrc } from "../imageRequire";
var initialState = {
    currentUser: {
        role: "Blogger",
        profile: {
            imageUrl: imageSrc,
            firstName: "Rodion",
            secondName: "Gatskevich",
            ageAdvertising: "2",
            linkChannel: "https://vk.com/rgatskevich",
            ordersCompleted: 1,
            activity: "1",
            subjects: "1",
            numberSubscribers: 1,
            ageAudience: "1",
            nameCompany: "w",
            numberOffers: 1,
        },
        orders: [],
    },
    checkUser: false,
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionType.ADD_CHECK:
            return __assign(__assign({}, state), { checkUser: action.payload });
        case ActionType.CHANGE_PROFILE:
            return __assign(__assign({}, state), { currentUser: __assign(__assign({}, state.currentUser), { profile: action.payload }) });
        default:
            return state;
    }
};
export default reducer;
