import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root';

let reducers;

if (process.env.NODE_ENV === 'development') {
  import(/* webpack-chunk-name: redux-dev-chunk */'redux-devtools-extension').then((reduxDev) => {
    reducers = reduxDev.composeWithDevTools(
      applyMiddleware(thunk)
    );
  });
} else {
  reducers = applyMiddleware(thunk);
}

const store = createStore(rootReducer, reducers);

export default store;
