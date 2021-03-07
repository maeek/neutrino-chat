/* eslint-disable no-console */
import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer, { RootState } from './root';

let reducers;

const logger: Middleware<{}, RootState>  = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

if (process.env.NODE_ENV === 'development') {
  reducers = composeWithDevTools(
    applyMiddleware(
      thunk,
      logger
    )
  );
} else {
  reducers = applyMiddleware(thunk);
}

const store = createStore(rootReducer, reducers);

(window as any).store = store;

export const getStore = () => store;
export const getStoreState = () => store.getState();

export default store;
