import { Reducer } from 'redux';
import channelsReducerMock from './mock';
import { Channel, ChannelEntry, ChannelsAction, ChannelsActionsEnum, ChannelSettings, ChannelsState } from './types';

export const initialState: ChannelsState = __DEMO__ ? channelsReducerMock : {
  joined: [],
  recent: [],
  entries: {}
};

export const channels: Reducer<ChannelsState, ChannelsAction> = (state = initialState, action) => {
  switch (action.type) {

  case ChannelsActionsEnum.ADD_CHANNELS:
    return {
      ...state,
      entries: {
        ...state.entries,
        ...newChannels(action.data.channels)
      }
    };

  case ChannelsActionsEnum.REMOVE_CHANNELS:
    return removeChannels(state, action.data.ids);

  case ChannelsActionsEnum.MODIFY_CHANNEL:
    return {
      ...state,
      entries: modifyChannel(state, action.data)
    };

  case ChannelsActionsEnum.MODIFY_CHANNEL_SETTINGS:
    return {
      ...state,
      entries: modifyChannelSettings(state, action.data.id, action.data.settings)
    };

  case ChannelsActionsEnum.ADD_CHANNEL_PARTICIPANTS:
    return {
      ...state,
      entries: {
        ...state.entries,
        [ action.data.id ]: {
          ...state.entries[ action.data.id ],
          participants: [
            ...state.entries[ action.data.id ].participants,
            ...action.data.participants
          ]
        }
      }
    };

  case ChannelsActionsEnum.REMOVE_CHANNEL_PARTICIPANTS:
    return {
      ...state,
      entries: {
        ...state.entries,
        [ action.data.id ]: {
          ...state.entries[ action.data.id ],
          participants: [
            ...state.entries[ action.data.id ].participants
          ].filter(pc => !action.data.participants.includes(pc))
        }
      }
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
          messages: [
            ...state.entries[ action.data.id ].messages
          ].filter(ms => !action.data.messages.includes(ms))
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

  case ChannelsActionsEnum.CLEAR_CHANNELS:
    return initialState;

  case ChannelsActionsEnum.ADD_CHANNEL_TO_RECENT:
    return {
      ...state,
      recent: [ ...state.recent, action.data.id ]
    };

  case ChannelsActionsEnum.CLEAR_RECENT_CHANNELS:
    return {
      ...state,
      recent: []
    };

  case ChannelsActionsEnum.ADD_CHANNEL_TO_JOINED:
    return {
      ...state,
      joined: [ ...state.joined, action.data.id ]
    };

  case ChannelsActionsEnum.REMOVE_CHANNEL_FROM_JOINED:
    return {
      ...state,
      joined: [ ...state.joined ].filter(ch => ch !== action.data.id)
    };

  case ChannelsActionsEnum.CLEAR_JOINED_CHANNELS:
    return {
      ...state,
      joined: []
    };

  default:
    return state;
  }
};

const newChannels = (chns: Channel[]): ChannelEntry => {
  return Object.fromEntries(
    chns.map((ch) => [ ch.id, ch ])
  );
};

const removeChannels = (state: ChannelsState, ids: string[]): ChannelsState => {
  const newEntries = { ...state.entries };

  for (const id of ids) {
    delete newEntries[ id ];
  }

  return {
    recent: [ ...state.recent ].filter(rc => !ids.includes(rc)),
    joined: [ ...state.joined ].filter(jo => !ids.includes(jo)),
    entries: newEntries
  };
};

const modifyChannel = ({ entries }: ChannelsState, properties: { [key: string]: any }): ChannelEntry => {
  const newEntries = { ...entries };

  newEntries[ properties.id ] = {
    ...newEntries[ properties.id ],
    ...properties,
    settings: {
      ...newEntries[ properties.id ].settings,
      ...properties.settings
    }
  };

  return newEntries;
};

const modifyChannelSettings = ({ entries }: ChannelsState, id: string, settings: ChannelSettings): ChannelEntry => {
  const newEntries = { ...entries };

  newEntries[ id ] = {
    ...newEntries[ id ],
    settings: {
      ...newEntries[ id ].settings,
      ...settings
    }
  };

  return newEntries;
};

export default channels;
