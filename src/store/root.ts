import { combineReducers } from 'redux';
import meReducer from './me';
import sessionReducer from './session';
import settingsReducer from './settings';
import buildReducer from './buildReducer';
import historyReducer from './history';
import appReducer from './app';
import channelReducer from './channels';

const reducers = combineReducers({
  auth: sessionReducer,
  me: meReducer,
  settings: settingsReducer,
  history: historyReducer,
  build: buildReducer,
  app: appReducer,
  channels: channelReducer
});

export type RootState = ReturnType<typeof reducers>;

const rootReducer = reducers;
export default rootReducer;
