import { getStoreState } from '@/store';

export const getChannels = (state = getStoreState()) => state.channels.entries;

export const getChannelById = (id: string, state = getStoreState()) => state.channels.entries[id];

export const getChannelsByName = (name: string, state = getStoreState()) => Object.values(state.channels.entries)
  .filter(ch => ch.name.includes(name));

export const getChannelsByOwner = (owner: string, state = getStoreState()) => Object.values(state.channels.entries)
  .filter(ch => ch.owner === owner);

export const getChannelsPublic = (state = getStoreState()) => Object.values(state.channels.entries)
  .filter(ch => ch.isPublic);

export const getChannelsRecent = (state = getStoreState()) => state.channels.recent
  .map(ch => state.channels.entries[ch]);

export const getChannelsJoined = (state = getStoreState()) => state.channels.joined
  .map(ch => state.channels.entries[ch]);
