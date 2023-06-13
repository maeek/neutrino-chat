import { Action } from 'redux';

export enum UserStatusEnum {
  OFFLINE = 0,
  AWAY = 1,
  ACTIVE = 2
}

export enum UserFetchingStatus {
  NOT_STARTED = 0,
  PENDING = 1,
  SUCCESS = 2,
  FAIL = 3,
  CANCELED = 4
}

export interface UsersSettings {
  backgroundUri?: string;
  backgroundOpacity?: number;
  backgroundBlur?: number;
  color?: string;
}

export interface User {
  id: string;
  // name: string;
  bio?: string;
  fetchingStatus: UserFetchingStatus;
  // nickname?: string;
  status?: UserStatusEnum;
  avatar?: string;
  // banner?: string;
  blocked?: boolean;
  settings?: UsersSettings;
  messages?: string[];
  isHidden?: boolean;
  isContact?: boolean;
  lastMessage?: {
    id: string;
    content: string;
    receivedDate: number;
  };
  typing?: boolean;
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
  ADD_USERS = 'ADD_USERS',
  MODIFY_USERS = 'MODIFY_USERS',
  REMOVE_USERS = 'REMOVE_USERS'
}

export interface PopulateUsersCache extends Action {
  type: UsersActionsEnum.USERS_CACHE;
  data: {
    users: User[];
  };
}

export interface AddUsers extends Action {
  type: UsersActionsEnum.ADD_USERS;
  data: {
    users: User[];
  };
}

export interface ModifyUsers extends Action {
  type: UsersActionsEnum.MODIFY_USERS;
  data: {
    users: ({ id: string } & Partial<User>)[];
  };
}

export interface RemoveUsers extends Action {
  type: UsersActionsEnum.REMOVE_USERS;
  data: {
    ids: string[];
  };
}

export interface DeleteUsersCache extends Action {
  type: UsersActionsEnum.USERS_DELETE;
  data: {
    users: string[];
  };
}

export interface ClearUsersCache extends Action {
  type: UsersActionsEnum.USERS_CLEAR;
  data: {};
}

export type UsersAction =
  | PopulateUsersCache
  | DeleteUsersCache
  | ClearUsersCache
  | AddUsers
  | RemoveUsers
  | ModifyUsers;
