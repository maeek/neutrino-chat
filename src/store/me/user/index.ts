import { UserState, UserActionTypes, UserActionsEnum } from './types';

export const initialState: UserState = {
  username: '',
  avatar: '',
  bio: '',
  defaultReactions: []
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
  case UserActionsEnum.SET_ME_USERNAME:
    return {
      ...state,
      username: action.data.username
    };

  case UserActionsEnum.SET_ME_AVATAR:
    return {
      ...state,
      avatar: action.data.avatar
    };

  case UserActionsEnum.SET_ME_BIO:
    return {
      ...state,
      bio: action.data.bio
    };

  case UserActionsEnum.SET_ME_REACTIONS:
    return {
      ...state,
      defaultReactions: action.data.reactions
    }; 

  default:
    return state;
  }
};

export default userReducer;
