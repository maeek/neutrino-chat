import { NeutrinoApiAvatar } from '../me/avatar/types';
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
  avatar: NeutrinoApiAvatar;
  created: number;
  createdBy: string;
  settings: NeutrinoApiChannelSettings;
}

export interface NeutrinoApiChannels {
  channels: NeutrinoApiPagination<NeutrinoApiChannel>;
}

export type NeutrinoApiChannelsResponse = NeutrinoApiResponse<NeutrinoApiChannels>;
