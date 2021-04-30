/* eslint-disable no-unused-vars */
import { Action } from 'redux';

export interface ChannelSettings {
  passwordPrompt?: string;
  hasPassword?: boolean;
  backgroundUri?: string
  backgroundOpacity?: number;
  backgroundBlur?: number;
  color?: string;
  blocked?: string;
  limit?: number;
  encrypted?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  avatar: {
    uri: string;
    type: string; // TODO: type
  };
  owner: string;
  createdDate: string;
  isPublic?: boolean;
  settings: ChannelSettings;
  messages: string[];
  lastMessage:{
    id: string;
    content: string;
  };
  participants: string[];
  typing: string[];
}

export type ChannelEntry = {
  [key: string]: Channel
};

export interface ChannelsState {
  joined: string[];
  recent: string[];
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
  CLEAR_JOINED_CHANNELS = 'CLEAR_JOINED_CHANNELS',
}

export interface AddChannels extends Action {
  type: ChannelsActionsEnum.ADD_CHANNELS,
  data: {
    channels: Channel[]
  }
}

export interface RemoveChannels extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNELS,
  data: {
    ids: string[]
  }
}

export interface ModifyChannel extends Action {
  type: ChannelsActionsEnum.MODIFY_CHANNEL,
  data: {
    id: string;
    name?: string;
    description?: string;
    avatar?: {
      uri: string;
      type: string;
    };
    isPublic?: boolean;
    lastMessage?:{
      id: string;
      content: string;
    };
  }
}

export interface ModifyChannelSettings extends Action {
  type: ChannelsActionsEnum.MODIFY_CHANNEL_SETTINGS,
  data: {
    id: string;
    settings: ChannelSettings;
  }
}

export interface AddChannelParticipants extends Action {
  type: ChannelsActionsEnum.ADD_CHANNEL_PARTICIPANTS,
  data: {
    id: string;
    participants: string[];
  }
}

export interface RemoveChannelParticipants extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNEL_PARTICIPANTS,
  data: {
    id: string;
    participants: string[];
  }
}

export interface AddChannelMessages extends Action {
  type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES,
  data: {
    id: string;
    messages: string[];
  }
}

export interface RemoveChannelMessages extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES,
  data: {
    id: string;
    messages: string[];
  }
}

export interface ClearChannelMessages extends Action {
  type: ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES,
  data: {
    id: string;
  }
}

export interface ClearChannels extends Action {
  type: ChannelsActionsEnum.CLEAR_CHANNELS,
  data: {}
}

export interface AddChannelToRecent extends Action {
  type: ChannelsActionsEnum.ADD_CHANNEL_TO_RECENT,
  data: {
    id: string;
  }
}

export interface ClearRecentChannels extends Action {
  type: ChannelsActionsEnum.CLEAR_RECENT_CHANNELS,
  data: {}
}

export interface AddChannelToJoined extends Action {
  type: ChannelsActionsEnum.ADD_CHANNEL_TO_JOINED,
  data: {
    id: string;
  }
}

export interface RemoveChannelFromJoined extends Action {
  type: ChannelsActionsEnum.REMOVE_CHANNEL_FROM_JOINED,
  data: {
    id: string;
  }
}

export interface ClearJoinedChannels extends Action {
  type: ChannelsActionsEnum.CLEAR_JOINED_CHANNELS,
  data: {}
}

export type ChannelsAction = AddChannels | RemoveChannels | ModifyChannel | ModifyChannelSettings
| AddChannelParticipants | RemoveChannelParticipants | AddChannelMessages | RemoveChannelMessages | ClearChannelMessages
| ClearChannels | AddChannelToRecent | ClearRecentChannels | AddChannelToJoined | RemoveChannelFromJoined
| ClearJoinedChannels;
