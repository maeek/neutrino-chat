import getPersistConf from '@/store/persist-config';
import { Reducer } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { NotificationsSettingsAction, NotificationsSettingsActionEnum, NotificationsSettingsState, SetNotfAction } from './types';

export const initialState: NotificationsSettingsState = {
  mentions: {
    enabled: true,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  },
  reactions: {
    enabled: true,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  },
  joined: {
    enabled: true,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  },
  left: {
    enabled: true,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  },
  chats: {
    enabled: true,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  },
  groupChats: {
    enabled: true,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  },
  groupInvites: {
    enabled: false,
    vibrations: true,
    sound: {
      enabled: true,
      volume: 1
    },
    push: false,
    native: {
      permitted: false
    }
  }
};

export const notificationsSettings: Reducer<
  NotificationsSettingsState,
  NotificationsSettingsAction
> = (
  state = initialState,
  action = {} as NotificationsSettingsAction
) => {
  if (action.type === NotificationsSettingsActionEnum.SET_NOTF_SETTING) {
    return updateNotifications(state, action);
  }

  return state;
};

const updateNotifications = (
  state: NotificationsSettingsState,
  action: SetNotfAction
): NotificationsSettingsState => {
  const newState = {
    ...state 
  };
  const { data } = action;
  const keyes = Object.keys(data) as Array<keyof NotificationsSettingsState>;

  keyes.forEach(key => {
    newState[ key ] = {
      ...newState[ key ],
      ...data[ key ]
    };
  });

  return newState;
};

export default persistReducer<ReturnType<typeof notificationsSettings>, NotificationsSettingsAction>({
  ...getPersistConf('ne-settings-notifications'),
  storage
}, notificationsSettings);
