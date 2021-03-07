import { GenericPayloadStructure } from '../../types';



export interface MutedState {
  channels: string[];
  users: string[];
}

export enum MutedActionsEnum {
  MUTE_USER = 'MUTE_USER',
  UNMUTE_USER = 'UNMUTE_USER',
  CLEAR_MUTED_USER = 'CLEAR_MUTED_USER',
  MUTE_CHANNEL = 'MUTE_CHANNEL',
  UNMUTE_CHANNEL = 'UNMUTE_CHANNEL',
  CLEAR_MUTED_CHANNEL = 'CLEAR_MUTED_CHANNEL'
}



export interface MutedUserAction<T> extends GenericPayloadStructure {
  type: T;
  data: {
    list: string[];
  }
}

export type AddMutedUserAction  = MutedUserAction<MutedActionsEnum.MUTE_USER>;
export type AddMutedChannelAction  = MutedUserAction<MutedActionsEnum.MUTE_CHANNEL>;
export type RemoveMutedUserAction  = MutedUserAction<MutedActionsEnum.UNMUTE_USER>;
export type RemoveMutedChannelAction  = MutedUserAction<MutedActionsEnum.UNMUTE_CHANNEL>;

export interface ClearMutedUsersAction extends GenericPayloadStructure {
  type: MutedActionsEnum.CLEAR_MUTED_USER;
  data: {}
}

export interface ClearMutedChannelsAction extends GenericPayloadStructure {
  type: MutedActionsEnum.CLEAR_MUTED_CHANNEL;
  data: {}
}

export type MutedActionTypes = AddMutedChannelAction |
  AddMutedUserAction |
  RemoveMutedChannelAction |
  RemoveMutedUserAction |
  ClearMutedChannelsAction |
  ClearMutedUsersAction;
