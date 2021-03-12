import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './report-web-vitals';
import * as serviceWorkerRegistration from './register-service-worker';
import { Provider } from 'react-redux';
import store from './store/';
// import remoteStoreWrapper from './store/remote-store-wrapper';
import './styles/index.scss';

// if (process.env.EXPERIMENTAL && process.env.NODE_ENV === 'development') {
//   store = require('./store/store.worker');
//   store = await remoteStoreWrapper(store as any);
// }

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

run();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);


// Register service worker
serviceWorkerRegistration.register();
