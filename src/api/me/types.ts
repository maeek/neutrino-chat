import type { ChatApiPagination, ChatApiResponse } from '../types';
import type { ChatApiDeviceId } from '../devices/types';
import type { ChatApiSettings } from './settings/types';
import type { ChatApiMeAvatar } from './avatar/types';

export type ChatApiMeDevices = ChatApiPagination<ChatApiDeviceId>;

export interface ChatApiMe {
  me: {
    username: string;
    scope?: string;
    avatar?: ChatApiMeAvatar;
    devices?: ChatApiMeDevices;
    settings?: ChatApiSettings;
  };
}

export type ChatApiMeResponse = ChatApiResponse<ChatApiMe>;
