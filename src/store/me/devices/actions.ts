import { AddDevicesAction, ClearDevicesAction, Device, DevicesActionsEnum, RemoveDevicesAction } from './types';

export const addDevices = (devices: Device[]): AddDevicesAction => ({
  type: DevicesActionsEnum.ADD_DEVICE,
  data: {
    devices
  }
});

export const removeDevices = (devices: string[]): RemoveDevicesAction => ({
  type: DevicesActionsEnum.REMOVE_DEVICE,
  data: {
    devices
  }
});

export const clearDevices = (): ClearDevicesAction => ({
  type: DevicesActionsEnum.CLEAR_DEVICES,
  data: {}
});
