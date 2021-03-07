import type { NeutrinoApiPagination, NeutrinoApiResponse } from '../../types';

export interface NeutrinoApiSettingsMuted {
  users?: NeutrinoApiPagination<string>;
  channels?: NeutrinoApiPagination<string>;
}

export interface NeutrinoApiSettingsNotifications {
  muted?: NeutrinoApiSettingsMuted;
  push?: boolean;
  message?: boolean;
  mentions?: boolean;
  joins?: boolean;
}

export interface NeutrinoApiSettings {
  notifications?: NeutrinoApiSettingsNotifications;
}

export type NeutrinoApiSettingsResponse = NeutrinoApiResponse<NeutrinoApiSettings>;
