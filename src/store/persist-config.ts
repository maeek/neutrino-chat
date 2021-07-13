import localforage from 'localforage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'neutrino-chat',
  version: 1.0,
  storeName: 'persist_cache'
});

export const getPersistConf = (key: string) => ({
  key,
  storage: localforage,
  debug: __DEV__,
  stateReconciler: autoMergeLevel2
});

export default getPersistConf;
