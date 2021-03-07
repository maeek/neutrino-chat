import { Device, DeviceEntry, DevicesActionsEnum, DevicesActionTypes, DevicesState } from './types';

export const initialState: DevicesState = {
  entries: {
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
      entries: {
        ...state.entries,
        ...newDevices
      }
    };

  case DevicesActionsEnum.REMOVE_DEVICE:
    const updatedDevices = {...state.entries};

    action.data.devices.forEach((did: string) => {
      delete updatedDevices[did];
    });

    return {
      entries: updatedDevices
    };

  case DevicesActionsEnum.CLEAR_DEVICES:
    return initialState;

  default:
    return state;
  }
};

export default devicesReducer;
export { addDevices, removeDevices, clearDevices } from './actions';
