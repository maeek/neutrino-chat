import mutedReducer from '.';
import {
  clearMutedChannels,
  clearMutedUsers,
  muteChannel,
  muteUser,
  unmuteChannel,
  unmuteUser
} from './actions';
import { checkIfChannelIsMuted, checkIfUserIsMuted, getMuted, getMutedChannels, getMutedUsers } from './selectors';
import
{ AddMutedChannelAction,
  AddMutedUserAction,
  ClearMutedChannelsAction,
  ClearMutedUsersAction,
  MutedActionsEnum, MutedActionTypes, MutedState, RemoveMutedUserAction } from './types';

describe('Redux store - Settings/Muted', () => {
  describe('Actions', () => {
    it('should create an action to mute users', () => {
      const expectedAction = {
        type: MutedActionsEnum.MUTE_USER,
        data: {
          list: ['user1', 'user2']
        }
      };
      expect(muteUser(['user1', 'user2'])).toEqual(expectedAction);
    });

    it('should create an action to mute channels', () => {
      const expectedAction = {
        type: MutedActionsEnum.MUTE_CHANNEL,
        data: {
          list: ['channel1', 'channel2']
        }
      };
      expect(muteChannel(['channel1', 'channel2'])).toEqual(expectedAction);
    });

    it('should create an action to unmute users', () => {
      const expectedAction = {
        type: MutedActionsEnum.UNMUTE_USER,
        data: {
          list: ['user1', 'user2']
        }
      };
      expect(unmuteUser(['user1', 'user2'])).toEqual(expectedAction);
    });

    it('should create an action to unmute channels', () => {
      const expectedAction = {
        type: MutedActionsEnum.UNMUTE_CHANNEL,
        data: {
          list: ['channels1', 'channels2']
        }
      };
      expect(unmuteChannel(['channels1', 'channels2'])).toEqual(expectedAction);
    });

    it('should create an action to clear muted channels', () => {
      const expectedAction = {
        type: MutedActionsEnum.CLEAR_MUTED_CHANNEL,
        data: {}
      };
      expect(clearMutedChannels()).toEqual(expectedAction);
    });

    it('should create an action to clear muted users', () => {
      const expectedAction = {
        type: MutedActionsEnum.CLEAR_MUTED_USER,
        data: {}
      };
      expect(clearMutedUsers()).toEqual(expectedAction);
    });
  });

  describe('Reducer', () => {
    it('should initialize default state', () => {
      expect(
        mutedReducer(undefined, {} as MutedActionTypes)
      ).toEqual({
        users: [],
        channels: []
      });
    });

    it('should handle MUTE_USER', () => {
      const addMutedUser: AddMutedUserAction = {
        type: MutedActionsEnum.MUTE_USER,
        data: {
          list: ['user1', 'user2']
        }
      };

      expect(
        mutedReducer(undefined, addMutedUser)
      ).toEqual({
        users: ['user1', 'user2'],
        channels: []
      });
    });

    it('should handle MUTE_CHANNEL', () => {
      const addMutedUser: AddMutedChannelAction = {
        type: MutedActionsEnum.MUTE_CHANNEL,
        data: {
          list: ['channel1', 'channel2']
        }
      };

      expect(
        mutedReducer(undefined, addMutedUser)
      ).toEqual({
        channels: ['channel1', 'channel2'],
        users: []
      });
    });

    it('should handle UNMUTE_USER', () => {
      const unmuteUsersAction: RemoveMutedUserAction = {
        type: MutedActionsEnum.UNMUTE_USER,
        data: {
          list: ['user1']
        }
      };

      const initState: MutedState = {
        users: ['user1', 'user2'],
        channels: []
      };

      expect(
        mutedReducer(initState, unmuteUsersAction)
      ).toEqual({
        users: ['user2'],
        channels: []
      });
    });

    it('should handle UNMUTE_CHANNEL', () => {
      const unmuteUsersAction: RemoveMutedUserAction = {
        type: MutedActionsEnum.UNMUTE_CHANNEL,
        data: {
          list: ['channel2']
        }
      };

      const initState: MutedState = {
        users: ['user1', 'user2'],
        channels: ['channel1', 'channel2']
      };

      expect(
        mutedReducer(initState, unmuteUsersAction)
      ).toEqual({
        users: ['user1', 'user2'],
        channels: ['channel1']
      });
    });

    it('should handle CLEAR_MUTED_USER', () => {
      const clearMutedUsersAction: ClearMutedUsersAction = {
        type: MutedActionsEnum.CLEAR_MUTED_USER,
        data: {}
      };

      const initState: MutedState = {
        users: ['user1', 'user2'],
        channels: []
      };

      expect(
        mutedReducer(initState, clearMutedUsersAction)
      ).toEqual({
        users: [],
        channels: []
      });
    });

    it('should handle CLEAR_MUTED_CHANNEL', () => {
      const clearMutedChannelsAction: ClearMutedChannelsAction = {
        type: MutedActionsEnum.CLEAR_MUTED_CHANNEL,
        data: {}
      };

      const initState: MutedState = {
        users: [],
        channels: ['channel1', 'channel2']
      };

      expect(
        mutedReducer(initState, clearMutedChannelsAction)
      ).toEqual({
        users: [],
        channels: []
      });
    });
  });

  describe('Selectors', () => {
    const globalStateMock = {
      settings: {
        muted: {
          users: ['user1', 'user2'],
          channels: ['channel1', 'channel2', 'channel3']
        }
      }
    };

    it('getMuted should return all muted users and channels', () => {
      const muted = getMuted(globalStateMock as any);
      expect(muted).toEqual(globalStateMock.settings.muted);
    });
    it('getMutedUsers should return muted users', () => {
      const muted = getMutedUsers(globalStateMock as any);
      expect(muted).toEqual(globalStateMock.settings.muted.users);
    });

    it('getMutedChannels should return muted channels', () => {
      const muted = getMutedChannels(globalStateMock as any);
      expect(muted).toEqual(globalStateMock.settings.muted.channels);
    });

    it('checkIfUserIsMuted should return true if user is muted', () => {
      const muted = checkIfUserIsMuted('user2', globalStateMock as any);
      expect(muted).toBeTruthy();
    });

    it('checkIfChannelIsMuted should return true if user is muted', () => {
      const muted = checkIfChannelIsMuted('channel3', globalStateMock as any);
      expect(muted).toBeTruthy();
    });
  });
});