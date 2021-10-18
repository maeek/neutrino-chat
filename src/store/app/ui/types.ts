import { Action } from 'redux';

export interface UIState {
  mobileBottonNavHidden?: boolean;
  topBarHidden?: boolean;
}

export enum UIActionsEnum {
  SET_MOBILE_BOTTOM_NAV_VISIBILITY = 'SET_MOBILE_BOTTOM_NAV_VISIBILITY',
  SET_TOP_BAR_VISIBILITY = 'SET_TOP_BAR_VISIBILITY'
}

export interface SetMobileBottomNavVisibility extends Action<UIActionsEnum.SET_MOBILE_BOTTOM_NAV_VISIBILITY> {
  data: boolean;
}

export interface SetTopBarVisibility extends Action<UIActionsEnum.SET_TOP_BAR_VISIBILITY> {
  data: boolean;
}

export type UIActions = SetMobileBottomNavVisibility | SetTopBarVisibility;
