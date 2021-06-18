import { MeStatus, UserState } from './types';

export const userReducerMock: UserState = {
  username: 'maeek',
  avatar: '',
  banner: '',
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
