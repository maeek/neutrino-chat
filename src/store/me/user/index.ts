import userReducerMock from './mock';
import { UserState, UserActionTypes, UserActionsEnum, MeStatus } from './types';

export const initialState: UserState = !!import.meta.env.VITE_DEMO
  ? userReducerMock
  : {
      username: '',
      role: '',
      avatar: '',
      bio: ''
    };

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionsEnum.SET_ME_USERNAME:
      return {
        ...state,
        username: action.data.username
      };

    case UserActionsEnum.SET_ME_ROLE:
      return {
        ...state,
        role: action.data.role
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

    case UserActionsEnum.CLEAR_ME:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
