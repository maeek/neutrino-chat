import { combineReducers } from 'redux';
import contactsReducer from './contacts';
import devicesReducer from './devices';
import groupsReducer from './groups';

const meReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  devices: devicesReducer
});

export type MeState = ReturnType<typeof meReducer>;

export default meReducer;
