import { combineReducers } from "redux";
import profile from "./profile";
import order from "./order";
import chat from "./chat";

export const rootReducer = combineReducers({
  profile,
  order,
  chat,
});
