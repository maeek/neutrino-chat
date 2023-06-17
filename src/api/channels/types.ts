import type { ChatApiPagination, ChatApiResponse } from '../types';

export type ChatApiChannelId = string;

export interface ChatApiChannelSettings {
  password: boolean;
  public: boolean;
}

export interface ChatApiChannel {
  name: string;
  public?: boolean;
  users: string[];
  blockedUsers: string[];
  createdAt: number;
}

export type ChatApiChannelsResponse = {
  items: ChatApiChannel[];
  total: number;
};
