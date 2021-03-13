import { combineReducers } from 'redux';
import meReducer from './me';
import sessionReducer from './session';
import settingsReducer from './settings';
import buildReducer from './build';
import historyReducer from './history';

const reducers = combineReducers({
  auth: sessionReducer,
  me: meReducer,
  settings: settingsReducer,
  history: historyReducer,
  config: buildReducer
});

export type RootState = ReturnType<typeof reducers>;

const rootReducer = reducers;

export default rootReducer;
