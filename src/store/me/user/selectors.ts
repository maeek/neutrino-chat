import { getStoreState } from '../..';

export const getUsername = (state = getStoreState()) => state.me.user.username;
export const getAvatar = (state = getStoreState()) => state.me.user.avatar;
