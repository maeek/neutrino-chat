import { Reducer } from 'redux';
import { ClearMe, UserActionsEnum } from '@/store/me/user/types';
import channelsReducerMock from './mock';
import {
  Channel,
  ChannelEntry,
  ChannelsAction,
  ChannelsActionsEnum,
  ChannelsState
} from './types';
import {
  AddMessages,
  MessageTypes,
  MessagesActionsEnum
} from '../messages/types';

export const initialState: ChannelsState = import.meta.env.VITE_DEMO
  ? channelsReducerMock
  : {
    entries: {}
  };

export const channels: Reducer<
  ChannelsState,
  ChannelsAction | ClearMe | AddMessages
> = (state = initialState, action) => {
  const modifiedChannels = {
    ...state.entries
  };

  switch (action.type) {
  case ChannelsActionsEnum.ADD_CHANNELS:
    return {
      ...state,
      entries: {
        ...state.entries,
        ...newChannels(state.entries, action.data.channels)
      }
    };

  case ChannelsActionsEnum.REMOVE_CHANNELS:
    return removeChannels(state, action.data.ids);

  case ChannelsActionsEnum.MODIFY_CHANNEL:
    return {
      ...state,
      entries: modifyChannel(state, action.data)
    };

  case ChannelsActionsEnum.ADD_CHANNEL_MESSAGES:
    return {
      ...state,
      entries: {
        ...state.entries,
        [ action.data.id ]: {
          ...state.entries[ action.data.id ],
          messages: [
            ...state.entries[ action.data.id ].messages,
            ...action.data.messages
          ]
        }
      }
    };

  case ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES:
    return {
      ...state,
      entries: {
        ...state.entries,
        [ action.data.id ]: {
          ...state.entries[ action.data.id ],
          messages: [ ...state.entries[ action.data.id ].messages ].filter(
            (ms) => !action.data.messages.includes(ms)
          )
        }
      }
    };

  case ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES:
    return {
      ...state,
      entries: {
        ...state.entries,
        [ action.data.id ]: {
          ...state.entries[ action.data.id ],
          messages: []
        }
      }
    };

  case UserActionsEnum.CLEAR_ME:
  case ChannelsActionsEnum.CLEAR_CHANNELS:
    return initialState;

  case MessagesActionsEnum.ADD_MESSAGES:
    for (const ms of action.data.messages.filter(
      (m) => m.type === MessageTypes.CHANNEL
    )) {
      modifiedChannels[ ms.parentId ] = {
        ...state.entries[ ms.parentId ],
        messages: [ ...(state.entries[ ms.parentId ].messages || []), ms.uuid ],
        lastMessage: {
          id: ms.uuid,
          content: ms.body || '',
          receivedDate: ms.timeReceived || 0
        }
      };
    }

    return {
      entries: {
        ...modifiedChannels
      }
    };

  default:
    return state;
  }
};

const newChannels = (
  existingChannels: ChannelEntry,
  chns: Channel[]
): ChannelEntry => {
  const newEntries = { ...existingChannels };

  for (const ch of chns) {
    newEntries[ ch.name ] = {
      ...(newEntries[ ch.name ] || {}),
      ...ch,
      messages: newEntries[ ch.name ]?.messages || [],
      owner: ch.users?.[ 0 ] || ''
    };
  }

  return newEntries;
};

const removeChannels = (state: ChannelsState, ids: string[]): ChannelsState => {
  const newEntries = { ...state.entries };

  for (const id of ids) {
    delete newEntries[ id ];
  }

  return {
    entries: newEntries
  };
};

const modifyChannel = (
  { entries }: ChannelsState,
  properties: { [key: string]: any }
): ChannelEntry => {
  const newEntries = { ...entries };

  newEntries[ properties.id ] = {
    ...newEntries[ properties.id ],
    ...properties
  };

  return newEntries;
};

export default channels;
