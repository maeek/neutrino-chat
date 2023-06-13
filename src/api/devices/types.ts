import type { ChatApiPagination, ChatApiResponse } from '../types';

export type ChatApiDeviceId = string;

export interface ChatApiDevicePlatform {
  ip: string;
  os: string;
  browser: string;
  version: string;
}

export interface ChatApiDevice {
  id: ChatApiDeviceId;
  created: number;
  username: string;
  platform: ChatApiDevicePlatform;
}

export interface ChatApiDevices {
  devices: ChatApiPagination<ChatApiDevice>;
}

export type ChatApiDevicesResponse = ChatApiResponse<ChatApiDevices>;
