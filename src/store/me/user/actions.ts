import {
  SetMeAvatar,
  SetMeUsername,
  SetMeBio,
  UserActionsEnum,
  Reaction,
  SetMeReactions,
  SetMeBanner,
  SetMeStatus,
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

export const setMeBanner = (banner: string): SetMeBanner => ({
  type: UserActionsEnum.SET_ME_BANNER,
  data: {
    banner
  }
});

export const setMeStatus = (status: MeStatus): SetMeStatus => ({
  type: UserActionsEnum.SET_ME_STATUS,
  data: {
    status
  }
});

export const setMeReactions = (reactions: Reaction[]): SetMeReactions => ({
  type: UserActionsEnum.SET_ME_REACTIONS,
  data: {
    reactions
  }
});

export const clearMe = (): ClearMe => ({
  type: UserActionsEnum.CLEAR_ME,
  data: {}
});
