import { SetAvatar, SetUsername, UserActionsEnum } from './types';

export const setUsername = (username: string): SetUsername => ({
  type: UserActionsEnum.SET_USERNAME,
  data: {
    username
  }
});

export const setAvatar = (avatar: string): SetAvatar => ({
  type: UserActionsEnum.SET_AVATAR,
  data: {
    avatar
  }
});
