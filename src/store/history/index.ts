import { HistoryState, HistoryActionsEnum, HistoryActionTypes } from './types';

export const initialState: HistoryState = {
  currentIndex: 0,
  stack: [
    {id: 0, pathname: '/'}
  ]
};

const historyReducer = (state = initialState, action: HistoryActionTypes) => {
  let newStack = [...state.stack];

  switch (action.type) {
  case HistoryActionsEnum.REPLACE_LOCATION:
    newStack[state.currentIndex] = {
      ...state.stack[state.currentIndex],
      pathname: action.data.pathname
    };
    return {
      currentIndex: state.currentIndex,
      stack: newStack
    };

  case HistoryActionsEnum.PUSH_LOCATION:
    newStack.splice(state.currentIndex + 1);
    newStack[action.data.id] = {
      id: action.data.id,
      pathname: action.data.pathname
    };

    return {
      currentIndex: state.currentIndex + 1,
      stack: newStack
    };

  case HistoryActionsEnum.GO_BACK:
    return {
      currentIndex: state.currentIndex - 1,
      stack: newStack
    };

  case HistoryActionsEnum.GO_FORWARD:
    return {
      currentIndex: state.currentIndex + 1,
      stack: newStack
    };

  case HistoryActionsEnum.UPDATE_INDEX:
    return {
      currentIndex: action.data.index,
      stack: newStack
    };

  case HistoryActionsEnum.SET_HISTORY:
    return {...action.data.history};

  default:
    return state;
  }
};

export default historyReducer;
