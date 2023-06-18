import 'focus-visible';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/store/index';
import Navigator from '@/utils/navigation';
import { init } from '@/actions/init';
import reportWebVitals from './report-web-vitals';
import App from './App';
import './styles/main.scss';

window.__DEMO__ = !!import.meta.env.VITE_DEMO;
window.__PROD__ = import.meta.env.MODE === 'production';
window.__DEV__ = import.meta.env.MODE === 'development';

if (import.meta.env.MODE !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const run = async () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-root')
  );
};

Navigator.init();
store.dispatch(init());

run();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (__DEV__) {
  // eslint-disable-next-line no-console
  reportWebVitals(console.log);
}
