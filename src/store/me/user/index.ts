import { UserState, UserActionTypes, UserActionsEnum } from './types';

export const initialState: UserState = {
  username: '',
  avatar: ''
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
  case UserActionsEnum.SET_USERNAME:
    return {
      ...state,
      username: action.data.username
    };

  case UserActionsEnum.SET_AVATAR:
    return {
      ...state,
      avatar: action.data.avatar
    };

  default:
    return state;
  }
};

export default userReducer;
