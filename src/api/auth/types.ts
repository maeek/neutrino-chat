import type { NeutrinoApiResponse } from '../types';

export enum NeutrinoApiAuthHeadersEnum {
  TOKEN = 'x-api-key',
  REFRESH_TOKEN = 'x-api-refreshtoken'
}
export interface NeutrinoApiAuthHeaders {
  [NeutrinoApiAuthHeadersEnum.TOKEN]: string;
  [NeutrinoApiAuthHeadersEnum.REFRESH_TOKEN]: string;
}

export interface NeutrinoApiAuth {
  username: string;
  token: string;
}

export type NeutrinoApiAuthResponse = NeutrinoApiResponse<NeutrinoApiAuth>;
