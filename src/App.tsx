/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/';
import Router from './router';
import './styles/App.scss';

// import Router from 'components/routes/Router';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Router />
    </div>
  </Provider>
);

export default App;
