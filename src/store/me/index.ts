import { combineReducers } from 'redux';
import contactsReducer from './contacts';
import devicesReducer from './devices';
import groupsReducer from './groups';
import userReducer from './user';

const meReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  devices: devicesReducer,
  user: userReducer
});

export type MeState = ReturnType<typeof meReducer>;

export default meReducer;
