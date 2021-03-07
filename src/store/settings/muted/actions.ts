import {
  AddMutedUserAction,
  AddMutedChannelAction,
  RemoveMutedUserAction,
  RemoveMutedChannelAction,
  ClearMutedUsersAction,
  ClearMutedChannelsAction,
  MutedActionsEnum
} from './types';

export const muteUser = (list: string[]): AddMutedUserAction => ({
  type: MutedActionsEnum.MUTE_USER,
  data: {
    list
  }
});

export const muteChannel = (list: string[]): AddMutedChannelAction => ({
  type: MutedActionsEnum.MUTE_CHANNEL,
  data: {
    list
  }
});

export const unmuteChannel = (list: string[]): RemoveMutedChannelAction => ({
  type: MutedActionsEnum.UNMUTE_CHANNEL,
  data: {
    list
  }
});

export const unmuteUser = (list: string[]): RemoveMutedUserAction => ({
  type: MutedActionsEnum.UNMUTE_USER,
  data: {
    list
  }
});

export const clearMutedUsers = (): ClearMutedUsersAction => ({
  type: MutedActionsEnum.CLEAR_MUTED_USER,
  data: {}
});

export const clearMutedChannels = (): ClearMutedChannelsAction => ({
  type: MutedActionsEnum.CLEAR_MUTED_CHANNEL,
  data: {}
});
