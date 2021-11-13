import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
var rootReducer = combineReducers({
    reducer: reducer,
});
var store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
