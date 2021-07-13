import { combineReducers } from 'redux';
import meReducer from './me';
import usersReducer from './users';
import sessionReducer from './session';
import settingsReducer from './settings';
import buildReducer from './buildReducer';
import historyReducer from './history';
import appReducer from './app';
import channelReducer from './channels';
import dmsReducer from './direct-messages';

const reducers = combineReducers({
  auth: sessionReducer,
  me: meReducer,
  settings: settingsReducer,
  history: historyReducer,
  build: buildReducer,
  app: appReducer,
  channels: channelReducer,
  dms: dmsReducer,
  users: usersReducer
});

export type RootState = ReturnType<typeof reducers>;

const rootReducer = reducers;
export default rootReducer;
