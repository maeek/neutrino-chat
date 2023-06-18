import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { getUsers } from './users';
// import { getChannels } from './channels';
import { Channel } from '@/store/channels/types';
import { User } from '@/store/users/types';
import { getChannels } from './channels';
import { MessageTypes } from '@/store/messages/types';

export const getFiltersSearch = (state = getStoreState()) =>
  state.app.filters.search;

export const getFiltersMain = (state = getStoreState()) =>
  state.app.filters.category;

export const getFiltersGroup = (state = getStoreState()) =>
  state.app.filters.group;

export const getFiltersQueries = (state = getStoreState()) =>
  state.app.filters.queries;

export const getFilteredUsersByGroup = createSelector(getUsers, (users) => {
  return Object.values(users);
});

export const USER_SEARCH_EXCLUDE_KEYS: Array<keyof User> = [
  'avatar',
  'lastMessage',
  'muted',
  'messages'
];

export const getFilteredUsersByQueries = createSelector(
  getUsers,
  getFiltersQueries,
  (users, qs) =>
    Object.values(users).filter((c) => {
      return qs.reduce((_prev: boolean, _, i, arr) => {
        const keys = !arr[ i ].fieldName ? Object.keys(c) : [ arr[ i ].fieldName ];
        const val = arr[ i ].value.trim().toLowerCase();

        return keys
          .filter((k) => !USER_SEARCH_EXCLUDE_KEYS.includes(k as keyof User))
          .map((k) =>
            String(c[ k as keyof User ])
              ?.trim()
              ?.toLocaleLowerCase()
              ?.includes(val)
          )
          .some((v) => v);
      }, true);
    })
);

export const getFilteredUsers = createSelector(
  getFilteredUsersByGroup,
  getFilteredUsersByQueries,
  getFiltersSearch,
  (usersByGroup, usersByQueries, searchString) => {
    const uniq = [ ...new Set([ ...usersByGroup, ...usersByQueries ]) ];
    const usernamesInGroups = usersByGroup.filter(Boolean).map((c) => c.id);
    const usernamesInQueries = usersByQueries.filter(Boolean).map((c) => c.id);

    const sortedResults = uniq.filter(
      (c) =>
        usernamesInGroups.includes(c?.id) &&
        usernamesInQueries.includes(c?.id) &&
        c?.id?.toLocaleLowerCase().includes(searchString?.toLocaleLowerCase())
    );

    return sortedResults.sort((a, b) => {
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

export const getFilteredUsersIds = createSelector(getFilteredUsers, (users) =>
  users.map((c) => c.id)
);

export const getFilteredUsersIdsWithMessages = createSelector(
  getFilteredUsers,
  (users) =>
    users
      .filter((c) => (c.messages || []).length > 0 && c.lastMessage)
      .sort(
        (a, b) =>
          (b.lastMessage?.receivedDate || 0) -
          (a.lastMessage?.receivedDate || 0)
      )
      .map((c) => c.id)
);

export const getFilteredDMsByGroup = createSelector(getUsers, (dms) =>
  Object.values(dms)
);

// export const getFilteredChannelsByGroup = createSelector(
//   getGroupByFiltersGroup,
//   getChannels,
//   (group, channels) => group.items
//     .filter((item) => item.type === GroupTypeEnum.CHANNEL)
//     .map((item) => channels[ item.id ])
// );

export const CHANNEL_SEARCH_EXCLUDE_KEYS: Array<keyof Channel> = [
  'blockedUsers',
  'lastMessage',
  'public',
  'messages',
  'lastMessage',
  'users'
];

export const getFilteredChannelsByQueries = createSelector(
  getChannels,
  getFiltersQueries,
  (channels, qs) =>
    Object.values(channels).filter((ch) => {
      const searchInKeys = Object.keys(ch).filter(
        (k) => !CHANNEL_SEARCH_EXCLUDE_KEYS.includes(k as keyof Channel)
      );
      return qs.reduce((_prev: boolean, _, i, arr) => {
        const keys = !arr[ i ].fieldName ? searchInKeys : [ arr[ i ].fieldName ];
        const val = arr[ i ].value.trim().toLowerCase();

        return keys
          .filter((k) => !CHANNEL_SEARCH_EXCLUDE_KEYS.includes(k as keyof Channel))
          .map((k) =>
            String(ch[ k as keyof Channel ])
              ?.trim()
              ?.toLocaleLowerCase()
              ?.includes(val)
          )
          .some((v) => v);
      }, true);
    })
);

export const getFilteredChannels = createSelector(
  getFilteredChannelsByQueries,
  getFiltersSearch,
  (channelsByQueries, searchString) => {
    const uniq = [ ...channelsByQueries ];
    const idsInQueries = channelsByQueries.map((ch) => ch.name);

    const sortedResults = uniq.filter(
      (ch) =>
        idsInQueries.includes(ch.name) &&
        ch?.name?.toLocaleLowerCase()?.includes(searchString?.toLocaleLowerCase())
    );

    return sortedResults.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

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

export const getFiltered = createSelector(
  getFilteredUsersByGroup,
  getFilteredDMsByGroup,
  // getFilteredChannelsByGroup,
  (users, dm) => ({
    users,
    dm
  })
);

export const getFilteredChannelsIds = createSelector(
  getFilteredChannels,
  (channels) => channels.map((c) => c.name)
);

export const getSortedListByMessages = createSelector(
  getFilteredUsers,
  getFilteredChannels,
  (users, channels) => {
    const sortedResult = [ ...users, ...channels ];

    sortedResult.sort((a, b) => {
      const nameA = ((a as User).id || (a as Channel).name).toUpperCase();
      const nameB = ((b as User).id || (b as Channel).name).toUpperCase();

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

    return sortedResult;
  }
);

export const getFilteredUsersIdsWithMessagesAndGroups = createSelector(
  getSortedListByMessages,
  (entity) => {
    return entity
      .filter((c) => (c.messages || []).length > 0 && c.lastMessage)
      .map((c) => [
        (c as User).id || (c as Channel).name,
        (c as User).id ? MessageTypes.DIRECT : MessageTypes.CHANNEL
      ]);
  }
);
