/* eslint-disable no-unused-vars */
import { GenericPayloadStructure } from '../../types';

export type UserState = {
  username: string;
  avatar: string;
};

export enum UserActionsEnum {
  SET_USERNAME = 'SET_USERNAME',
  SET_AVATAR = 'SET_AVATAR'
}


export interface SetUsername extends GenericPayloadStructure {
  type: UserActionsEnum.SET_USERNAME;
  data: {
    username: string;
  }
}

export interface SetAvatar extends GenericPayloadStructure {
  type: UserActionsEnum.SET_AVATAR;
  data: {
    avatar: string;
  }
}

export type UserActionTypes = SetUsername | SetAvatar;
