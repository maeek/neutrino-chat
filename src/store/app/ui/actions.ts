import { ActionCreator } from 'redux';
import { SetMobileBottomNavVisibility, SetTopBarVisibility, UIActionsEnum } from './types';

export const setMobileBottomNavVisibility: ActionCreator<SetMobileBottomNavVisibility> = (isHidden: boolean) => ({
  type: UIActionsEnum.SET_MOBILE_BOTTOM_NAV_VISIBILITY,
  data: isHidden
});

export const setTopBarVisibility: ActionCreator<SetTopBarVisibility> = (isHidden: boolean) => ({
  type: UIActionsEnum.SET_TOP_BAR_VISIBILITY,
  data: isHidden
});
