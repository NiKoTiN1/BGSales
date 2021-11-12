import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
