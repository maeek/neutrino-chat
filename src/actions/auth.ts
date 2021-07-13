import { Dispatch } from 'redux';
import { ApiAuthorization } from '@/api/auth';
import { NeutrinoApiAuthHeadersEnum } from '@/api/auth/types';
import { setMeUsername, setMeAvatar, setMeBanner } from '@/store/me/user/actions';
import { setToken, setRefreshToken, clearTokens } from '@/store/session/actions';
import Navigator from '@/utils/navigation';
import { STORAGE_PERSIST_KEY } from './consts';
import { addNewError } from '@/store/app/errors/actions';
import { unifiedErrorTemplate } from '@/store/app/errors/error';

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
      dispatch(addNewError(unifiedErrorTemplate(
        e.type,
        e,
        null,
        { username, from: params.from }
      )));
    });
};

export const logout = () => (dispatch: Dispatch) => {
  window.localStorage.removeItem(STORAGE_PERSIST_KEY);
  dispatch(clearTokens());
  ApiAuthorization.logout().catch((e: any) => {
    console.error('Failed to clear the session, you will be logged out anyway but the token will still be valid', e);
    dispatch(addNewError(unifiedErrorTemplate(
      e.type,
      e,
      []
    )));
  });
};
