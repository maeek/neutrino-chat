import type { NeutrinoApiResponse } from '../types';

export interface NeutrinoApiAuthHeaders {
  ['x-api-token']: string;
  ['x-api-refreshtoken']: string;
}

export interface NeutrinoApiAuth {
  username: string;
  token: string;
}

export type NeutrinoApiAuthResponse = NeutrinoApiResponse<NeutrinoApiAuth>;
