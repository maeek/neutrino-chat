import 'focus-visible';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/store/index';
import Navigator from '@/utils/navigation';
import { init } from '@/actions/init';
import reportWebVitals from './report-web-vitals';
import * as serviceWorkerRegistration from './register-service-worker';
import App from './App';
import './styles/main.scss';

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

Navigator.init();
store.dispatch(init());

run();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
if (__DEV__) reportWebVitals(console.log);

// Register service worker
serviceWorkerRegistration.register();
