import { setMeAvatar, setMeUsername } from '@store/me/user/actions';
import { setToken, setRefreshToken } from '@store/session/actions';
import {Dispatch} from 'redux';

export const init = () => (dispatch: Dispatch) => {
  const token = window.localStorage.getItem('token');
  const refreshToken = window.localStorage.getItem('refreshToken');
  const username = window.localStorage.getItem('username');
  const avatar = window.localStorage.getItem('avatar');
  dispatch(setMeAvatar(avatar || ''));
  dispatch(setMeUsername(username || ''));
  dispatch(setToken(token || ''));
  dispatch(setRefreshToken(refreshToken || ''));
};