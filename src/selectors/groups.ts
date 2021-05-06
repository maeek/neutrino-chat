import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { Groups } from '@/store/me/groups/types';

export const getMeGroups = (state = getStoreState()) => {
  return state.me.groups.entries;
};

export const getMeGroupsList = createSelector(
  getMeGroups,
  (groups) => {
    return Object.values(groups);
  }
);

export const getMeGroupsStarred = (state = getStoreState()): Groups => {
  return state.me.groups.entries.Starred;
};
