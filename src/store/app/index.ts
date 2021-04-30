import { combineReducers } from 'redux';
import filters from './filters';

export const appReducer = combineReducers({
  filters
});

export default appReducer;
