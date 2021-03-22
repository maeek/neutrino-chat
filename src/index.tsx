import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store/index';
import { setRefreshToken, setToken } from '@store/session/actions';
import { setMeUsername, setMeAvatar } from '@store/me/user/actions';
import Navigator from '@utils/navigation';
import reportWebVitals from './report-web-vitals';
import * as serviceWorkerRegistration from './register-service-worker';
import App from './App';
import './styles/index.scss';

const run = async () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('app-root')
  );
};

const init = () => {
  // Init redux history
  Navigator.init();

  // Try restore the session
  const token = window.localStorage.getItem('token');
  const refreshToken = window.localStorage.getItem('refreshToken');
  const username = window.localStorage.getItem('username');
  const avatar = window.localStorage.getItem('avatar');
  store.dispatch(setMeAvatar(avatar || ''));
  store.dispatch(setMeUsername(username || ''));
  store.dispatch(setToken(token || ''));
  store.dispatch(setRefreshToken(refreshToken || ''));
};

init();
run();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);


// Register service worker
serviceWorkerRegistration.register();
