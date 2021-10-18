import { Reducer } from 'redux';
import { UIActions, UIActionsEnum, UIState } from './types';

const initialState: UIState = {
  mobileBottonNavHidden: false,
  topBarHidden: false
};

export const ui: Reducer<UIState, UIActions> = (state = initialState, action = {} as UIActions) => {
  switch(action.type) {
  case UIActionsEnum.SET_MOBILE_BOTTOM_NAV_VISIBILITY:
    return {
      ...state,
      mobileBottonNavHidden: action.data
    };

  case UIActionsEnum.SET_TOP_BAR_VISIBILITY:
    return {
      ...state,
      topBarHidden: action.data
    };

  default:
    return state;
  }
};

export default ui;
