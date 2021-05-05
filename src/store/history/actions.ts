import {
  GoBack,
  GoForward,
  Replace,
  Push,
  UpdateIndex,
  HistoryActionsEnum,
  SetHistory,
  HistoryState
} from './types';

export const updateIndex = (index: number): UpdateIndex => ({
  type: HistoryActionsEnum.UPDATE_INDEX,
  data: {
    index
  }
});

export const goBack = (): GoBack => ({
  type: HistoryActionsEnum.GO_BACK,
  data: {}
});

export const replaceLocation = (pathname: string): Replace => ({
  type: HistoryActionsEnum.REPLACE_LOCATION,
  data: {
    pathname
  }
});

export const pushLocation = (pathname: string, id: number): Push => ({
  type: HistoryActionsEnum.PUSH_LOCATION,
  data: {
    id,
    pathname
  }
});

export const goForward = (): GoForward => ({
  type: HistoryActionsEnum.GO_FORWARD,
  data: {}
});

export const setHistory = (history: HistoryState): SetHistory => ({
  type: HistoryActionsEnum.SET_HISTORY,
  data: {
    history
  }
});
