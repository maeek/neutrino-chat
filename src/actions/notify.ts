import { RootState } from '@/store/root';
import { Dispatch } from 'redux';

export const notifyUser =
  (type: 'message') => (dispatch: Dispatch, getState: () => RootState) => {
    const { sound, vibrations, enabled } =
      getState().settings.notifications.chats;

    console.log(sound, vibrations, enabled);

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
