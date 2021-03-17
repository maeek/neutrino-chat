import { SetUsername, UserActionsEnum } from './types';

export const addGroups = (username: string): SetUsername => ({
  type: UserActionsEnum.SET_USERNAME,
  data: {
    username
  }
});
