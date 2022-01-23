import { RootState } from '@/store/root';
import { NotificationsSettingsState } from '@/store/settings/notifications/types';
import { createSelector } from 'reselect';

export const getNotificationsSettings = (state: RootState) => state.settings.notifications;

export const getNotificationsSettingsByKey = (key: keyof NotificationsSettingsState) => createSelector(
  getNotificationsSettings,
  (settings) => settings[ key ]
);

export const mentionsNotificationsSettings = (state: RootState) => state.settings.notifications.mentions;

export const joinedNotificationsSettings = (state: RootState) => state.settings.notifications.joined;

export const leftNotificationsSettings = (state: RootState) => state.settings.notifications.left;

export const chatsNotificationsSettings = (state: RootState) => state.settings.notifications.chats;

export const groupChatsNotificationsSettings = (state: RootState) => state.settings.notifications.groupChats;

export const groupInvitesNotificationsSettings = (state: RootState) => state.settings.notifications.groupInvites;
