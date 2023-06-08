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

const getInitState = () => {
  const sessionInfo = JSON.parse(
    localStorage.getItem('persist:ne-auth') || 'null'
  )?.sessionInfo;

  if (sessionInfo) {
    return JSON.parse(sessionInfo);
  }

  return initialState.sessionInfo;
};

const initialFromLocalStorage = {
  sessionInfo: getInitState()
};

const sessionReducer = (
  state = initialFromLocalStorage,
  action: SessionActionTypes
) => {
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

export default persistReducer<
  ReturnType<typeof sessionReducer>,
  SessionActionTypes
>(
  {
    ...{ ...getPersistConf('ne-auth'), storage: localStorage },
    storage
  },
  sessionReducer
);
