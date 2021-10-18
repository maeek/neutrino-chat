import { combineReducers } from 'redux';
import filters from './filters';
import errors from './errors';
import ui from './ui';

export const appReducer = combineReducers({
  filters,
  errors,
  ui
});

export default appReducer;
