import { getStoreState } from '@store/index';

export const getMeGroups = (state = getStoreState()) => {
  return state.me.groups.entries;
};

export const getMeGroupsList = (state = getStoreState()) => {
  return Object.values(state.me.groups.entries);
};
