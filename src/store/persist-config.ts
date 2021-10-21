import localforage from 'localforage';
import { PersistConfig } from 'redux-persist/es/types';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'neutrino-chat',
  version: 1.0,
  storeName: 'persist_cache'
});

export const getPersistConf = (key: string): PersistConfig<any> => ({
  key,
  storage: localforage,
  debug: __DEV__,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    'lastMessage'
  ]
});

export default getPersistConf;
