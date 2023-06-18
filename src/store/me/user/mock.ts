import { UserRole, UserState } from './types';

export const userReducerMock: UserState = {
  username: 'maek',
  role: UserRole.ADMIN,
  avatar: '',
  bio: 'Lorem ipsum dolor sit amet co nsectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis.'
};

export default userReducerMock;
