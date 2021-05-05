import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';

export const getMeGroups = (state = getStoreState()) => {
  return state.me.groups.entries;
};

export const getMeGroupsList = createSelector(
  getMeGroups,
  (groups) => {
    return Object.values(groups);
  }
);
