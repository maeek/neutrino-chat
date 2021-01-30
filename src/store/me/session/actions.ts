import { ClearTokensAction, SessionActionsEnum, SetRefreshTokenAction, SetTokenAction } from "./types";

export const setToken = (token: string): SetTokenAction => ({
  type: SessionActionsEnum.SET_TOKEN,
  data: {
    token
  }
});

export const setRefreshToken = (token: string): SetRefreshTokenAction => ({
  type: SessionActionsEnum.SET_REFRESH_TOKEN,
  data: {
    token
  }
});

export const clearTokens = (): ClearTokensAction => ({
  type: SessionActionsEnum.CLEAR_TOKENS,
  data: {}
});
