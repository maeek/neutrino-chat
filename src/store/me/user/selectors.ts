import { getStoreState } from '../..';

export const getMeUsername = (state = getStoreState()) => state.me.user.username;
export const getMeAvatar = (state = getStoreState()) => state.me.user.avatar;
