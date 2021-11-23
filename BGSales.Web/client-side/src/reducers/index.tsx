import { combineReducers } from 'redux';
import profile from './profile';
import order from './order';

export const rootReducer = combineReducers({
  profile,
  order,
});