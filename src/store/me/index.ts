import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import getPersistConf from '../persist-config';
import userReducer from './user';
import { UserActionTypes } from './user/types';

const meReducer = combineReducers({
  user: userReducer
});

export type MeState = ReturnType<typeof meReducer>;

export default persistReducer<MeState, UserActionTypes>(
  getPersistConf('ne-me'),
  meReducer
);
