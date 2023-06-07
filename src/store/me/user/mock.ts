import { MeStatus, UserState } from './types';

export const userReducerMock: UserState = {
  username: 'maeek',
  avatar: '',
  banner: '',
  bio: 'Lorem ipsum dolor sit amet co nsectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis.',
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
