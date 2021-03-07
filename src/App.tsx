/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/';
import Router from './pages/router';
import './styles/App.scss';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
