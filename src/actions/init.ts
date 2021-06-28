import { Dispatch } from 'redux';
import { setMeAvatar, setMeBanner, setMeUsername } from '@/store/me/user/actions';
import { setToken, setRefreshToken } from '@/store/session/actions';
import { STORAGE_PERSIST_KEY } from './consts';

export const init = (): any => (dispatch: Dispatch) => {
  const persistedData = window.localStorage.getItem(STORAGE_PERSIST_KEY);

  if (!persistedData) return;

  try {
    const {
      token,
      refreshToken,
      username,
      avatar,
      banner
    } = JSON.parse(persistedData || '');

    dispatch(setMeAvatar(avatar || ''));
    dispatch(setMeBanner(banner || ''));
    dispatch(setMeUsername(username || ''));
    dispatch(setToken(token || ''));
    dispatch(setRefreshToken(refreshToken || ''));
  } catch (e: unknown) {
    window.localStorage.removeItem(STORAGE_PERSIST_KEY);
    console.error('Failed to initialize window from previous session! Previous session might not be compatible with current version of the app. Try logging in again.');
  }
};

export const afterLoginInit = () => {};
