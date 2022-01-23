import { ActionCreator } from 'redux';
import {
  NotificationsSettingsActionEnum,
  NotificationsSettingsState,
  SetNotfAction,
  Notification
} from './types';

export const setNotifications: ActionCreator<SetNotfAction> = (
  type: keyof NotificationsSettingsState,
  notification: Partial<Notification>
) => ({
  type: NotificationsSettingsActionEnum.SET_NOTF_SETTING,
  data: {
    [ type ]: notification
  }
});
