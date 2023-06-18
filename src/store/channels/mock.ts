import { ChannelsState } from './types';

export const channelsReducerMock: ChannelsState = {
  entries: {
    Main: {
      name: 'Main',
      owner: 'maeek',
      createdAt: Date.now(),
      public: true,
      messages: [
        'a8a6db9e-33f0-4055-b301-ecfff7319c54',
        '76de8810-0f4e-42c3-acf4-135767b313fb',
        'cc00dac3-bc5f-4ff0-8649-99720a5039a4'
      ],
      lastMessage: {
        id: 'cc00dac3-bc5f-4ff0-8649-99720a5039a4',
        content: 'Thanks, it\'s really useful'
      },
      users: [],
      blockedUsers: []
    },
    'Weekly meetings': {
      name: 'Weekly meetings',
      owner: 'maeek',
      createdAt: Date.now(),
      public: false,
      messages: [
        '2c296f34-ce40-4c02-ae63-cc42f65c9117',
        '62a9c5fc-8158-44f0-be36-8fff6373c02f',
        '7bf76316-7311-421e-9011-b29b75816cd7'
      ],
      lastMessage: {
        id: '7bf76316-7311-421e-9011-b29b75816cd7',
        content: 'This is secret'
      },
      users: [],
      blockedUsers: []
    },
    'Trailer park': {
      name: 'Trailer park',
      owner: 'bobandy',
      createdAt: Date.now(),
      public: false,
      messages: [
        'b5022bdf-2822-403f-8a72-f0855efff024',
        'bd123a02-1089-4652-b753-c9f24efc0601',
        '3bd5abaa-6346-4da9-beea-953f192175ae'
      ],
      lastMessage: {
        id: '3bd5abaa-6346-4da9-beea-953f192175ae',
        content: 'Yeeet'
      },
      users: [],
      blockedUsers: []
    }
  }
};

export default channelsReducerMock;
