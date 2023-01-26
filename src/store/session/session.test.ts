import sessionReducer from '.';
import { clearTokens, setRefreshToken, setToken } from './actions';
import {
  ClearTokensAction,
  SessionActionsEnum,
  SessionActionTypes,
  SetRefreshTokenAction,
  SetTokenAction,
  SessionState
} from './types';

describe('Redux store - Me/Contacts', () => {
  describe('Actions', () => {

    it('should create an action to set token', () => {
      const expectedAction = {
        type: SessionActionsEnum.SET_TOKEN,
        data: {
          token: 'abcd123'
        }
      };
      expect(setToken('abcd123')).toEqual(expectedAction);
    });

    it('should create an action to set refresh token', () => {
      const expectedAction = {
        type: SessionActionsEnum.SET_REFRESH_TOKEN,
        data: {
          token: 'abcd123'
        }
      };
      expect(setRefreshToken('abcd123')).toEqual(expectedAction);
    });

    it('should create an action to clear tokens', () => {
      const expectedAction = {
        type: SessionActionsEnum.CLEAR_TOKENS,
        data: {}
      };
      expect(clearTokens()).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        sessionReducer(undefined, {} as SessionActionTypes)
      ).toEqual({
        sessionInfo: {
          token: null,
          refreshToken: null
        }
      });
    });

    it('should handle SET_TOKEN', () => {
      const setTokenAction: SetTokenAction = {
        type: SessionActionsEnum.SET_TOKEN,
        data: {
          token: 'abcd123'
        }
      };

      expect(
        sessionReducer(undefined, setTokenAction)
      ).toEqual({
        sessionInfo: {
          token: 'abcd123',
          refreshToken: null
        }
      });
    });

    it('should handle SET_REFRESH_TOKEN', () => {
      const setRefreshTokenAction: SetRefreshTokenAction = {
        type: SessionActionsEnum.SET_REFRESH_TOKEN,
        data: {
          token: 'abcd123'
        }
      };

      expect(
        sessionReducer(undefined, setRefreshTokenAction)
      ).toEqual({
        sessionInfo: {
          token: null,
          refreshToken: 'abcd123'
        }
      });
    });

    it('should handle CLEAR_TOKENS', () => {
      const clearTokensAction: ClearTokensAction = {
        type: SessionActionsEnum.CLEAR_TOKENS,
        data: {}
      };

      const initState: SessionState = {
        sessionInfo: {
          token: 'asfjlasli43',
          refreshToken: 'jkldfgdlk3'
        }
      };

      expect(
        sessionReducer(initState as any, clearTokensAction)
      ).toEqual({
        sessionInfo: {
          token: null,
          refreshToken: null
        }
      });
    });
  });
});
