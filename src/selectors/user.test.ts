import { getMeAvatar, getMeBio, getMeUser, getMeUsername } from './user';

describe('Selectors - User', () => {
  const globalStateMock = {
    me: {
      user: {
        username: '',
        avatar: '',
        bio: ''
      }
    }
  };

  it('getMeUser should return current user from global store', () => {
    const user = getMeUser(globalStateMock as any);
    expect(user).toEqual(globalStateMock.me.user);
  });

  it('getMeUsername should return current user username from global store', () => {
    const username = getMeUsername(globalStateMock as any);
    expect(username).toEqual(globalStateMock.me.user.username);
  });

  it('getMeAvatar should return current user avatar from global store', () => {
    const avatar = getMeAvatar(globalStateMock as any);
    expect(avatar).toEqual(globalStateMock.me.user.avatar);
  });

  it('getMeBio should return current user avatar from global store', () => {
    const bio = getMeBio(globalStateMock as any);
    expect(bio).toEqual(globalStateMock.me.user.bio);
  });
});
