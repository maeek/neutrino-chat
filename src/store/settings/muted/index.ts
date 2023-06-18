import { ClearMe, UserActionsEnum } from '@/store/me/user/types';
import mutedReducerMock from './mock';
import { MutedActionsEnum, MutedActionTypes, MutedState } from './types';

export const initialState: MutedState = import.meta.env.VITE_DEMO ? mutedReducerMock : {
  channels: [],
  users: []
};

const mutedReducer = (state = initialState, action: MutedActionTypes | ClearMe) => {
  switch (action.type) {
  case MutedActionsEnum.MUTE_USER:
    return {
      ...state,
      users: [
        ...state.users,
        ...action.data.list
      ]
    };

  case MutedActionsEnum.MUTE_CHANNEL:
    return {
      ...state,
      channels: [
        ...state.users,
        ...action.data.list
      ]
    };

  case MutedActionsEnum.UNMUTE_USER:
    return {
      ...state,
      users: state.users.filter((user) => !action.data.list.includes(user))
    };

  case MutedActionsEnum.UNMUTE_CHANNEL:
    return {
      ...state,
      channels: state.channels.filter((channel) => !action.data.list.includes(channel))
    };

  case MutedActionsEnum.CLEAR_MUTED_USER:
    return {
      ...state,
      users: []
    };

  case MutedActionsEnum.CLEAR_MUTED_CHANNEL:
    return {
      ...state,
      channels: []
    };

  case UserActionsEnum.CLEAR_ME:
    return initialState;

  default:
    return state;
  }
};

export default mutedReducer;
