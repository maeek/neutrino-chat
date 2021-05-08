/* eslint-disable no-unused-vars */
import { GenericPayloadStructure } from '../../types';

export interface Reaction {
  emoji: string;
}

export enum MeStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  OFFLINE = 'OFFLINE'
}

export type UserState = {
  username: string;
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
  SET_ME_STATUS = 'SET_ME_STATUS'
}

export interface SetMeUsername extends GenericPayloadStructure {
  type: UserActionsEnum.SET_ME_USERNAME;
  data: {
    username: string;
  }
}

export interface SetMeAvatar extends GenericPayloadStructure {
  type: UserActionsEnum.SET_ME_AVATAR;
  data: {
    avatar: string;
  }
}

export interface SetMeBio extends GenericPayloadStructure {
  type: UserActionsEnum.SET_ME_BIO;
  data: {
    bio: string;
  }
}

export interface SetMeBanner extends GenericPayloadStructure {
  type: UserActionsEnum.SET_ME_BANNER;
  data: {
    banner: string;
  }
}

export interface SetMeStatus extends GenericPayloadStructure {
  type: UserActionsEnum.SET_ME_STATUS;
  data: {
    status: MeStatus;
  }
}

export interface SetMeReactions extends GenericPayloadStructure {
  type: UserActionsEnum.SET_ME_REACTIONS;
  data: {
    reactions: Reaction[];
  }
}

export type UserActionTypes = SetMeUsername | SetMeAvatar | SetMeBio | SetMeBanner | SetMeStatus | SetMeReactions;
