import { ChatApiResponse } from '@/api/types';

export enum ChatApiMeAvatarTypes {
  FILE = 'file',
  URI = 'uri'
}

export interface ChatApiMeAvatar {
  uri: string;
  isLocal: boolean;
  type: ChatApiMeAvatarTypes;
}

export interface ChatApiMeAvatarTemp {
  uuid: string;
  uri: string;
  ttl: number;
  created: number;
}

export interface ChatApiMeAvatarUpdateBody extends ChatApiMeAvatar {
  file?: Blob | ArrayBuffer | string;
}

export type ChatApiMeMeAvatarInfoResponse = ChatApiResponse<ChatApiMeAvatar>;
export type ChatApiMeMeAvatarUploadResponse =
  ChatApiResponse<ChatApiMeAvatarTemp>;
