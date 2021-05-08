import { MeStatus, UserState } from './types';

export const userReducerMock: UserState = {
  username: 'maeek',
  avatar: 'https://static.suchanecki.me/pepe1.jpg',
  banner: 'https://static.suchanecki.me/neony_1080p.jpg',
  bio: 'This is an example of a bio',
  status: MeStatus.ACTIVE,
  defaultReactions: [
    {
      emoji: ':)'
    },
    {
      emoji: ':('
    },
    {
      emoji: ':0'
    },
    {
      emoji: '>:['
    }
  ]
};

export default userReducerMock;
