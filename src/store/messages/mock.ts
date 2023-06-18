import { MessagesState, MessageStatus, MessageTypes } from './types';

export const messagesMock: MessagesState = {
  list: {
    '1914477c-e595-43d3-b0f5-78e9625a4ba6': {
      uuid: '1914477c-e595-43d3-b0f5-78e9625a4ba6',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'bob',
      parentId: 'bob',
      timeReceived: Date.now() - 10000,
      timeSent: Date.now() - 10000,
      body: 'Hello',
      mentions: [],
      attachments: [],
      read: true
    },
    '2d9ae79a-a3c1-4756-afdc-f6fa9f7956b2': {
      uuid: '2d9ae79a-a3c1-4756-afdc-f6fa9f7956b2',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'bob',
      parentId: 'bob',
      timeReceived: Date.now() - 9000,
      timeSent: Date.now() - 9000,
      body: 'Lorem ipsum sil dolor a met',
      mentions: [],
      attachments: [ '81df5623-4fa2-423d-a109-4930e7fde301' ],
      read: true
    },
    '653440af-60fc-4ebb-88a5-67f98d209691': {
      uuid: '653440af-60fc-4ebb-88a5-67f98d209691',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'bob',
      parentId: 'bob',
      timeReceived: Date.now() - 8000,
      timeSent: Date.now() - 8000,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      mentions: [ 'bop' ],
      attachments: [],
      read: true
    },
    'a30d2e71-7115-4e4a-b82a-58e2332c78e0': {
      uuid: 'a30d2e71-7115-4e4a-b82a-58e2332c78e0',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'bob',
      parentId: 'bob',
      timeReceived: Date.now() - 3670,
      timeSent: Date.now() - 3670,
      body: 'nostrud',
      mentions: [],
      attachments: [],
      read: true
    },
    '1234-7115-4e4a-b82a-58e2332c78e0': {
      uuid: '1234-7115-4e4a-b82a-58e2332c78e0',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'bob',
      parentId: 'bob',
      timeReceived: Date.now() - 3670,
      timeSent: Date.now() - 3670,
      body: '❤️',
      mentions: [],
      attachments: [],
      read: true
    },
    '12345-7115-4e4a-b82a-58e2332c78e0': {
      uuid: '12345-7115-4e4a-b82a-58e2332c78e0',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'bob',
      parentId: 'bob',
      timeReceived: Date.now() - 103670,
      timeSent: Date.now() - 103670,
      body: 'Ac turpis egestas sed tempus. Mattis rhoncus urna neque viverra justo. Tempus iaculis urna id volutpat lacus. Ac auctor augue mauris augue neque gravida. Duis ut diam quam nulla porttitor massa id neque.',
      mentions: [],
      attachments: [],
      read: true
    },
    '123456-7115-4e4a-b82a-58e2332c78e0': {
      uuid: '123456-7115-4e4a-b82a-58e2332c78e0',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'Maciej',
      parentId: 'bob',
      timeReceived: Date.now() - 367000,
      timeSent: Date.now() - 367000,
      body: 'Sed nisi lacus sed viverra tellus in hac habitasse',
      mentions: [],
      attachments: [],
      read: true
    },
    '258f4703-52f8-49e1-bd39-23e9d9a0b345': {
      uuid: '258f4703-52f8-49e1-bd39-23e9d9a0b345',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'matt',
      parentId: 'matt',
      timeReceived: Date.now() - 3670,
      timeSent: Date.now() - 3670,
      body: 'Look at this meme',
      mentions: [],
      attachments: [ 'a925630e-bab7-4f01-8804-f087e3dd341e' ],
      read: true
    },
    '88832d5c-d6ed-4d54-9e1a-94e3db235f57': {
      uuid: '88832d5c-d6ed-4d54-9e1a-94e3db235f57',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'matt',
      parentId: 'matt',
      timeReceived: Date.now(),
      timeSent: Date.now(),
      body: 'lol',
      mentions: [],
      attachments: [],
      read: false
    },
    '2e341b65-656a-4fb4-b616-9d2c0ba1499c': {
      uuid: '2e341b65-656a-4fb4-b616-9d2c0ba1499c',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'paczka',
      parentId: 'paczka',
      timeReceived: Date.now() - 2000000,
      timeSent: Date.now() - 2000000,
      body: 'get oooout',
      mentions: [],
      attachments: [],
      read: true
    },
    '57499627-432a-4302-9163-1a3001c5798e': {
      uuid: '57499627-432a-4302-9163-1a3001c5798e',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'paczka',
      parentId: 'paczka',
      timeReceived: Date.now() - 12360000,
      timeSent: Date.now() - 12360000,
      body: 'testing',
      mentions: [],
      attachments: [],
      read: true
    },
    '258f4703-52f8-49e1-bd39-23e9d9a0b888': {
      uuid: '258f4703-52f8-49e1-bd39-23e9d9a0b888',
      type: MessageTypes.DIRECT,
      status: MessageStatus.DELIVERED,
      senderId: 'Maciej',
      parentId: 'bob',
      timeReceived: Date.now() - 123000,
      timeSent: Date.now() - 123000,
      body: 'Dictum varius duis at consectetur',
      mentions: [],
      attachments: [],
      read: true
    }
  },
  attachments: {
    '81df5623-4fa2-423d-a109-4930e7fde301': {
      uuid: '81df5623-4fa2-423d-a109-4930e7fde301',
      name: 'neony.jpeg',
      uri: 'https://static.suchanecki.me/neony.jpeg',
      size: 7617452,
      mimeType: 'image/jpeg',
      width: 6000,
      height: 3376
    },
    'a925630e-bab7-4f01-8804-f087e3dd341e': {
      uuid: 'a925630e-bab7-4f01-8804-f087e3dd341e',
      name: 'avatar.png',
      uri: 'https://static.suchanecki.me/avatar.png',
      size: 194018,
      mimeType: 'image/png',
      width: 787,
      height: 784
    }
  }
};
