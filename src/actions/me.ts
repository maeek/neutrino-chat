import { ApiMe } from '@/api/me';
import { Dispatch } from 'redux';
import { setMeAvatar } from '@/store/me/user/actions';

export const fetchMeBasicInfo = () => (dispatch: Dispatch) => {
  return ApiMe.getMe()
    .then((response) => {
      dispatch(setMeAvatar(response.data.resources.me?.avatar?.uri || ''));
    })
    .catch((e: any) => {
      console.error('Request failed with reason: ', e.message);
      // TODO: error reducer
    });
};

export const clearMeAvatarAction = () => (dispatch: Dispatch) => {
  // Remove on server, then
  dispatch(setMeAvatar(''));
};
