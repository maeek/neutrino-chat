import { ActionCreator } from 'redux';
import { AddUsers, ClearUsersCache, DeleteUsersCache, ModifyUsers, PopulateUsersCache, RemoveUsers, User, UsersActionsEnum } from './types';

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

export const addUsers: ActionCreator<AddUsers> = (users: User[]) => ({
  type: UsersActionsEnum.ADD_USERS,
  data: {
    users
  }
});

export const removeUsers: ActionCreator<RemoveUsers> = (ids: string[]) => ({
  type: UsersActionsEnum.REMOVE_USERS,
  data: {
    ids
  }
});

export const modifyUsers: ActionCreator<ModifyUsers> = (users: ({ id: string; } & Partial<User>)[]) => ({
  type: UsersActionsEnum.MODIFY_USERS,
  data: {
    users
  }
});
