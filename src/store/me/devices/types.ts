/* eslint-disable no-unused-vars */
// import { DateTime } from "luxon";
import { GenericPayloadStructure } from '../../types';

export interface Device {
  // added: DateTime; // Maybe in the future
  // lastSeen?: DateTime | string;
  id: string;
  name: string;
  os?: string;
  platform: string;
  app: string;
  useragent: string;
}

export interface DeviceEntry {
  [key: string]: Device;
}

export type DevicesState = {
  entries: DeviceEntry;
}

export enum DevicesActionsEnum {
  ADD_DEVICE = 'ADD_DEVICE',
  REMOVE_DEVICE = 'REMOVE_DEVICE',
  CLEAR_DEVICES = 'CLEAR_DEVICES'
}

export interface AddDevicesAction extends GenericPayloadStructure {
  type: DevicesActionsEnum.ADD_DEVICE;
  data: {
    devices: Device[];
  }
}

export interface RemoveDevicesAction extends GenericPayloadStructure {
  type: DevicesActionsEnum.REMOVE_DEVICE;
  data: {
    devices: string[];
  }
}

export interface ClearDevicesAction extends GenericPayloadStructure {
  type: DevicesActionsEnum.CLEAR_DEVICES;
  data: {}
}

export type DevicesActionTypes = AddDevicesAction | RemoveDevicesAction | ClearDevicesAction;
