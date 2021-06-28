import { ApiAuthorization } from '@/api/auth';
import { NeutrinoApiAuthHeadersEnum } from '@/api/auth/types';
import { setMeUsername, setMeAvatar, setMeBanner } from '@/store/me/user/actions';
// import userReducerMock from '@/store/me/user/mock';
import { setToken, setRefreshToken, clearTokens } from '@/store/session/actions';
import Navigator from '@/utils/navigation';
import { Dispatch } from 'redux';
import { STORAGE_PERSIST_KEY } from './consts';

export const login = (
  username: string,
  password: string,
  params: {
    history: unknown,
    from: { pathname: string }
  }
) => (dispatch: Dispatch) => {
  
  ApiAuthorization.login(username, password)
    .then((response) => {
      const user = {
        username,
        token: response.data.resources.token,
        refreshToken: response.headers[ NeutrinoApiAuthHeadersEnum.REFRESH_TOKEN ]
      };

      dispatch(setToken(user.token));
      dispatch(setRefreshToken(user.refreshToken));
      dispatch(setMeUsername(username));

      // After login initial fetch
      dispatch(setMeAvatar(''));
      dispatch(setMeBanner(''));

      window.localStorage.setItem(STORAGE_PERSIST_KEY, JSON.stringify(user));

      Navigator.replace(params.history, params.from?.pathname || '/');
    })
    .catch((e: any) => {
      console.error('Failed to log in! ', e);
    });
};

export const logout = () => (dispatch: Dispatch) => {
  window.localStorage.removeItem(STORAGE_PERSIST_KEY);
  dispatch(clearTokens());
};
