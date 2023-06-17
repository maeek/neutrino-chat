/* eslint-disable no-unused-vars */
import { Action } from 'redux';

export interface Reaction {
  emoji: string;
}

export enum MeStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  OFFLINE = 'OFFLINE'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export type UserState = {
  username: string;
  role: string;
  avatar: string;
  bio: string;
};

export enum UserActionsEnum {
  SET_ME_USERNAME = 'SET_ME_USERNAME',
  SET_ME_AVATAR = 'SET_ME_AVATAR',
  SET_ME_REACTIONS = 'SET_ME_REACTIONS',
  SET_ME_BIO = 'SET_ME_BIO',
  SET_ME_BANNER = 'SET_ME_BANNER',
  SET_ME_STATUS = 'SET_ME_STATUS',
  CLEAR_ME = 'CLEAR_ME',
  SET_ME_ROLE = 'SET_ME_ROLE'
}

export interface SetMeUsername extends Action {
  type: UserActionsEnum.SET_ME_USERNAME;
  data: {
    username: string;
  };
}

export interface SetMeRole extends Action {
  type: UserActionsEnum.SET_ME_ROLE;
  data: {
    role: string;
  };
}

export interface SetMeAvatar extends Action {
  type: UserActionsEnum.SET_ME_AVATAR;
  data: {
    avatar: string;
  };
}

export interface SetMeBio extends Action {
  type: UserActionsEnum.SET_ME_BIO;
  data: {
    bio: string;
  };
}

export interface ClearMe extends Action {
  type: UserActionsEnum.CLEAR_ME;
  data: {};
}

export type UserActionTypes =
  | SetMeRole
  | ClearMe
  | SetMeUsername
  | SetMeAvatar
  | SetMeBio;
