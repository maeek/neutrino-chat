import { createSelector } from 'reselect';
import { getStoreState } from '@store/index';
import { getContacts } from './contacts';
import { GroupTypeEnum } from '@store/me/groups/types';

export const getFiltersMain = (state = getStoreState()) => state.app.filters.category;

export const getFiltersGroup = (state = getStoreState()) => state.app.filters.group;

export const getFiltersQueries = (state = getStoreState()) => state.app.filters.queries;

export const getGroupByFiltersGroup = (state = getStoreState()) => state.me.groups.entries[state.app.filters.group as string];

export const getFilteredContactsByGroup = createSelector(
  getGroupByFiltersGroup,
  getContacts,
  (group, contacts) => group.items
    .filter((item) => item.type === GroupTypeEnum.CONTACT)
    .map((item) => contacts[item.id])
);

export const getFilteredDMsByGroup = createSelector(
  getGroupByFiltersGroup,
  getContacts,
  (group, contacts) => group.items
    .filter((item) => item.type === GroupTypeEnum.DM)
    .map((item) => contacts[item.id])
);

export const getFilteredChannelsByGroup = createSelector(
  getGroupByFiltersGroup,
  getContacts,
  (group, contacts) => group.items
    .filter((item) => item.type === GroupTypeEnum.CHANNEL)
    .map((item) => contacts[item.id])
);

// TODO: channels reducer
// const queries = {
//   MY_CHANNELS: (user, channels) =>  channels.
// };

export const getFilteredChannelsByQueries = createSelector(
  getFiltersQueries,
  getFilteredContactsByGroup,
  (qs, contacts) => qs.map((q) => contacts.filter((contact) => {
    return contact;
  }))
);

export const getFiltered = createSelector(
  getFilteredContactsByGroup,
  getFilteredDMsByGroup,
  getFilteredChannelsByGroup,
  (contacts, dm, channels) => ({
    contacts, dm, channels
  })
);
