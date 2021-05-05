import devicesReducerMock from './mock';
import { Device, DeviceEntry, DevicesActionsEnum, DevicesActionTypes, DevicesState } from './types';

export const initialState: DevicesState = __DEV__ ? devicesReducerMock : {
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
  const newDevices: DeviceEntry = { ...state.entries };
  switch (action.type) {
  case DevicesActionsEnum.ADD_DEVICE:

    action.data.devices.forEach((dev: Device) => {
      newDevices[ dev.id ] = dev;
    });

    return {
      entries: newDevices
    };

  case DevicesActionsEnum.REMOVE_DEVICE:
    action.data.devices.forEach((did: string) => {
      delete newDevices[ did ];
    });

    return {
      entries: newDevices
    };

  case DevicesActionsEnum.CLEAR_DEVICES:
    return initialState;

  default:
    return state;
  }
};

export default devicesReducer;
export { addDevices, removeDevices, clearDevices } from './actions';
