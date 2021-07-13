import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { ClearMe, UserActionsEnum } from '@/store/me/user/types';
import { usersReducerMock } from './mock';
import { UsersAction, UsersActionsEnum, UsersState } from './types';
import getPersistConf from '../persist-config';

export const initialState: UsersState = __DEMO__ ? usersReducerMock : {
  entries: {}
};

export const users: Reducer<UsersState, UsersAction | ClearMe> = (state = initialState, action) => {
  const newUsers = {
    ...state.entries
  };
  
  switch(action.type) {
  case UsersActionsEnum.USERS_CACHE:
    for (const user of action.data.users) {
      newUsers[ user.id ] = user;
    }

    return {
      entries: {
        ...state.entries,
        ...newUsers
      }
    };

  case UsersActionsEnum.USERS_DELETE:
    for (const userId of action.data.users) {
      delete newUsers[ userId ];
    }

    return {
      entries: newUsers
    };

  case UserActionsEnum.CLEAR_ME:
  case UsersActionsEnum.USERS_CLEAR:
    return initialState;

  default:
    return state;
  }
};

export default persistReducer<any, any>(getPersistConf('ne-users'), users);
