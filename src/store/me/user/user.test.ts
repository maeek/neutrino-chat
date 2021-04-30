import meUserReducer from '.';
import { setMeAvatar, setMeBio, setMeUsername } from './actions';
import { getMeAvatar, getMeBio, getMeUser, getMeUsername } from '@selectors/user';
import { SetMeAvatar, SetMeBio, SetMeUsername, UserActionsEnum, UserActionTypes } from './types';

describe('Redux store - Me/Contacts', () => {
  describe('Actions', () => {

    it('should set current user username', () => {
      const username = 'test';
      const expectedAction = {
        type: UserActionsEnum.SET_ME_USERNAME,
        data: {
          username
        }
      };
      expect(setMeUsername(username)).toEqual(expectedAction);
    });

    it('should set current user avatar', () => {
      const avatar = 'https://cdn.neutrino.chat/image/test.jpg';
      const expectedAction = {
        type: UserActionsEnum.SET_ME_AVATAR,
        data: {
          avatar
        }
      };
      expect(setMeAvatar(avatar)).toEqual(expectedAction);
    });

    it('should set current user bio', () => {
      const bio = 'test bio';
      const expectedAction = {
        type: UserActionsEnum.SET_ME_BIO,
        data: {
          bio
        }
      };
      expect(setMeBio(bio)).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        meUserReducer(undefined, {} as UserActionTypes)
      ).toEqual({
        username: '',
        avatar: '',
        bio: ''
      });
    });

    it('should handle SET_ME_USERNAME', () => {
      const username = 'maek';

      const setUsername: SetMeUsername = {
        type: UserActionsEnum.SET_ME_USERNAME,
        data: {
          username
        }
      };

      expect(
        meUserReducer(undefined, setUsername)
      ).toEqual({
        username,
        avatar: '',
        bio: ''
      });
    });

    it('should handle SET_ME_BIO', () => {
      const bio = 'test bio';

      const setBio: SetMeBio = {
        type: UserActionsEnum.SET_ME_BIO,
        data: {
          bio
        }
      };

      expect(
        meUserReducer(undefined, setBio)
      ).toEqual({
        username: '',
        avatar: '',
        bio
      });
    });

    it('should handle SET_ME_AVATAR', () => {
      const avatar = 'https://cdn.neutrino.chat/images/test.jpg';

      const setBio: SetMeAvatar = {
        type: UserActionsEnum.SET_ME_AVATAR,
        data: {
          avatar
        }
      };

      expect(
        meUserReducer(undefined, setBio)
      ).toEqual({
        username: '',
        avatar,
        bio: ''
      });
    });
  });

  describe('Selectots', () => {
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
});
