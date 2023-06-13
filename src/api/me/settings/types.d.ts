import type { ChatApiPagination, ChatApiResponse } from '../../types';

export interface ChatApiSettingsMuted {
  users?: ChatApiPagination<string>;
  channels?: ChatApiPagination<string>;
}

export interface ChatApiSettingsNotifications {
  muted?: ChatApiSettingsMuted;
  push?: boolean;
  message?: boolean;
  mentions?: boolean;
  joins?: boolean;
}

export interface ChatApiSettings {
  notifications?: ChatApiSettingsNotifications;
}

export type ChatApiSettingsResponse = ChatApiResponse<ChatApiSettings>;
