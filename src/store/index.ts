/* eslint-disable no-console */
import { createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer, { RootState } from './root';

let reducers;

const logger: Middleware<{}, RootState>  = store => next => action => {
  console.groupCollapsed(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

if (import.meta.env.MODE === 'development') {
  reducers = require('redux-devtools-extension').composeWithDevTools(
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
export const getStoreState = (): RootState => store.getState();
export const persistor = persistStore(store);

export default store;
