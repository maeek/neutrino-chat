import type { ChatApiResponse } from '../types';

export enum ChatApiAuthHeadersEnum {
  TOKEN = 'x-api-token'
}
export interface ChatApiAuthHeaders {
  [ChatApiAuthHeadersEnum.TOKEN]: string;
}

export interface ChatApiAuth {
  username: string;
  role: string;
  avatar?: string;
  description?: string;
  sessions: string[];
  settings?: {
    mutedUsers: string[];
    chats: {
      channel: string;
      muted: boolean;
    }[];
  };
}

export type ChatApiAuthResponse = { me: ChatApiAuth };
