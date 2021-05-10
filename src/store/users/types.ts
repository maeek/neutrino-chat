
import { Action } from 'redux';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  blocked?: boolean;
}

export interface UsersEntry {
  [key: string]: User;
}

export interface UsersState {
  entries: UsersEntry;
}

export enum UsersActionsEnum {
  USERS_CACHE = 'USERS_CACHE',
  USERS_DELETE = 'USERS_DELETE',
  USERS_CLEAR = 'USERS_CLEAR',
}

export interface PopulateUsersCache extends Action {
  type: UsersActionsEnum.USERS_CACHE,
  data: {
    users: User[];
  }
}

export interface DeleteUsersCache extends Action {
  type: UsersActionsEnum.USERS_DELETE,
  data: {
    users: string[];
  }
}

export interface ClearUsersCache extends Action {
  type: UsersActionsEnum.USERS_CLEAR,
  data: {}
}

export type UsersAction = PopulateUsersCache | DeleteUsersCache | ClearUsersCache;
