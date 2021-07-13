import type { NeutrinoApiPagination, NeutrinoApiResponse } from '../types';
import type { NeutrinoApiDeviceId } from '../devices/types';
import type { NeutrinoApiSettings } from './settings/types';
import type { NeutrinoApiMeAvatar } from './avatar/types';

export interface NeutrinoApiMeContact {
  username: string;
  added: number; // timestamp
}

export type NeutrinoApiMeContacts = NeutrinoApiPagination<NeutrinoApiMeContact>;

export type NeutrinoApiMeDevices = NeutrinoApiPagination<NeutrinoApiDeviceId>;

export interface NeutrinoApiMe {
  me: {
    username: string;
    scope?: string;
    avatar?: NeutrinoApiMeAvatar;
    contacts?: NeutrinoApiMeContacts;
    devices?: NeutrinoApiMeDevices;
    settings?: NeutrinoApiSettings;
  }
}

export type NeutrinoApiMeResponse = NeutrinoApiResponse<NeutrinoApiMe>;
