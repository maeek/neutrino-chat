import { Reducer } from 'redux';
import { usersReducerMock } from './mock';
import { UsersAction, UsersActionsEnum, UsersState } from './types';

export const initialState: UsersState = __DEMO__ ? usersReducerMock : {
  entries: {}
};

export const users: Reducer<UsersState, UsersAction> = (state = initialState, action) => {
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

  case UsersActionsEnum.USERS_CLEAR:
    return {
      entries: {}
    };

  default:
    return state;
  }
};
