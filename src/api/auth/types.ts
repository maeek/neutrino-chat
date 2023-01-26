import type { NeutrinoApiResponse } from '../types';

export enum NeutrinoApiAuthHeadersEnum {
  TOKEN = 'x-ne-key',
  REFRESH_TOKEN = 'x-ne-refreshtoken'
}
export interface NeutrinoApiAuthHeaders {
  [NeutrinoApiAuthHeadersEnum.TOKEN]: string;
  [NeutrinoApiAuthHeadersEnum.REFRESH_TOKEN]: string;
}

export interface NeutrinoApiAuth {
  user: {
    username: string;
    type: string;
  };
  device: {
    deviceId: string;
  };
  accessToken: string;
}

export type NeutrinoApiAuthResponse = NeutrinoApiResponse<NeutrinoApiAuth>;
