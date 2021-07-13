import { DmsState } from './types';
import {  } from '../me/contacts/mock';

export const dmsReducerMock: DmsState = {
  recent: [ 'bob', 'matt' ],
  joined: [],
  entries: {
    bob: {
      id: 'bob',
      nickname: 'bobo',
      settings: {},
      createdDate: Date.now(),
      messages: [
        '1914477c-e595-43d3-b0f5-78e9625a4ba6',
        '2d9ae79a-a3c1-4756-afdc-f6fa9f7956b2',
        '653440af-60fc-4ebb-88a5-67f98d209691',
        'a30d2e71-7115-4e4a-b82a-58e2332c78e0'
      ],
      lastMessage: {
        id: 'a30d2e71-7115-4e4a-b82a-58e2332c78e0',
        content: 'Yep see u 2mrw'
      },
      typing: false
    },
    matt: {
      id: 'matt',
      nickname: 'gary',
      settings: {
        backgroundUri: 'https://static.suchanecki.me/neony.jpeg',
        backgroundOpacity: 0.3,
        backgroundBlur: 6,
        color: '#fff',
        blocked: false
      },
      createdDate: Date.now() - 125000,
      messages: [
        '258f4703-52f8-49e1-bd39-23e9d9a0b345',
        '88832d5c-d6ed-4d54-9e1a-94e3db235f57'
      ],
      lastMessage: {
        id: '88832d5c-d6ed-4d54-9e1a-94e3db235f57',
        content: 'lol'
      },
      typing: false
    }
  }
};
