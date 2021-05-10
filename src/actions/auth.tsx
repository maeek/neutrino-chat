// import { ApiAuthorization } from '@/api/auth';
import { setMeUsername, setMeAvatar, setMeBanner } from '@/store/me/user/actions';
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
  
  // ApiAuthorization.login(username, password)
  //   .then((data) => {
  const user = {
    username,
    avatar: 'https://static.suchanecki.me/pepe1.jpg',
    banner: 'https://static.suchanecki.me/neony_1080p.jpg',
    token: '123',
    refreshToken: '123'
  };

  dispatch(setToken(user.token));
  dispatch(setRefreshToken(user.refreshToken));
  dispatch(setMeUsername(username));
  dispatch(setMeAvatar(user.avatar));
  dispatch(setMeBanner(user.banner));

  window.localStorage.setItem(STORAGE_PERSIST_KEY, JSON.stringify(user));

  Navigator.replace(params.history, params.from?.pathname || '/');
  // })
  // .catch();
};

export const logout = () => (dispatch: Dispatch) => {
  window.localStorage.removeItem(STORAGE_PERSIST_KEY);
  dispatch(clearTokens());
};
