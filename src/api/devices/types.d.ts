import type { NeutrinoApiPagination, NeutrinoApiResponse } from '../types';

export type NeutrinoApiDeviceId = string;

export interface NeutrinoApiDevicePlatform {
  ip: string;
  os: string;
  browser: string;
  version: string;
}

export interface NeutrinoApiDevice {
  id: NeutrinoApiDeviceId;
  created: number;
  username: string;
  platform: NeutrinoApiDevicePlatform;
}

export interface NeutrinoApiDevices {
  devices: NeutrinoApiPagination<NeutrinoApiDevice>;
}

export type NeutrinoApiDevicesResponse = NeutrinoApiResponse<NeutrinoApiDevices>;
