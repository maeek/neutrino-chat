import { combineReducers } from 'redux';
import filters from './filters';
import errors from './errors';

export const appReducer = combineReducers({
  filters,
  errors
});

export default appReducer;
