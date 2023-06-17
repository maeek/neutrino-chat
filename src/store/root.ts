import { combineReducers } from 'redux';
import meReducer, { MeState } from './me';
import usersReducer from './users';
import sessionReducer from './session';
import settingsReducer from './settings';
import buildReducer from './buildReducer';
import historyReducer from './history';
import appReducer from './app';
import messagesReducer from './messages';
import channelReducer from './channels';

const reducers = combineReducers({
  auth: sessionReducer,
  me: meReducer,
  settings: settingsReducer,
  history: historyReducer,
  build: buildReducer,
  app: appReducer,
  channels: channelReducer, // To be delivered later
  users: usersReducer,
  messages: messagesReducer
});

export type RootState = ReturnType<typeof reducers> & { me: MeState };

const rootReducer = reducers;
export default rootReducer;
