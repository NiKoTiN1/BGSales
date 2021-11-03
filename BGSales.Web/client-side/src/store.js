import { createStore, combineReducers } from 'redux';
import reducer from './reducers';
var rootReducer = combineReducers({
    reducer: reducer
});
var store = createStore(rootReducer);
export default store;
