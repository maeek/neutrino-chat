/* eslint-disable no-unused-vars */
import { Action } from 'redux';

export interface Channel {
  name: string;
  owner: string;
  createdAt: number;
  public?: boolean;
  messages: string[];
  lastMessage: {
    id: string;
    content: string;
    receivedDate: number;
  };
  users?: string[];
  blockedUsers?: string[];
}

export type ChannelEntry = {
  [key: string]: Channel;
};

export interface ChannelsState {
  entries: ChannelEntry;
}

export enum ChannelsActionsEnum {
  ADD_CHANNELS = 'ADD_CHANNELS',
  REMOVE_CHANNELS = 'REMOVE_CHANNELS',
  MODIFY_CHANNEL = 'MODIFY_CHANNEL',
  MODIFY_CHANNEL_SETTINGS = 'MODIFY_CHANNEL_SETTINGS',
  ADD_CHANNEL_PARTICIPANTS = 'ADD_CHANNEL_PARTICIPANTS',
  REMOVE_CHANNEL_PARTICIPANTS = 'REMOVE_CHANNEL_PARTICIPANTS',
  ADD_CHANNEL_MESSAGES = 'ADD_CHANNEL_MESSAGES',
  REMOVE_CHANNEL_MESSAGES = 'REMOVE_CHANNEL_MESSAGES',
  CLEAR_CHANNEL_MESSAGES = 'CLEAR_CHANNEL_MESSAGES',
  CLEAR_CHANNELS = 'CLEAR_CHANNELS',
  ADD_CHANNEL_TO_RECENT = 'ADD_CHANNEL_TO_RECENT',
  CLEAR_RECENT_CHANNELS = 'CLEAR_RECENT_CHANNELS',
  ADD_CHANNEL_TO_JOINED = 'ADD_CHANNEL_TO_JOINED',
  REMOVE_CHANNEL_FROM_JOINED = 'REMOVE_CHANNEL_FROM_JOINED',
  CLEAR_JOINED_CHANNELS = 'CLEAR_JOINED_CHANNELS'
}

export interface AddChannels extends Action {
  type: ChannelsActionsEnum.ADD_CHANNELS;
  data: {
    channels: Channel[];
  };
}

export interface RemoveChannels extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNELS;
  data: {
    ids: string[];
  };
}

export interface ModifyChannel extends Action {
  type: ChannelsActionsEnum.MODIFY_CHANNEL;
  data: {
    id: string;
    name?: string;
    description?: string;
    avatar?: {
      uri: string;
      type: string;
    };
    public?: boolean;
    lastMessage?: {
      id: string;
      content: string;
    };
  };
}

export interface AddChannelParticipants extends Action {
  type: ChannelsActionsEnum.ADD_CHANNEL_PARTICIPANTS;
  data: {
    id: string;
    participants: string[];
  };
}

export interface RemoveChannelParticipants extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNEL_PARTICIPANTS;
  data: {
    id: string;
    participants: string[];
  };
}

export interface AddChannelMessages extends Action {
  type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES;
  data: {
    id: string;
    messages: string[];
  };
}

export interface RemoveChannelMessages extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES;
  data: {
    id: string;
    messages: string[];
  };
}

export interface ClearChannelMessages extends Action {
  type: ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES;
  data: {
    id: string;
  };
}

export interface ClearChannels extends Action {
  type: ChannelsActionsEnum.CLEAR_CHANNELS;
  data: {};
}

export type ChannelsAction =
  | AddChannels
  | RemoveChannels
  | ModifyChannel
  | AddChannelParticipants
  | RemoveChannelParticipants
  | AddChannelMessages
  | RemoveChannelMessages
  | ClearChannelMessages
  | ClearChannels
  | ClearChannels
  | ClearChannels;
