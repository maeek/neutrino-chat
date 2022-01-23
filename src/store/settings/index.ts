import { combineReducers } from 'redux';
import mutedReducer from './muted';
import notificationsSettingsReducer from './notifications';

const settingsReducer = combineReducers({
  muted: mutedReducer,
  notifications: notificationsSettingsReducer
});

export type SettingsState = ReturnType<typeof settingsReducer>;

export default settingsReducer;
