import { ActionCreator } from 'redux';
import { ClearUsersCache, DeleteUsersCache, PopulateUsersCache, User, UsersActionsEnum } from './types';

export const populateUsersCache: ActionCreator<PopulateUsersCache> = (users: User[]) => ({
  type: UsersActionsEnum.USERS_CACHE,
  data: {
    users
  }
});

export const deleteUsersCache: ActionCreator<DeleteUsersCache> = (users: string[]) => ({
  type: UsersActionsEnum.USERS_DELETE,
  data: {
    users
  }
});

export const clearUsersCache: ActionCreator<ClearUsersCache> = () => ({
  type: UsersActionsEnum.USERS_CLEAR,
  data: {}
});
