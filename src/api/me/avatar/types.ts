import { NeutrinoApiResponse } from '@/api/types';

export enum NeutrinoApiMeAvatarTypes {
  FILE = 'file',
  URI = 'uri'
}

export interface NeutrinoApiMeAvatar {
  uri: string;
  isLocal: boolean;
  type: NeutrinoApiMeAvatarTypes;
}

export interface NeutrinoApiMeAvatarTemp {
  uuid: string;
  uri: string;
  ttl: number;
  created: number;
}

export interface NeutrinoApiMeAvatarUpdateBody extends NeutrinoApiMeAvatar{
   file?: Blob | ArrayBuffer | string;
}

export type NeutrinoApiMeMeAvatarInfoResponse = NeutrinoApiResponse<NeutrinoApiMeAvatar>;
export type NeutrinoApiMeMeAvatarUploadResponse = NeutrinoApiResponse<NeutrinoApiMeAvatarTemp>;
