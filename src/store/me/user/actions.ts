import { SetMeAvatar, SetMeUsername, SetMeBio, UserActionsEnum } from './types';

export const setMeUsername = (username: string): SetMeUsername => ({
  type: UserActionsEnum.SET_ME_USERNAME,
  data: {
    username
  }
});

export const setMeAvatar = (avatar: string): SetMeAvatar => ({
  type: UserActionsEnum.SET_ME_AVATAR,
  data: {
    avatar
  }
});

export const setMeBio = (bio: string): SetMeBio => ({
  type: UserActionsEnum.SET_ME_BIO,
  data: {
    bio
  }
});
