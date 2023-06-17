import type { ChatApiSettings } from './settings/types';

export interface ChatApiMe {
  username: string;
  role?: string;
  description?: string;
  avatar?: string;
  sessions: string[];
  createdAt: number;
  supportedLoginTypes: string[];
  settings?: ChatApiSettings;
}

export type ChatApiMeResponse = ChatApiMe;
