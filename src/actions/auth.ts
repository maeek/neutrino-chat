import { Dispatch } from 'redux';
import { ApiAuthorization } from '@/api/auth';
import { ChatApiAuthHeadersEnum } from '@/api/auth/types';
import {
  setMeUsername,
  setMeAvatar,
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
import {
  startAuthentication,
  startRegistration
} from '@simplewebauthn/browser';

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
    async (dispatch: Dispatch) => {
      const loginPromise = params.webAuthn
        ? ApiAuthorization.loginWebAuthn
        : ApiAuthorization.login;

      let webAuthnParams = null;
      if (params.webAuthn) {
        try {
          const options = await ApiAuthorization.getWebAuthnLoginOptions(
            username
          );
          webAuthnParams = await startAuthentication(options.data);
        } catch (e: any) {
          console.error('Failed to start authentication', e);
          dispatch(
            addNewError(
              unifiedErrorTemplate(e.type, 'Invalid credentials', null, {
                username,
                from: params.from
              })
            )
          );
          return;
        }
      }

      loginPromise(username, params.webAuthn ? webAuthnParams : password)
        .then((response) => {
          dispatch(setToken(response.headers[ ChatApiAuthHeadersEnum.TOKEN ]));
          dispatch(setRefreshToken('secure-token'));
          dispatch(setMeUsername(response.data.me.username));
          dispatch(setMeRole(response.data.me.role));

          // After login initial fetch
          const avatar = response.data.me.avatar || '';
          dispatch(
            setMeAvatar(
              avatar ? `${location.origin}/api/users/${username}/avatar` : ''
            )
          );

          Navigator.replace(params.history, params.from?.pathname || '/');
        })
        .catch((e: any) => {
          console.error('Failed to log in! ', e);
          dispatch(
            addNewError(
              unifiedErrorTemplate(e.type, 'Invalid credentials', null, {
                username,
                from: params.from
              })
            )
          );
        });
    };

export const logout = () => (dispatch: Dispatch) => {
  ApiAuthorization.logout()
    .catch((e: any) => {
      console.error(
        'Failed to clear the session, you will be logged out anyway but the token will still be valid',
        e
      );
      dispatch(
        addNewError(unifiedErrorTemplate(e.type, 'Failed delete a session', []))
      );
    })
    .finally(() => {
      dispatch(clearTokens());
      dispatch(clearMe());
      location.reload();
    });
};

const registerPassowrd = async (username: string, password: string) => {
  const response = await ApiAuthorization.register(username, password);

  return response;
};

export const register =
  (
    username: string,
    params: {
      password?: string;
      webAuthn: boolean;
      history: unknown;
      from: { pathname: string };
    }
  ) =>
    async (dispatch: Dispatch) => {
      let response: any;
      if (!params.webAuthn) {
        response = await registerPassowrd(username, params.password as string);
      } else {
        const options = await ApiAuthorization.getWebAuthnRegistrationOptions(
          username
        );
        let regPassKeyResponse: any;

        try {
          regPassKeyResponse = await startRegistration(options.data);
        } catch (e: any) {
          console.error('Failed to start registration', e);
          dispatch(
            addNewError(
              unifiedErrorTemplate(
                e.type,
                'Failed to register an account',
                null,
                {
                  username,
                  from: params.from
                }
              )
            )
          );
          return;
        }

        response = await ApiAuthorization.registerWebAuthn(
          username,
          regPassKeyResponse
        );
      }

      dispatch(setToken(response.headers[ ChatApiAuthHeadersEnum.TOKEN ]));
      dispatch(setRefreshToken('secure-token'));
      dispatch(setMeUsername(response.data.me.username));
      dispatch(setMeRole(response.data.me.role));

      // After login initial fetch
      const avatar = response.data.me.avatar || '';
      dispatch(
        setMeAvatar(
          avatar ? `${location.origin}/api/users/${username}/avatar` : ''
        )
      );

      Navigator.replace(params.history, params.from?.pathname || '/');
    };
