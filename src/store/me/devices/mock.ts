import { DevicesState } from './types';

export const devicesReducerMock: DevicesState = {
  entries: {
    '#': {
      id: '#',
      name: 'This device',
      os: 'Linux x86_64',
      platform: 'Linux x86_64',
      app: 'Mozilla 5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
      useragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    },
    'd477ea45-c67f-4bfe-9937-491fb982cd78': {
      id: 'd477ea45-c67f-4bfe-9937-491fb982cd78',
      name: 'IPhone',
      os: 'Darwin',
      platform: 'Darwin',
      app: 'Chrome 89',
      useragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    },
    '99978243-0604-415f-bc1d-80311d890b4b': {
      id: '99978243-0604-415f-bc1d-80311d890b4b',
      name: 'Custom name',
      os: 'Windows',
      platform: 'Windows',
      app: 'Mozilla 68',
      useragent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
  }
};

export default devicesReducerMock;
