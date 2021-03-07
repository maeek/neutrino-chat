import { getStoreState } from '..';

export const getAuthToken = (state = getStoreState()) => state.auth.sessionInfo.token;
export const getAuthRefreshToken = (state = getStoreState()) => state.auth.sessionInfo.refreshToken;
