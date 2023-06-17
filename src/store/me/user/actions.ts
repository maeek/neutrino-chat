import {
  SetMeAvatar,
  SetMeUsername,
  SetMeBio,
  UserActionsEnum,
  Reaction,
  MeStatus,
  ClearMe,
  SetMeRole
} from './types';

export const setMeUsername = (username: string): SetMeUsername => ({
  type: UserActionsEnum.SET_ME_USERNAME,
  data: {
    username
  }
});

export const setMeRole = (role: string): SetMeRole => ({
  type: UserActionsEnum.SET_ME_ROLE,
  data: {
    role
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

export const clearMe = (): ClearMe => ({
  type: UserActionsEnum.CLEAR_ME,
  data: {}
});
