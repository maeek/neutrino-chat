import { Reducer } from 'redux';
import { ClearMe, UserActionsEnum } from '@/store/me/user/types';
import { usersReducerMock } from './mock';
import { UsersAction, UsersActionsEnum, UsersState } from './types';
import { AddMessages, MessagesActionsEnum } from '../messages/types';

export const initialState: UsersState = __DEMO__
  ? usersReducerMock
  : {
    entries: {}
  };

export const users: Reducer<UsersState, UsersAction | ClearMe | AddMessages> = (
  state = initialState,
  action = {} as UsersAction
) => {
  const newUsers = {
    ...state.entries
  };

  switch (action.type) {
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

  case UsersActionsEnum.ADD_USERS:
    return {
      entries: {
        ...state.entries,
        ...Object.fromEntries(
          action.data.users.map((user) => [ user.id, user ])
        )
      }
    };

  case UsersActionsEnum.REMOVE_USERS:
    for (const id of action.data.ids) {
      delete newUsers[ id ];
    }

    return {
      entries: {
        ...newUsers
      }
    };

  case UsersActionsEnum.MODIFY_USERS:
    for (const user of action.data.users) {
      newUsers[ user.id ] = {
        ...state.entries[ user.id ],
        ...user
      };
    }

    return {
      entries: {
        ...newUsers
      }
    };

  case MessagesActionsEnum.ADD_MESSAGES:
    for (const ms of action.data.messages) {
      newUsers[ ms.parentId ] = {
        ...state.entries[ ms.parentId ],
        lastMessage: {
          id: ms.uuid,
          content: ms.body || '',
          receivedDate: ms.timeReceived || 0
        }
      };
    }

    return {
      entries: {
        ...newUsers
      }
    };

  default:
    return state;
  }
};

export default users;
