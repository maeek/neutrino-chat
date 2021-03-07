import { combineReducers } from 'redux';
import mutedReducer from './muted';

const settingsReducer = combineReducers({
  muted: mutedReducer
});

export type SettingsState = ReturnType<typeof settingsReducer>;

export default settingsReducer;
