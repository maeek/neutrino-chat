/* eslint-disable no-unused-vars */
import { GenericPayloadStructure } from '../../types';

export type UserState = {
  username: string;
  avatar: string;
  bio: string;
};

export enum UserActionsEnum {
  SET_ME_USERNAME = 'SET_ME_USERNAME',
  SET_ME_AVATAR = 'SET_ME_AVATAR',
  SET_ME_BIO = 'SET_ME_BIO'
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

export type UserActionTypes = SetMeUsername | SetMeAvatar | SetMeBio;
