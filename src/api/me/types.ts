import type { NeutrinoApiPagination, NeutrinoApiResponse } from '../types';
import type { NeutrinoApiDeviceId } from '../devices/types';
import type { NeutrinoApiSettings } from './settings/types';
import type { NeutrinoApiMeAvatar } from './avatar/types';

export type NeutrinoApiMeDevices = NeutrinoApiPagination<NeutrinoApiDeviceId>;

export interface NeutrinoApiMe {
  me: {
    username: string;
    scope?: string;
    avatar?: NeutrinoApiMeAvatar;
    devices?: NeutrinoApiMeDevices;
    settings?: NeutrinoApiSettings;
  }
}

export type NeutrinoApiMeResponse = NeutrinoApiResponse<NeutrinoApiMe>;
