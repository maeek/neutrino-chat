import { DateTime } from 'luxon';
import devicesReducer from '.';
import { addDevices, removeDevices, clearDevices } from './actions';
import { AddDevicesAction, ClearDevicesAction, Device, DevicesActionsEnum, DevicesActionTypes, DevicesState, RemoveDevicesAction } from './types';


const TIME_MOCK = '2021-01-30T18:05:38.652+01:00' as unknown as DateTime;

jest.mock('luxon', () => ({
  DateTime: {
    local: () => TIME_MOCK
  }
}));

describe('Redux store - Me/Devices', () => {
  describe('Actions', () => {
    it('should create an action to add devices', () => {
      const devices: Device[] = [
        {
          id: '1',
          name: 'dev-1',
          os: 'windows',
          platform: 'windows',
          app: 'Chrome 89',
          useragent: 'Jest'
        },
        {
          id: '2',
          name: 'dev-1',
          os: 'windows',
          platform: 'windows',
          app: 'Chrome 89',
          useragent: 'Jest'
        }
      ];
      const expectedAction = {
        type: DevicesActionsEnum.ADD_DEVICE,
        data: {
          devices
        }
      };
      expect(addDevices(devices)).toEqual(expectedAction);
    });

    it('should create an action to remove devices', () => {
      const devices = [
        '1',
        '2'
      ];
      const expectedAction = {
        type: DevicesActionsEnum.REMOVE_DEVICE,
        data: {
          devices
        }
      };
      expect(removeDevices(devices)).toEqual(expectedAction);
    });

    it('should create an action to clear devices', () => {
      const expectedAction = {
        type: DevicesActionsEnum.CLEAR_DEVICES,
        data: {}
      };
      expect(clearDevices()).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    const initDevices = {
      '#': {
        id: '#',
        name: 'This device',
        os: '',
        platform: '',
        app: 'Mozilla 4.0',
        useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
      }
    };
    const initState: DevicesState = { devices: initDevices };

    it('should initialize default state', () => {
      expect(
        devicesReducer(undefined, {} as DevicesActionTypes)
      ).toEqual({
        devices: initDevices
      })
    });

    it('should handle ADD_DEVICE', () => {
      const devices = [
        {
          id: '1',
          name: 'device#1',
          os: '',
          platform: '',
          app: 'Mozilla 4.0',
          useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
        },
        {
          id: '2',
          name: 'device#2',
          os: '',
          platform: '',
          app: 'Mozilla 4.0',
          useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
        }
      ];
      const addAction: AddDevicesAction = {
        type: DevicesActionsEnum.ADD_DEVICE,
        data: {
          devices
        }
      }

      expect(
        devicesReducer(initState, addAction)
      ).toEqual({
        devices: {
          ...initDevices,
          [devices[0].id]: devices[0],
          [devices[1].id]: devices[1]
        }
      })
    });

    it('should handle REMOVE_DEVICE', () => {
      const initState: DevicesState = {
        devices: {
          ...initDevices,
          '1': {
            id: '1',
            name: 'device#1',
            os: '',
            platform: '',
            app: 'Mozilla 4.0',
            useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
          },
          '2': {
            id: '2',
            name: 'device#2',
            os: '',
            platform: '',
            app: 'Mozilla 4.0',
            useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
          }
        }
      };

      const devices = ['1', '2'];

      const removeAction: RemoveDevicesAction = {
        type: DevicesActionsEnum.REMOVE_DEVICE,
        data: {
          devices
        }
      }

      expect(
        devicesReducer(initState, removeAction)
      ).toEqual({
        devices: { ...initDevices }
      })
    });

    it('should handle CLEAR_DEVICES', () => {
      const clearAction: ClearDevicesAction = {
        type: DevicesActionsEnum.CLEAR_DEVICES,
        data: {}
      }
      const initialState: DevicesState = {
        devices: {
          ...initDevices,
          '1': {
            id: '1',
            name: 'device#1',
            os: '',
            platform: '',
            app: 'Mozilla 4.0',
            useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
          },
          '2': {
            id: '2',
            name: 'device#2',
            os: '',
            platform: '',
            app: 'Mozilla 4.0',
            useragent: 'Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.4.0'
          }
        }
      };
      expect(
        devicesReducer(initialState, clearAction)
      ).toEqual({
        devices: { ...initDevices }
      })
    });
    
  });
});
