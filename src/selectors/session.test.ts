import { getAuthRefreshToken, getAuthToken } from './session';

describe('Redux store - Me/Contacts', () => {
  describe('Selectors', () => {
    const globalStateMock = {
      auth: {
        sessionInfo: {
          token: 'abcd',
          refreshToken: 'abcd'
        }
      }
    };

    it('getAuthToken should return token from global store', () => {
      const token = getAuthToken(globalStateMock as any);
      expect(token).toEqual('abcd');
    });
    it('getAuthRefreshToken should return refreshToken from global store', () => {
      const token = getAuthRefreshToken(globalStateMock as any);
      expect(token).toEqual('abcd');
    });
  });
});


