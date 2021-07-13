import { NeutrinoApiMeAvatar } from '../me/avatar/types';
import type { NeutrinoApiPagination, NeutrinoApiResponse } from '../types';

export type NeutrinoApiChannelId = string;

export interface NeutrinoApiChannelSettings {
  password: boolean;
  public: boolean;
}

export interface NeutrinoApiChannel {
  id: NeutrinoApiChannelId;
  name: string;
  description: string;
  avatar: NeutrinoApiMeAvatar;
  created: number;
  createdBy: string;
  settings: NeutrinoApiChannelSettings;
}

export type NeutrinoApiChannelCreateObj = Omit<NeutrinoApiChannel, 'id' | 'created' | 'createdBy'>;

export interface NeutrinoApiChannels {
  channels: NeutrinoApiPagination<NeutrinoApiChannel>;
}

export type NeutrinoApiChannelsResponse = NeutrinoApiResponse<NeutrinoApiChannels>;
