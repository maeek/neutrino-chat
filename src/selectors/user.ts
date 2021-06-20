import { createSelector } from 'reselect';
import { getStoreState } from '@/store/index';
import { getHslColorFromCharCode } from '@/utils/getHslColorFromCharCode';

export const getMeUser = (state = getStoreState()) => state.me.user;
export const getMeUsername = (state = getStoreState()) => getMeUser(state).username;
export const getMeAvatar = (state = getStoreState()) => getMeUser(state).avatar;
export const getMeBio = (state = getStoreState()) => getMeUser(state).bio;
export const getMeBanner = (state = getStoreState()) => getMeUser(state).banner;
export const getMeStatus = (state = getStoreState()) => getMeUser(state).status;
export const getMeColor = createSelector(
  getMeUsername,
  (username) => getHslColorFromCharCode(username, '100%', '70%')
);
