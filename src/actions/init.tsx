import { Dispatch } from 'redux';
import { setMeAvatar, setMeBanner, setMeUsername } from '@/store/me/user/actions';
import { setToken, setRefreshToken } from '@/store/session/actions';

export const init = (): any => (dispatch: Dispatch) => {
  const token = window.localStorage.getItem('token');
  const refreshToken = window.localStorage.getItem('refreshToken');
  const username = window.localStorage.getItem('username');
  const avatar = window.localStorage.getItem('avatar');
  const banner = window.localStorage.getItem('banner');
  dispatch(setMeAvatar(avatar || ''));
  dispatch(setMeBanner(banner || ''));
  dispatch(setMeUsername(username || ''));
  dispatch(setToken(token || ''));
  dispatch(setRefreshToken(refreshToken || ''));
};
