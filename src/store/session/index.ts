import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import getPersistConf from '../persist-config';
import { SessionState, SessionActionTypes, SessionActionsEnum } from './types';

export const initialState: SessionState = {
  sessionInfo: {
    token: null,
    refreshToken: null
  }
};

const sessionReducer = (state = initialState, action: SessionActionTypes) => {
  switch (action.type) {
  case SessionActionsEnum.SET_TOKEN:
    return {
      sessionInfo: {
        ...state.sessionInfo,
        token: action.data.token
      }
    };

  case SessionActionsEnum.SET_REFRESH_TOKEN:
    return {
      sessionInfo: {
        ...state.sessionInfo,
        refreshToken: action.data.token
      }
    };

  case SessionActionsEnum.CLEAR_TOKENS:
    return initialState;

  default:
    return state;
  }
};

export default persistReducer({
  ...getPersistConf('ne-auth'),
  storage
}, sessionReducer);
