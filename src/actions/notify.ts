import { RootState } from '@/store/root';
import { Dispatch } from 'redux';

export const notifyUser =
  (_type?: 'message') => (dispatch: Dispatch, getState: () => RootState) => {
    const { sound, vibrations, enabled } =
      getState().settings.notifications.chats;

    if (enabled && sound) {
      const sound = new Audio('/chat-sound.ogg');
      sound.volume = 1;
      sound.play();
    }

    if (enabled && vibrations) {
      try {
        navigator.vibrate(100);
      } catch (e) {
        console.error(e);
      }
    }
  };
