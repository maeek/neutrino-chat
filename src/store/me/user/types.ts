/* eslint-disable no-unused-vars */
import { GenericPayloadStructure } from '../../types';

export type UserState = {
  username: string;
  avatar: string;
};

export enum UserActionsEnum {
  SET_USERNAME = 'SET_USERNAME'
}


export interface SetUsername extends GenericPayloadStructure {
  type: UserActionsEnum.SET_USERNAME;
  data: {
    username: string;
  }
}

export type UserActionTypes = SetUsername;
