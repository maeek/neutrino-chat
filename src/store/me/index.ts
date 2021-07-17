import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import getPersistConf from '../persist-config';
import devicesReducer from './devices';
import { DevicesActionTypes } from './devices/types';
import groupsReducer from './groups';
import { GroupsActionTypes } from './groups/types';
import userReducer from './user';
import { UserActionTypes } from './user/types';

const meReducer = combineReducers({
  groups: groupsReducer,
  devices: devicesReducer,
  user: userReducer
});

export type MeState = ReturnType<typeof meReducer>;

export default persistReducer<MeState, GroupsActionTypes | DevicesActionTypes | UserActionTypes>(
  getPersistConf('ne-me'),
  meReducer
);
