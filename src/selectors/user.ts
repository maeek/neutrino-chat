import { getStoreState } from '@/store/index';

export const getMeUser = (state = getStoreState()) => state.me.user;
export const getMeUsername = (state = getStoreState()) => getMeUser(state).username;
export const getMeAvatar = (state = getStoreState()) => getMeUser(state).avatar;
export const getMeBio = (state = getStoreState()) => getMeUser(state).bio;
