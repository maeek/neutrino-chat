// import { ApiAuthorization } from '@/api/auth';
import { setMeUsername, setMeAvatar } from '@/store/me/user/actions';
import { setToken, setRefreshToken } from '@/store/session/actions';
import Navigator from '@/utils/navigation';
import { Dispatch } from 'redux';

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
  dispatch(setToken('123'));
  dispatch(setRefreshToken('123'));
  dispatch(setMeUsername(username));
  dispatch(setMeAvatar('https://static.suchanecki.me/pepe1.jpg'));
  window.localStorage.setItem('avatar', 'https://static.suchanecki.me/pepe1.jpg');
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('token', '123');
  window.localStorage.setItem('refreshToken', '123');
  Navigator.replace(params.history, params.from?.pathname || '/');
  // })
  // .catch();

};
