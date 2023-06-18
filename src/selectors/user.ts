import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';

export const getMeUser = (state = getStoreState()) => state.me.user;
export const getMeRole = (state = getStoreState()) => state.me.user.role;
export const getMeUsername = (state = getStoreState()) =>
  getMeUser(state).username;
export const getMeAvatar = (state = getStoreState()) => getMeUser(state).avatar;
export const getMeBio = (state = getStoreState()) => getMeUser(state).bio;
export const getMeColor = createSelector(getMeUsername, (username) =>
  getHslColorFromCharCode(username, '100%', '80%')
);
