import type { ChatApiPagination, ChatApiResponse } from '../../types';

export interface ChatApiSettingsMuted {
  users?: ChatApiPagination<string>;
  channels?: ChatApiPagination<string>;
}

export interface ChatApiSettings {
  mutedUsers?: string[];
  chats: {
    channel: string;
    muted: boolean;
    color: string | null;
  }[];
}

export type ChatApiSettingsResponse = ChatApiResponse<ChatApiSettings>;
