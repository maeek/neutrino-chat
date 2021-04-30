import { UserState } from './types';

export const userReducerMock: UserState = {
  username: 'maeek',
  avatar: 'https://static.suchanecki.me/pepe1.jpg',
  bio: 'This is an example of a bio',
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
