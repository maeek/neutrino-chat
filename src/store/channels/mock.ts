import { ChannelsState } from './types';

export const channelsReducerMock: ChannelsState = {
  joined: [
    '0f717b7f-fbf8-47a7-ae8c-778d8889406a',
    'f1f08055-a468-48e8-ac57-02cdf512636a'
  ],
  recent: [
    '0f717b7f-fbf8-47a7-ae8c-778d8889406a',
    'f1f08055-a468-48e8-ac57-02cdf512636a'
  ],
  entries: {
    '0f717b7f-fbf8-47a7-ae8c-778d8889406a': {
      id: '0f717b7f-fbf8-47a7-ae8c-778d8889406a',
      name: 'Main',
      description: '',
      avatar: {
        type: 'uri',
        uri: 'https://static.suchanecki.me/avatar.png'
      },
      owner: 'maeek',
      createdDate: Date.now(),
      isPublic: true,
      settings: {
        passwordPrompt: '',
        hasPassword: false,
        blocked: [],
        limit: 0,
        encrypted: false
      },
      messages: [
        'a8a6db9e-33f0-4055-b301-ecfff7319c54',
        '76de8810-0f4e-42c3-acf4-135767b313fb',
        'cc00dac3-bc5f-4ff0-8649-99720a5039a4'
      ],
      lastMessage: {
        id: 'cc00dac3-bc5f-4ff0-8649-99720a5039a4',
        content: 'Thanks, it\'s really useful'
      },
      participants: [ 'maeek', 'bob', 'ross' ],
      typing: [ 'bob' ]
    },
    'f1f08055-a468-48e8-ac57-02cdf512636a': {
      id: 'f1f08055-a468-48e8-ac57-02cdf512636a',
      name: 'Weekly meetings',
      description: '',
      avatar: {
        type: 'uri',
        uri: 'https://static.suchanecki.me/avatar.png'
      },
      owner: 'maeek',
      createdDate: Date.now(),
      isPublic: false,
      settings: {
        passwordPrompt: '',
        hasPassword: false,
        blocked: [],
        limit: 0,
        encrypted: false
      },
      messages: [
        '2c296f34-ce40-4c02-ae63-cc42f65c9117',
        '62a9c5fc-8158-44f0-be36-8fff6373c02f',
        '7bf76316-7311-421e-9011-b29b75816cd7'
      ],
      lastMessage: {
        id: '7bf76316-7311-421e-9011-b29b75816cd7',
        content: 'This is secret'
      },
      participants: [ 'maeek', 'arnold' ],
      typing: []
    },
    '9ceded8f-eabb-45ca-a52a-01f456104e78': {
      id: '9ceded8f-eabb-45ca-a52a-01f456104e78',
      name: 'Trailer park',
      description: '',
      avatar: {
        type: 'uri',
        uri: 'https://static.suchanecki.me/pepe1.png'
      },
      owner: 'bobandy',
      createdDate: Date.now(),
      isPublic: false,
      settings: {
        passwordPrompt: '',
        hasPassword: false,
        blocked: [],
        limit: 0,
        encrypted: false
      },
      messages: [
        'b5022bdf-2822-403f-8a72-f0855efff024',
        'bd123a02-1089-4652-b753-c9f24efc0601',
        '3bd5abaa-6346-4da9-beea-953f192175ae'
      ],
      lastMessage: {
        id: '3bd5abaa-6346-4da9-beea-953f192175ae',
        content: 'Yeeet'
      },
      participants: [ 'andy', 'bobandy' ],
      typing: []
    }
  }
};

export default channelsReducerMock;
