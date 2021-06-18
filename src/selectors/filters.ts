import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { getContacts } from './contacts';
import { GroupTypeEnum } from '@/store/me/groups/types';
import { getChannels } from './channels';
import { Contact } from '@/store/me/contacts/types';
import { Channel } from '@/store/channels/types';

export const getFiltersSearch = (state = getStoreState()) => state.app.filters.search;

export const getFiltersMain = (state = getStoreState()) => state.app.filters.category;

export const getFiltersGroup = (state = getStoreState()) => state.app.filters.group;

export const getFiltersQueries = (state = getStoreState()) => state.app.filters.queries;

export const getGroupByFiltersGroup = (state = getStoreState()) => (
  state.me.groups.entries[ state.app.filters.group as string ]
);

export const getFilteredContactsByGroup = createSelector(
  getGroupByFiltersGroup,
  getContacts,
  (group, contacts) => {
    return group?.items 
      ? group.items
        .filter((item) => item.type === GroupTypeEnum.CONTACT)
        .map((item) => contacts[ item.id ])
      : Object.values(contacts);
  }
);

export const getFilteredContactsByQueries = createSelector(
  getContacts,
  getFiltersQueries,
  (contacts, qs) => Object.values(contacts).filter((c) => {
    return qs.reduce((_prev: boolean, _, i, arr) => {
      const keys = !arr[ i ].fieldName ? Object.keys(c) : [ arr[ i ].fieldName ];
      const val = arr[ i ].value.trim().toLowerCase();

      return keys
        .map(k => (
          String(c[ k as keyof Contact ])
            .trim()
            .toLocaleLowerCase()
            .includes(val)
        ))
        .some(v => v);
    }, true);
  })
);

export const getFilteredContacts = createSelector(
  getFilteredContactsByGroup,
  getFilteredContactsByQueries,
  (contactsByGroup, contactsByQueries) => {
    const uniq = [ ...new Set([ ...contactsByGroup, ...contactsByQueries ]) ];
    const usernamesInGroups = contactsByGroup.map((c) => c.username);
    const usernamesInQueries = contactsByQueries.map((c) => c.username);

    return uniq.filter(
      (c) => usernamesInGroups.includes(c.username) && usernamesInQueries.includes(c.username)
    );
  }
);

export const getFilteredContactsIds = createSelector(
  getFilteredContacts,
  (contacts) => contacts.map(c => c.username)
);

export const getFilteredDMsByGroup = createSelector(
  getGroupByFiltersGroup,
  getContacts,
  (group, dms) => group.items
    .filter((item) => item.type === GroupTypeEnum.DM)
    .map((item) => dms[ item.id ])
);

export const getFilteredChannelsByGroup = createSelector(
  getGroupByFiltersGroup,
  getChannels,
  (group, channels) => group.items
    .filter((item) => item.type === GroupTypeEnum.CHANNEL)
    .map((item) => channels[ item.id ])
);

export const CHANNEL_SEARCH_EXCLUDE_KEYS: Array<keyof Channel> = [
  'id',
  'settings',
  'avatar',
  'lastMessage',
  'isPublic',
  'messages',
  'typing',
  'participants'
];

export const getFilteredChannelsByQueries = createSelector(
  getChannels,
  getFiltersQueries,
  (channels, qs) => Object.values(channels).filter((ch) => {
    const searchInKeys = Object.keys(ch).filter((k) => !CHANNEL_SEARCH_EXCLUDE_KEYS.includes(k as keyof Channel));
    return qs.reduce((_prev: boolean, _, i, arr) => {
      const keys = !arr[ i ].fieldName ? searchInKeys : [ arr[ i ].fieldName ];
      const val = arr[ i ].value.trim().toLowerCase();

      return keys
        .map(k => (
          String(ch[ k as keyof Channel ])
            .trim()
            .toLocaleLowerCase()
            .includes(val)
        ))
        .some(v => v);
    }, true);
  })
);

export const getFilteredChannels = createSelector(
  getFilteredChannelsByGroup,
  getFilteredChannelsByQueries,
  (channelsByGroup, channelsByQueries) => {
    const uniq = [ ...new Set([ ...channelsByGroup, ...channelsByQueries ]) ];
    const idsInGroups = channelsByGroup.map((ch) => ch.id);
    const idsInQueries = channelsByQueries.map((ch) => ch.id);

    return uniq.filter(
      (ch) => idsInGroups.includes(ch.id) && idsInQueries.includes(ch.id)
    );
  }
);

export const getFiltered = createSelector(
  getFilteredContactsByGroup,
  getFilteredDMsByGroup,
  getFilteredChannelsByGroup,
  (contacts, dm, channels) => ({
    contacts, dm, channels
  })
);
