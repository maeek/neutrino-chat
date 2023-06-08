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
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserState = {
  username: string;
  role: string;
  avatar: string;
  banner: string;
  bio: string;
  status: MeStatus;
  defaultReactions: Reaction[];
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

export interface SetMeBanner extends Action {
  type: UserActionsEnum.SET_ME_BANNER;
  data: {
    banner: string;
  };
}

export interface SetMeStatus extends Action {
  type: UserActionsEnum.SET_ME_STATUS;
  data: {
    status: MeStatus;
  };
}

export interface SetMeReactions extends Action {
  type: UserActionsEnum.SET_ME_REACTIONS;
  data: {
    reactions: Reaction[];
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
  | SetMeBio
  | SetMeBanner
  | SetMeStatus
  | SetMeReactions;
