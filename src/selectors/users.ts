import { createSelector } from 'reselect';
import { getStoreState } from '@/store';
import { getMeGroupsStarred } from './groups';

export const getUsers = (state = getStoreState()) => state.users.entries;
export const getUsersList = createSelector(getUsers, (users) =>
  Object.values(users)
);
export const getFullyFetchedUsersList = getUsersList;

export const getUsersIds = createSelector(getUsers, (users) =>
  Object.keys(users)
);

export const getUserById = (id: string) =>
  createSelector(getUsers, (users) => users[id]);

export const getUserIsInStarred = (id: string) =>
  createSelector(
    getMeGroupsStarred,
    (starred) => !!starred.items.find((el) => el.id === id)
  );
