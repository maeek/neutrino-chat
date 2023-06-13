import { ChatApiMeAvatar } from '../me/avatar/types';
import type { ChatApiPagination, ChatApiResponse } from '../types';

export type ChatApiChannelId = string;

export interface ChatApiChannelSettings {
  password: boolean;
  public: boolean;
}

export interface ChatApiChannel {
  id: ChatApiChannelId;
  name: string;
  description: string;
  avatar: ChatApiMeAvatar;
  created: number;
  createdBy: string;
  settings: ChatApiChannelSettings;
}

export type ChatApiChannelCreateObj = Omit<
  ChatApiChannel,
  'id' | 'created' | 'createdBy'
>;

export interface ChatApiChannels {
  channels: ChatApiPagination<ChatApiChannel>;
}

export type ChatApiChannelsResponse = ChatApiResponse<ChatApiChannels>;
