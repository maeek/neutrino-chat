import meUserReducer from '.';
import { setMeAvatar, setMeBio, setMeUsername } from './actions';
import { MeStatus, SetMeAvatar, SetMeBio, SetMeUsername, UserActionsEnum, UserActionTypes } from './types';

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
        banner: '',
        bio: '',
        status: MeStatus.ACTIVE,
        defaultReactions: []
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
        banner: '',
        bio: '',
        status: MeStatus.ACTIVE,
        defaultReactions: []
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
        banner: '',
        bio,
        status: MeStatus.ACTIVE,
        defaultReactions: []
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
        banner: '',
        bio: '',
        status: MeStatus.ACTIVE,
        defaultReactions: []
      });
    });
  });
});
