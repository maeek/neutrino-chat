import { getChannelById } from '@/selectors/channels';
import { getUserById } from '@/selectors/users';
import { RootState } from '@/store/root';
import { Dispatch } from 'redux';
import { fetchMeBasicInfo } from './me';

export const notifyUser =
  () => (dispatch: Dispatch, getState: () => RootState) => {
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

export const checkIfRefetchNeeded =
  (parentId: string) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
      const state = getState();
      const user = getUserById(parentId)(state);
      const channel = getChannelById(parentId, state);

      if (!user && !channel) {
        return dispatch(fetchMeBasicInfo());
      }
    };
