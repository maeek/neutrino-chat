import { ActionCreator } from 'redux';
import { AddChannels, ChannelsActionsEnum, Channel, RemoveChannels, ModifyChannel, ModifyChannelSettings, AddChannelParticipants, RemoveChannelParticipants, AddChannelMessages, RemoveChannelMessages, ClearChannelMessages, ClearChannels, AddChannelToRecent, ClearRecentChannels, AddChannelToJoined, RemoveChannelFromJoined, ClearJoinedChannels } from './types';

export const addChannels: ActionCreator<AddChannels> = (channels: Channel[]) => ({
  type: ChannelsActionsEnum.ADD_CHANNELS,
  data: {
    channels
  }
});

export const removeChannels: ActionCreator<RemoveChannels> = (ids: string[]) => ({
  type: ChannelsActionsEnum.REMOVE_CHANNELS,
  data: {
    ids
  }
});

export const modifyChannel: ActionCreator<ModifyChannel> = (id: string, channel) => ({
  type: ChannelsActionsEnum.MODIFY_CHANNEL,
  data: {
    id,
    ...channel
  }
});

export const modifyChannelSettings: ActionCreator<ModifyChannelSettings> = (id: string, settings) => ({
  type: ChannelsActionsEnum.MODIFY_CHANNEL_SETTINGS,
  data: {
    id,
    settings
  }
});

export const addChannelParticipants: ActionCreator<AddChannelParticipants> = (id: string, participants: string[]) => ({
  type: ChannelsActionsEnum.ADD_CHANNEL_PARTICIPANTS,
  data: {
    id,
    participants
  }
});

export const removeChannelParticipants: ActionCreator<RemoveChannelParticipants> = (id: string, participants: string[]) => ({
  type: ChannelsActionsEnum.REMOVE_CHANNEL_PARTICIPANTS,
  data: {
    id,
    participants
  }
});

export const addChannelMessages: ActionCreator<AddChannelMessages> = (id: string, messages: string[]) => ({
  type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES,
  data: {
    id,
    messages
  }
});

export const removeChannelMessages: ActionCreator<RemoveChannelMessages> = (id: string, messages: string[]) => ({
  type: ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES,
  data: {
    id,
    messages
  }
});

export const clearChannelMessages: ActionCreator<ClearChannelMessages> = (id: string) => ({
  type: ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES,
  data: {
    id
  }
});

export const clearChannels: ActionCreator<ClearChannels> = () => ({
  type: ChannelsActionsEnum.CLEAR_CHANNELS,
  data: {}
});

export const addChannelToRecent: ActionCreator<AddChannelToRecent> = (id: string) => ({
  type: ChannelsActionsEnum.ADD_CHANNEL_TO_RECENT,
  data: {
    id
  }
});

export const clearRecentChannels: ActionCreator<ClearRecentChannels> = () => ({
  type: ChannelsActionsEnum.CLEAR_RECENT_CHANNELS,
  data: {}
});

export const addChannelToJoined: ActionCreator<AddChannelToJoined> = (id: string) => ({
  type: ChannelsActionsEnum.ADD_CHANNEL_TO_JOINED,
  data: {
    id
  }
});

export const removeChannelFromJoined: ActionCreator<RemoveChannelFromJoined> = (id: string) => ({
  type: ChannelsActionsEnum.REMOVE_CHANNEL_FROM_JOINED,
  data: {
    id
  }
});

export const clearJoinedChannels: ActionCreator<ClearJoinedChannels> = () => ({
  type: ChannelsActionsEnum.CLEAR_JOINED_CHANNELS,
  data: {}
});

