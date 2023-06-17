import localforage from 'localforage';
import { PersistConfig } from 'redux-persist/es/types';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'chat',
  version: 1.0,
  storeName: 'persist_cache'
});

export const getPersistConf = (key: string): PersistConfig<any> => ({
  key,
  storage: localforage,
  debug: import.meta.env.MODE === 'development',
  stateReconciler: autoMergeLevel2,
  blacklist: ['lastMessage']
});

export default getPersistConf;
