import channelsReducer from '.';
import {
  addChannelMessages,
  addChannelParticipants,
  addChannels,
  addChannelToJoined,
  addChannelToRecent,
  clearChannelMessages,
  clearChannels,
  clearJoinedChannels,
  clearRecentChannels,
  modifyChannel,
  modifyChannelSettings,
  removeChannelFromJoined,
  removeChannelMessages,
  removeChannelParticipants,
  removeChannels
} from './actions';
import channelsReducerMock from './mock';
import {
  AddChannelMessages,
  AddChannelParticipants,
  AddChannels,
  AddChannelToJoined,
  AddChannelToRecent,
  ChannelsAction,
  ChannelsActionsEnum,
  ClearChannelMessages,
  ClearChannels,
  ClearJoinedChannels,
  ClearRecentChannels,
  ModifyChannel,
  ModifyChannelSettings,
  RemoveChannelFromJoined,
  RemoveChannelMessages,
  RemoveChannelParticipants,
  RemoveChannels
} from './types';

describe('Redux store - Channels', () => {
  describe('Actions', () => {
    it('should create an action to add channel', () => {
      const channels = Object.values(channelsReducerMock.entries);

      const expectedAction = {
        type: ChannelsActionsEnum.ADD_CHANNELS,
        data: {
          channels
        }
      };
      expect(addChannels(channels)).toEqual(expectedAction);
    });

    it('should create an action to remove channel', () => {
      const ids = channelsReducerMock.joined;

      const expectedAction = {
        type: ChannelsActionsEnum.REMOVE_CHANNELS,
        data: {
          ids
        }
      };
      expect(removeChannels(ids)).toEqual(expectedAction);
    });

    it('should create an action to modify channel', () => {
      const id =  '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const channel = {
        name: 'rename channel',
        description: 'test'
      };

      const expectedAction = {
        type: ChannelsActionsEnum.MODIFY_CHANNEL,
        data: {
          id,
          ...channel
        }
      };
      expect(modifyChannel(id, channel)).toEqual(expectedAction);
    });

    it('should create an action to modify channel settings', () => {
      const id =  '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const settings = {
        passwordPrompt: '',
        hasPassword: false
      };

      const expectedAction = {
        type: ChannelsActionsEnum.MODIFY_CHANNEL_SETTINGS,
        data: {
          id,
          settings
        }
      };
      expect(modifyChannelSettings(id, settings)).toEqual(expectedAction);
    });

    it('should create an action to add participants to a channel', () => {
      const id = 'AABC';
      const participants = [ '123', '321' ];

      const expectedAction = {
        type: ChannelsActionsEnum.ADD_CHANNEL_PARTICIPANTS,
        data: {
          id,
          participants
        }
      };
      expect(addChannelParticipants(id, participants)).toEqual(expectedAction);
    });

    it('should create an action to add participants to a channel', () => {
      const id = 'AABC';
      const participants = [ '123', '321' ];

      const expectedAction = {
        type: ChannelsActionsEnum.REMOVE_CHANNEL_PARTICIPANTS,
        data: {
          id,
          participants
        }
      };
      expect(removeChannelParticipants(id, participants)).toEqual(expectedAction);
    });

    it('should create an action to add messages to a channel', () => {
      const id = 'AABC';
      const messages = [ '123', '321' ];

      const expectedAction = {
        type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES,
        data: {
          id,
          messages
        }
      };
      expect(addChannelMessages(id, messages)).toEqual(expectedAction);
    });

    it('should create an action to add messages to a channel', () => {
      const id = 'AABC';
      const messages = [ '123', '321' ];

      const expectedAction = {
        type: ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES,
        data: {
          id,
          messages
        }
      };
      expect(removeChannelMessages(id, messages)).toEqual(expectedAction);
    });

    it('should create an action to clear messages to a channel', () => {
      const id = 'AABC';

      const expectedAction = {
        type: ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES,
        data: {
          id
        }
      };
      expect(clearChannelMessages(id)).toEqual(expectedAction);
    });

    it('should create an action to clear channels', () => {
      const expectedAction = {
        type: ChannelsActionsEnum.CLEAR_CHANNELS,
        data: {}
      };
      expect(clearChannels()).toEqual(expectedAction);
    });

    it('should create an action to add channel to recent', () => {
      const id = 'AABC';

      const expectedAction = {
        type: ChannelsActionsEnum.ADD_CHANNEL_TO_RECENT,
        data: {
          id
        }
      };
      expect(addChannelToRecent(id)).toEqual(expectedAction);
    });

    it('should create an action to clear recent channels', () => {
      const expectedAction = {
        type: ChannelsActionsEnum.CLEAR_RECENT_CHANNELS,
        data: {}
      };
      expect(clearRecentChannels()).toEqual(expectedAction);
    });

    it('should create an action to add channel to joined', () => {
      const id = 'AABC';

      const expectedAction = {
        type: ChannelsActionsEnum.ADD_CHANNEL_TO_JOINED,
        data: {
          id
        }
      };
      expect(addChannelToJoined(id)).toEqual(expectedAction);
    });

    it('should create an action to remove channel to joined', () => {
      const id = 'AABC';

      const expectedAction = {
        type: ChannelsActionsEnum.REMOVE_CHANNEL_FROM_JOINED,
        data: {
          id
        }
      };
      expect(removeChannelFromJoined(id)).toEqual(expectedAction);
    });

    it('should create an action to clear joined channels', () => {
      const expectedAction = {
        type: ChannelsActionsEnum.CLEAR_JOINED_CHANNELS,
        data: {}
      };
      expect(clearJoinedChannels()).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        channelsReducer(undefined, {} as ChannelsAction)
      ).toEqual({
        joined: [],
        recent: [],
        entries: {}
      });
    });

    it('should handle ADD_CHANNELS', () => {
      const channelsObj = channelsReducerMock.entries;
      const channels = Object.values(channelsObj);

      const action: AddChannels = {
        type: ChannelsActionsEnum.ADD_CHANNELS,
        data: {
          channels
        }
      };

      expect(channelsReducer(undefined, action)).toEqual({
        joined: [],
        recent: [],
        entries: {
          ...channelsObj
        }
      });
    });

    it('should handle REMOVE_CHANNELS', () => {
      const channelsObj = channelsReducerMock.entries;
      const ids = Object.values(channelsObj).map(ch => ch.id);

      const action: RemoveChannels = {
        type: ChannelsActionsEnum.REMOVE_CHANNELS,
        data: {
          ids
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        joined: [],
        recent: [],
        entries: {}
      });
    });

    it('should handle MODIFY_CHANNEL', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const channel = {
        name: 'newName'
      };

      const action: ModifyChannel = {
        type: ChannelsActionsEnum.MODIFY_CHANNEL,
        data: {
          id,
          ...channel
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            ...channel
          }
        }
      });
    });

    it('should handle MODIFY_CHANNEL_SETTINGS', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const settings = {
        limit: 10
      };

      const action: ModifyChannelSettings = {
        type: ChannelsActionsEnum.MODIFY_CHANNEL_SETTINGS,
        data: {
          id,
          settings
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            settings: {
              ...channelsReducerMock.entries[ id ].settings,
              ...settings
            }
          }
        }
      });
    });

    it('should handle ADD_CHANNEL_PARTICIPANTS', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const participants = [ '123', '321' ];

      const action: AddChannelParticipants = {
        type: ChannelsActionsEnum.ADD_CHANNEL_PARTICIPANTS,
        data: {
          id,
          participants
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            participants: [
              ...channelsReducerMock.entries[ id ].participants,
              ...participants
            ]
          }
        }
      });
    });

    it('should handle REMOVE_CHANNEL_PARTICIPANTS', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const participants = [ '123', '321' ];

      const action: RemoveChannelParticipants = {
        type: ChannelsActionsEnum.REMOVE_CHANNEL_PARTICIPANTS,
        data: {
          id,
          participants
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            participants: [ ...channelsReducerMock.entries[ id ].participants ].filter(p => !participants.includes(p))
          }
        }
      });
    });

    it('should handle ADD_CHANNEL_MESSAGES', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const messages = [ '123', '321' ];

      const action: AddChannelMessages = {
        type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES,
        data: {
          id,
          messages
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            messages: [
              ...channelsReducerMock.entries[ id ].messages,
              ...messages
            ]
          }
        }
      });
    });

    it('should handle REMOVE_CHANNEL_MESSAGES', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const messages = [ '123', '321' ];

      const action: RemoveChannelMessages = {
        type: ChannelsActionsEnum.REMOVE_CHANNEL_MESSAGES,
        data: {
          id,
          messages
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            messages: [ ...channelsReducerMock.entries[ id ].messages ].filter(p => !messages.includes(p))
          }
        }
      });
    });

    it('should handle CLEAR_CHANNEL_MESSAGES', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';

      const action: ClearChannelMessages = {
        type: ChannelsActionsEnum.CLEAR_CHANNEL_MESSAGES,
        data: {
          id
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            messages: []
          }
        }
      });
    });

    it('should handle CLEAR_CHANNELS', () => {
      const action: ClearChannels = {
        type: ChannelsActionsEnum.CLEAR_CHANNELS,
        data: {}
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        joined: [],
        recent: [],
        entries: {}
      });
    });

    it('should handle ADD_CHANNEL_TO_RECENT', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';

      const action: AddChannelToRecent = {
        type: ChannelsActionsEnum.ADD_CHANNEL_TO_RECENT,
        data: {
          id
        }
      };

      expect(channelsReducer(undefined, action)).toEqual({
        joined: [],
        recent: [ id ],
        entries: {}
      });
    });

    it('should handle CLEAR_RECENT_CHANNELS', () => {
      const action: ClearRecentChannels = {
        type: ChannelsActionsEnum.CLEAR_RECENT_CHANNELS,
        data: {}
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        recent: []
      });
    });

    it('should handle ADD_CHANNEL_MESSAGES', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';
      const messages = [ '123', '321' ];

      const action: AddChannelMessages = {
        type: ChannelsActionsEnum.ADD_CHANNEL_MESSAGES,
        data: {
          id,
          messages
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        entries: {
          ...channelsReducerMock.entries,
          [ id ]: {
            ...channelsReducerMock.entries[ id ],
            messages: [
              ...channelsReducerMock.entries[ id ].messages,
              ...messages
            ]
          }
        }
      });
    });

    it('should handle ADD_CHANNEL_TO_JOINED', () => {
      const id = 'e5be511d-6f8b-42bc-b948-90354fe103dc';

      const action: AddChannelToJoined = {
        type: ChannelsActionsEnum.ADD_CHANNEL_TO_JOINED,
        data: {
          id
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        joined: [
          ...channelsReducerMock.joined,
          id
        ]
      });
    });

    it('should handle REMOVE_CHANNEL_FROM_JOINED', () => {
      const id = '0f717b7f-fbf8-47a7-ae8c-778d8889406a';

      const action: RemoveChannelFromJoined = {
        type: ChannelsActionsEnum.REMOVE_CHANNEL_FROM_JOINED,
        data: {
          id
        }
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        joined: [
          ...channelsReducerMock.joined
        ].filter(chid => chid !== id)
      });
    });

    it('should handle CLEAR_JOINED_CHANNELS', () => {
      const action: ClearJoinedChannels = {
        type: ChannelsActionsEnum.CLEAR_JOINED_CHANNELS,
        data: {}
      };

      expect(channelsReducer(channelsReducerMock, action)).toEqual({
        ...channelsReducerMock,
        joined: []
      });
    });
  });
});
