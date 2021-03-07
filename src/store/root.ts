import { combineReducers } from 'redux';
import meReducer from './me';
import sessionReducer from './session';
import settingsReducer from './settings';

const reducers = combineReducers({
  auth: sessionReducer,
  me: meReducer,
  settings: settingsReducer
});

export type RootState = ReturnType<typeof reducers>;

const rootReducer = reducers;

export default rootReducer;
