import userReducerMock from './mock';
import { UserState, UserActionTypes, UserActionsEnum, MeStatus } from './types';

export const initialState: UserState = __DEMO__ ? userReducerMock : {
  username: '',
  avatar: '',
  banner: '',
  bio: '',
  status: MeStatus.ACTIVE,
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

  case UserActionsEnum.SET_ME_BANNER:
    return {
      ...state,
      banner: action.data.banner
    };

  case UserActionsEnum.SET_ME_STATUS:
    return {
      ...state,
      status: action.data.status
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
