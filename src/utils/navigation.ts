import { Store } from 'redux';
import store from '../store';
import {
  goBack,
  goForward,
  pushLocation,
  replaceLocation,
  setHistory,
  updateIndex
} from '../store/history/actions';

export class NavigationController {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  init() {
    const loadHistory = window.sessionStorage.getItem('history') || '';
    try { 
      this.store.dispatch(setHistory(JSON.parse(loadHistory)));
    } catch {
      console.log('Starting new history session');
    }

    this.store.subscribe(() => {
      const storeHistory = this.store.getState().history;
      const stringified = JSON.stringify(storeHistory);
      sessionStorage.setItem('history', stringified);
    });

    window.addEventListener('popstate', (evt: PopStateEvent) => {
      store.dispatch(updateIndex(window.history?.state?.state?.id ?? 0));
    });
  }

  back(history: any) {
    const storeHistory = this.store.getState().history;
    if (storeHistory.currentIndex > 0 && storeHistory.stack.length > 0) {
      this.store.dispatch(goBack());
      history.goBack();
    }
  }

  forward(history: any, pathname?: string, state?: {}) {
    const storeHistory = this.store.getState().history;
    
    if (pathname) {
      const newId = storeHistory.currentIndex + 1;

      this.store.dispatch(pushLocation(pathname, newId));
      history.push({
        pathname,
        state: {
          id: newId,
          ...state
        }
      });
      return;
    } 

    if (storeHistory.stack.length - 1 > storeHistory.currentIndex) {
      this.store.dispatch(goForward());
      history.goForward();
    }
  }

  replace(history: any, pathname: string, state?: {}) {
    const storeHistory = this.store.getState().history;
    this.store.dispatch(replaceLocation(pathname));
    history.replace({
      pathname,
      state: {
        id: storeHistory.stack[storeHistory.currentIndex]?.id,
        ...state
      }
    });
  }
}

const NavController =  new NavigationController(store);

export default NavController;
