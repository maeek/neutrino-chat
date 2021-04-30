import { createSelector } from 'reselect';
import { getStoreState } from '../store';

export const getMuted = (state = getStoreState()) => state.settings.muted;
export const getMutedUsers = (state = getStoreState()) => state.settings.muted.users;
export const getMutedChannels = (state = getStoreState()) => state.settings.muted.channels;

export const checkIfUserIsMuted = (user: string) => createSelector(getMutedUsers, (users) => users.includes(user));
export const checkIfChannelIsMuted = (channel: string) => createSelector(getMutedChannels, (channels) => channels.includes(channel));
