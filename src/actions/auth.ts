import { Dispatch } from 'redux';
import { ApiAuthorization } from '@/api/auth';
import { ChatApiAuthHeadersEnum } from '@/api/auth/types';
import {
  setMeUsername,
  setMeAvatar,
  setMeBanner,
  clearMe,
  setMeRole
} from '@/store/me/user/actions';
import {
  setToken,
  setRefreshToken,
  clearTokens
} from '@/store/session/actions';
import Navigator from '@/utils/navigation';
import { addNewError } from '@/store/app/errors/actions';
import { unifiedErrorTemplate } from '@/store/app/errors/error';
import { RootState } from '@/store/root';
import { getAuthRefreshToken } from '@/selectors/session';
import { UserRole } from '@/store/me/user/types';

export const login =
  (
    username: string,
    password: string,
    params: {
      webAuthn: boolean;
      history: unknown;
      from: { pathname: string };
    }
  ) =>
  (dispatch: Dispatch) => {
    ApiAuthorization.login(username, password)
      .then((response) => {
        dispatch(setToken(response.headers[ChatApiAuthHeadersEnum.TOKEN]));
        dispatch(setRefreshToken('secure-token'));
        dispatch(setMeUsername(response.data.me.username));
        dispatch(setMeRole(response.data.me.role));

        // After login initial fetch
        dispatch(setMeAvatar(response.data.me.avatar || ''));

        Navigator.replace(params.history, params.from?.pathname || '/');
      })
      .catch((e: any) => {
        console.error('Failed to log in! ', e);
        dispatch(
          addNewError(
            unifiedErrorTemplate(e.type, e, null, {
              username,
              from: params.from
            })
          )
        );
      });
  };

export const logout = () => (dispatch: Dispatch, getState: () => RootState) => {
  ApiAuthorization.logout(getAuthRefreshToken(getState()) as string)
    .catch((e: any) => {
      console.error(
        'Failed to clear the session, you will be logged out anyway but the token will still be valid',
        e
      );
      dispatch(addNewError(unifiedErrorTemplate(e.type, e, [])));
    })
    .finally(() => {
      dispatch(clearTokens());
      dispatch(clearMe());
    });
};
