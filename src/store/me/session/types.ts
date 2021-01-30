import { GenericPayloadStructure } from "../../types";

export interface SessionState {
  sessionInfo: {
    token: string | null;
    refreshToken: string | null;
  }
}

export enum SessionActionsEnum {
  SET_TOKEN = 'SET_TOKEN',
  SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
  CLEAR_TOKENS = 'CLEAR_TOKENS'
};

export interface SetTokenAction extends GenericPayloadStructure {
  type: SessionActionsEnum.SET_TOKEN;
  data: {
    token: string;
  }
}

export interface SetRefreshTokenAction extends GenericPayloadStructure {
  type: SessionActionsEnum.SET_REFRESH_TOKEN;
  data: {
    token: string;
  }
}

export interface ClearTokensAction extends GenericPayloadStructure {
  type: SessionActionsEnum.CLEAR_TOKENS;
  data: {}
}

export type SessionActionTypes = SetTokenAction | SetRefreshTokenAction | ClearTokensAction;
