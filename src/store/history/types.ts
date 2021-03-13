/* eslint-disable no-unused-vars */
import { GenericPayloadStructure } from '../types';

interface HistoryItem {
  id: number;
  pathname: string;
}

export interface HistoryState {
  currentIndex: number;
  stack: HistoryItem[];
}

export enum HistoryActionsEnum {
  UPDATE_INDEX = 'UPDATE_INDEX',
  PUSH_LOCATION = 'PUSH_LOCATION',
  GO_FORWARD = 'GO_FORWARD',
  REPLACE_LOCATION = 'REPLACE_LOCATION',
  GO_BACK = 'GO_BACK',
  SET_HISTORY = 'SET_HISTORY'
}

export interface SetHistory extends GenericPayloadStructure {
  type: HistoryActionsEnum.SET_HISTORY;
  data: {
    history: HistoryState;
  }
}

export interface UpdateIndex extends GenericPayloadStructure {
  type: HistoryActionsEnum.UPDATE_INDEX;
  data: {
    index: number;
  }
}

export interface Push extends GenericPayloadStructure {
  type: HistoryActionsEnum.PUSH_LOCATION;
  data: {
    id: number;
    pathname: string;
  }
}

export interface GoForward extends GenericPayloadStructure {
  type: HistoryActionsEnum.GO_FORWARD;
  data: {}
}

export interface Replace extends GenericPayloadStructure {
  type: HistoryActionsEnum.REPLACE_LOCATION;
  data: {
    pathname: string;
  }
}

export interface GoBack extends GenericPayloadStructure {
  type: HistoryActionsEnum.GO_BACK;
  data: {}
}

export type HistoryActionTypes = GoForward | Replace | Push | GoBack | UpdateIndex | SetHistory;
