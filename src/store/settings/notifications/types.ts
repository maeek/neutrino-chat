import { Action } from 'redux';

export interface Notification {
  enabled?: boolean;
  vibrations?: boolean;
  sound?: boolean;
}

export interface NotificationsSettingsState {
  mentions: Notification;
  joined: Notification;
  left: Notification;
  chats: Notification;
  groupInvites: Notification;
}

export enum NotificationsSettingsActionEnum {
  SET_NOTF_SETTING = 'SET_NOTF_SETTING'
}

export type SetNotfActionPayload = {
  [type in keyof NotificationsSettingsState]?: Notification;
};
export interface SetNotfAction
  extends Action<NotificationsSettingsActionEnum.SET_NOTF_SETTING> {
  data: SetNotfActionPayload;
}

export type NotificationsSettingsAction = SetNotfAction;
