import { v4 } from 'uuid';
import { UserFetchingStatus, UsersState, UserStatusEnum } from './types';

export const usersReducerMock: UsersState = {
  entries: {
    bob: {
      id: 'bob',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.ACTIVE,
      name: 'Bob Frank',
      avatar: 'https://static.suchanecki.me/avatar.png',
      blocked: false,
      nickname: 'bobo',
      settings: {},
      messages: [
        '1914477c-e595-43d3-b0f5-78e9625a4ba6',
        '2d9ae79a-a3c1-4756-afdc-f6fa9f7956b2',
        '653440af-60fc-4ebb-88a5-67f98d209691',
        'a30d2e71-7115-4e4a-b82a-58e2332c78e0'
      ],
      lastMessage: {
        id: '2d9ae79a-a3c1-4756-afdc-f6fa9f7956b2',
        content: '',
        receivedDate: Date.now() - 3670
      },
      typing: false
    },
    'rossalita-antonios-gonzalez-martinez-gaworia': {
      id: 'rossalita-antonios-gonzalez-martinez-gaworia',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.ACTIVE,
      name: 'Rossalita Antonios Gonzalez Martinez Gaworia',
      avatar: 'https://static.suchanecki.me/pepe1.jpg',
      banner: 'https://static.suchanecki.me/jupiter.jpg',
      blocked: false
    },
    andy: {
      id: 'andy',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.OFFLINE,
      name: 'Andy Bernard',
      avatar: '',
      blocked: false
    },
    bobandy: {
      id: 'bobandy',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.AWAY,
      name: 'bobandy',
      avatar: '',
      blocked: false
    },
    matt: {
      id: 'matt',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.OFFLINE,
      name: 'matt',
      avatar: '',
      blocked: false,
      nickname:
        'gaaaaaaaaaaaryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
      settings: {
        backgroundUri: 'https://static.suchanecki.me/neony.jpeg',
        backgroundOpacity: 0.3,
        backgroundBlur: 6,
        color: '#fff'
      },
      messages: [
        '258f4703-52f8-49e1-bd39-23e9d9a0b345',
        '88832d5c-d6ed-4d54-9e1a-94e3db235f57'
      ],
      lastMessage: {
        id: '88832d5c-d6ed-4d54-9e1a-94e3db235f57',
        content: 'lol',
        receivedDate: Date.now()
      },
      typing: false
    },
    j: {
      id: 'j',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.OFFLINE,
      name: 'j',
      avatar: 'https://static.suchanecki.me/nasa.jpg',
      blocked: true,
      nickname: 'jj abrams'
    },
    paczka: {
      id: 'paczka',
      fetchingStatus: UserFetchingStatus.SUCCESS,
      status: UserStatusEnum.AWAY,
      name: 'paczka',
      avatar: '',
      blocked: false,
      messages: [
        '2e341b65-656a-4fb4-b616-9d2c0ba1499c',
        '57499627-432a-4302-9163-1a3001c5798e'
      ],
      lastMessage: {
        id: '57499627-432a-4302-9163-1a3001c5798e',
        content: 'kapisz',
        receivedDate: Date.now() - 123600
      },
      typing: false
    },
    ...(Object.fromEntries(new Array(100).fill(null).map((_, i) => {
      const uid = v4();
      return [ `${uid}-${i+1}`, {
        id: `${uid}-${i+1}`,
        fetchingStatus: UserFetchingStatus.SUCCESS,
        status: UserStatusEnum.AWAY,
        name: `${uid}-${i+1}`,
        avatar: '',
        blocked: false,
        messages: [
          '2e341b65-656a-4fb4-b616-9d2c0ba1499c',
          '57499627-432a-4302-9163-1a3001c5798e'
        ],
        // lastMessage: {
        //   id: '57499627-432a-4302-9163-1a3001c5798e',
        //   content: v4(),
        //   receivedDate: Date.now() - 200000
        // },
        typing: false
      } ];
    })))
  }
};
