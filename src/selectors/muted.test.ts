import { getMuted, getMutedUsers, getMutedChannels, checkIfUserIsMuted, checkIfChannelIsMuted } from './muted';

describe('Muted', () => {
  const globalStateMock = {
    settings: {
      muted: {
        users: [ 'user1', 'user2' ],
        channels: [ 'channel1', 'channel2', 'channel3' ]
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
    const muted = checkIfUserIsMuted('user2');
    expect(muted).toBeTruthy();
  });

  it('checkIfChannelIsMuted should return true if user is muted', () => {
    const muted = checkIfChannelIsMuted('channel3');
    expect(muted).toBeTruthy();
  });
});
