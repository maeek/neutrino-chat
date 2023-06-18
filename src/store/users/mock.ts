import { v4 } from 'uuid';
import { UsersState } from './types';

export const usersReducerMock: UsersState = {
  entries: {
    bob: {
      id: 'bob',
      avatar: '',
      muted: false,
      messages: [
        '1914477c-e595-43d3-b0f5-78e9625a4ba6',
        '2d9ae79a-a3c1-4756-afdc-f6fa9f7956b2',
        '653440af-60fc-4ebb-88a5-67f98d209691',
        'a30d2e71-7115-4e4a-b82a-58e2332c78e0',
        '258f4703-52f8-49e1-bd39-23e9d9a0b888',
        '1234-7115-4e4a-b82a-58e2332c78e0',
        '12345-7115-4e4a-b82a-58e2332c78e0',
        '123456-7115-4e4a-b82a-58e2332c78e0',
        '258f4703-52f8-49e1-bd39-23e9d9a0b888'
      ],
      lastMessage: {
        id: '258f4703-52f8-49e1-bd39-23e9d9a0b888',
        content: 'Dictum varius duis at consectetur',
        receivedDate: Date.now() - 3670
      }
    },
    test_user: {
      id: 'test_user',
      avatar: 'https://static.suchanecki.me/pepe1.jpg',
      muted: false
    },
    andy: {
      id: 'andy',
      avatar: '',
      muted: false
    },
    bobandy: {
      id: 'bobandy',
      avatar: '',
      muted: false
    },
    matt: {
      id: 'matt',
      avatar: '',
      muted: false,
      messages: [
        '258f4703-52f8-49e1-bd39-23e9d9a0b345',
        '88832d5c-d6ed-4d54-9e1a-94e3db235f57'
      ],
      lastMessage: {
        id: '88832d5c-d6ed-4d54-9e1a-94e3db235f57',
        content: 'lol',
        receivedDate: Date.now()
      }
    },
    j: {
      id: 'j',
      avatar: 'https://static.suchanecki.me/nasa.jpg',
      muted: true
    },
    paczka: {
      id: 'paczka',
      avatar: '',
      muted: false,
      messages: [
        '2e341b65-656a-4fb4-b616-9d2c0ba1499c',
        '57499627-432a-4302-9163-1a3001c5798e'
      ],
      lastMessage: {
        id: '57499627-432a-4302-9163-1a3001c5798e',
        content: 'testing',
        receivedDate: Date.now() - 123600
      }
    },
    ...Object.fromEntries(
      new Array(10).fill(null).map((_, i) => {
        const uid = v4();
        return [
          `${uid}-${i + 1}`,
          {
            id: `${uid}-${i + 1}`,
            name: `${uid}-${i + 1}`,
            avatar: '',
            muted: false,
            messages: [
              // '2e341b65-656a-4fb4-b616-9d2c0ba1499c',
              // '57499627-432a-4302-9163-1a3001c5798e'
            ]
            // lastMessage: {
            //   id: '57499627-432a-4302-9163-1a3001c5798e',
            //   content: v4(),
            //   receivedDate: Date.now() - 200000
            // },
          }
        ];
      })
    )
  }
};
