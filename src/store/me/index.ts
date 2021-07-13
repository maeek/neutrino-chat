import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import getPersistConf from '../persist-config';
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

export default persistReducer<any, any>(getPersistConf('ne-me'), meReducer);
