import { DateTime } from 'luxon';
import { Device, DeviceEntry, DevicesActionsEnum, DevicesActionTypes, DevicesState } from './types';

export const initialState: DevicesState = {
  devices: {
    '#': {
      id: '#',
      name: 'This device',
      os: 'oscpu' in navigator ? (navigator as any).oscpu : navigator.platform,
      platform: navigator.platform,
      app: `${navigator.appCodeName} ${navigator.appVersion}`,
      useragent: navigator.userAgent
    }
  }
};

const devicesReducer = (state = initialState, action: DevicesActionTypes) => {
  switch (action.type) {
    case DevicesActionsEnum.ADD_DEVICE:
      const newDevices: DeviceEntry = {};

      action.data.devices.forEach((dev: Device) => {
        newDevices[dev.id] = dev;
      });

      return {
        devices: {
          ...state.devices,
          ...newDevices
        }
      };

    case DevicesActionsEnum.REMOVE_DEVICE:
      const updatedDevices = {...state.devices};

      action.data.devices.forEach((did: string) => {
        delete updatedDevices[did];
      });

      return {
        devices: updatedDevices
      }

    case DevicesActionsEnum.CLEAR_DEVICES:
      return initialState;

    default:
      return state;
  }
};

export default devicesReducer;
export { addDevices, removeDevices, clearDevices } from './actions';
