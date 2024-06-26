import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { getUsers } from './users';
import { GroupTypeEnum } from '@/store/me/groups/types';
// import { getChannels } from './channels';
import { Channel } from '@/store/channels/types';
import { User } from '@/store/users/types';

export const getFiltersSearch = (state = getStoreState()) => state.app.filters.search;

export const getFiltersMain = (state = getStoreState()) => state.app.filters.category;

export const getFiltersGroup = (state = getStoreState()) => state.app.filters.group;

export const getFiltersQueries = (state = getStoreState()) => state.app.filters.queries;

export const getGroupByFiltersGroup = (state = getStoreState()) => (
  state.me.groups.entries[ state.app.filters.group as string ]
);

export const getFilteredUsersByGroup = createSelector(
  getGroupByFiltersGroup,
  getUsers,
  (group, users) => {
    console.warn(group, users);
    return group?.items 
      ? group.items
        .filter((item) => item.type === GroupTypeEnum.USER)
        .map((item) => users[ item.id ])
      : Object.values(users);
  }
);

export const USER_SEARCH_EXCLUDE_KEYS: Array<keyof User> = [
  'settings',
  'avatar',
  'lastMessage',
  'blocked',
  'messages',
  'typing'
];

export const getFilteredUsersByQueries = createSelector(
  getUsers,
  getFiltersQueries,
  (users, qs) => Object.values(users).filter((c) => {
    return qs.reduce((_prev: boolean, _, i, arr) => {
      const keys = !arr[ i ].fieldName ? Object.keys(c) : [ arr[ i ].fieldName ];
      const val = arr[ i ].value.trim().toLowerCase();

      return keys
        .filter((k) => !USER_SEARCH_EXCLUDE_KEYS.includes(k as keyof User))
        .map(k => (
          String(c[ k as keyof User ])
            .trim()
            .toLocaleLowerCase()
            .includes(val)
        ))
        .some(v => v);
    }, true);
  })
);

export const getFilteredUsers = createSelector(
  getFilteredUsersByGroup,
  getFilteredUsersByQueries,
  (usersByGroup, usersByQueries) => {
    const uniq = [ ...new Set([ ...usersByGroup, ...usersByQueries ]) ];
    const usernamesInGroups = usersByGroup.filter(Boolean).map((c) => c.id);
    const usernamesInQueries = usersByQueries.filter(Boolean).map((c) => c.id);

    const soretdResults = uniq.filter(
      (c) => usernamesInGroups.includes(c.id) && usernamesInQueries.includes(c.id)
    );

    return soretdResults.sort((a, b) => {
      const nameA = a.id.toUpperCase();
      const nameB = b.id.toUpperCase();

      if (a?.lastMessage?.receivedDate && b?.lastMessage?.receivedDate) {
        return b?.lastMessage?.receivedDate - a?.lastMessage?.receivedDate;
      }

      if (a?.lastMessage?.receivedDate && !b?.lastMessage?.receivedDate) {
        return -1;
      }

      if (!a?.lastMessage?.receivedDate && b?.lastMessage?.receivedDate) {
        return 1;
      }

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }
);

export const getFilteredUsersIds = createSelector(
  getFilteredUsers,
  (users) => users.map(c => c.id)
);

export const getFilteredUsersIdsWithMessages = createSelector(
  getFilteredUsers,
  (users) => users.filter(c => (c.messages || []).length > 0 && c.lastMessage)
    .sort((a, b) => (b.lastMessage?.receivedDate || 0) - (a.lastMessage?.receivedDate || 0))
    .map(c => c.id)
);

export const getFilteredDMsByGroup = createSelector(
  getGroupByFiltersGroup,
  getUsers,
  (group, dms) => group.items
    .filter((item) => item.type === GroupTypeEnum.DM)
    .map((item) => dms[ item.id ])
);

// export const getFilteredChannelsByGroup = createSelector(
//   getGroupByFiltersGroup,
//   getChannels,
//   (group, channels) => group.items
//     .filter((item) => item.type === GroupTypeEnum.CHANNEL)
//     .map((item) => channels[ item.id ])
// );

// export const CHANNEL_SEARCH_EXCLUDE_KEYS: Array<keyof Channel> = [
//   'id',
//   'settings',
//   'avatar',
//   'lastMessage',
//   'isPublic',
//   'messages',
//   'typing',
//   'participants'
// ];

// export const getFilteredChannelsByQueries = createSelector(
//   getChannels,
//   getFiltersQueries,
//   (channels, qs) => Object.values(channels).filter((ch) => {
//     const searchInKeys = Object.keys(ch).filter((k) => !CHANNEL_SEARCH_EXCLUDE_KEYS.includes(k as keyof Channel));
//     return qs.reduce((_prev: boolean, _, i, arr) => {
//       const keys = !arr[ i ].fieldName ? searchInKeys : [ arr[ i ].fieldName ];
//       const val = arr[ i ].value.trim().toLowerCase();

//       return keys
//         .map(k => (
//           String(ch[ k as keyof Channel ])
//             .trim()
//             .toLocaleLowerCase()
//             .includes(val)
//         ))
//         .some(v => v);
//     }, true);
//   })
// );

// export const getFilteredChannels = createSelector(
//   getFilteredChannelsByGroup,
//   getFilteredChannelsByQueries,
//   (channelsByGroup, channelsByQueries) => {
//     const uniq = [ ...new Set([ ...channelsByGroup, ...channelsByQueries ]) ];
//     const idsInGroups = channelsByGroup.map((ch) => ch.id);
//     const idsInQueries = channelsByQueries.map((ch) => ch.id);

//     return uniq.filter(
//       (ch) => idsInGroups.includes(ch.id) && idsInQueries.includes(ch.id)
//     );
//   }
// );

export const getFiltered = createSelector(
  getFilteredUsersByGroup,
  getFilteredDMsByGroup,
  // getFilteredChannelsByGroup,
  (users, dm) => ({
    users, dm
  })
);
