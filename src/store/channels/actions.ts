import { ActionCreator } from 'redux';
import {
  AddChannels,
  ChannelsActionsEnum,
  Channel,
  RemoveChannels,
  ModifyChannel,
  AddChannelMessages,
  RemoveChannelMessages,
  ClearChannelMessages,
  ClearChannels
} from './types';

export const addChannels: ActionCreator<AddChannels> = (
  channels: Channel[]
) => ({
  type: ChannelsActionsEnum.ADD_CHANNELS,
  data: {
    channels
  }
});

export const removeChannels: ActionCreator<RemoveChannels> = (
  ids: string[]
) => ({
  type: ChannelsActionsEnum.REMOVE_CHANNELS,
  data: {
    ids
  }
});

export const modifyChannel: ActionCreator<ModifyChannel> = (
  id: string,
  channel
) => ({
  type: ChannelsActionsEnum.MODIFY_CHANNEL,
  data: {
    id,
    ...channel
  }
});

export const addChannelMessages: ActionCreator<AddChannelMessages> = (
  id: string,
  messages: string[]
) => ({
  type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES,
  data: {
    id,
    messages
  }
});

export const removeChannelMessages: ActionCreator<RemoveChannelMessages> = (
  id: string,
  messages: string[]
) => ({
  type: ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES,
  data: {
    id,
    messages
  }
});

export const clearChannelMessages: ActionCreator<ClearChannelMessages> = (
  id: string
) => ({
  type: ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES,
  data: {
    id
  }
});

export const clearChannels: ActionCreator<ClearChannels> = () => ({
  type: ChannelsActionsEnum.CLEAR_CHANNELS,
  data: {}
});
