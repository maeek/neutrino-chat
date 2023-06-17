import { ApiMe } from '@/api/me';
import { Dispatch } from 'redux';
import {
  setMeAvatar,
  setMeBio,
  setMeRole,
  setMeUsername
} from '@/store/me/user/actions';
import { RootState } from '@/store/root';
import { getMeUsername } from '@/selectors/user';
import { addNewError } from '@/store/app/errors/actions';
import { unifiedErrorTemplate } from '@/store/app/errors/error';

export const fetchMeBasicInfo = () => (dispatch: Dispatch) => {
  return ApiMe.getMe()
    .then((response) => {
      console.log('response', response.data);
      dispatch(
        setMeAvatar(
          response.data?.avatar
            ? `/api/users/${response.data?.username}/avatar`
            : ''
        )
      );
      dispatch(setMeUsername(response.data?.username || ''));
      dispatch(setMeRole(response.data?.role || ''));
      dispatch(setMeBio(response.data?.description || ''));
    })
    .catch((e: any) => {
      console.error('Request failed with reason: ', e.message);
      dispatch(
        addNewError(
          unifiedErrorTemplate(e.type, 'Failed to fetch user info', null)
        )
      );
    });
};

export const uploadAvatar =
  (file: File) => async (dispatch: Dispatch, getState: () => RootState) => {
    const username = getMeUsername(getState());
    const formData = new FormData();
    formData.append('file', file);

    return ApiMe.uploadAvatar(username, formData)
      .then(() => {
        dispatch(setMeAvatar(`/users/${username}/avatar`));
      })
      .catch((e: any) => {
        console.error('Request failed with reason: ', e.message);
        dispatch(
          addNewError(
            unifiedErrorTemplate(e.type, 'Failed to update avatar', null)
          )
        );
      });
  };

export const clearMeAvatarAction = () => (dispatch: Dispatch) => {
  // Remove on server, then
  dispatch(setMeAvatar(''));
};

export const updateMeBasicInfo =
  (username: string, body: any) => (dispatch: Dispatch) => {
    return ApiMe.updateUser(username, body)
      .then((response) => {
        console.log('response', response.data);
        dispatch(setMeBio(response.data?.description || ''));
        dispatch(
          setMeAvatar(
            response.data?.avatar ? `/api/users/${username}/avatar` : ''
          )
        );
      })
      .catch((e: any) => {
        console.error('Request failed with reason: ', e.message);
        dispatch(
          addNewError(
            unifiedErrorTemplate(e.type, 'Failed to update user info', null)
          )
        );
      });
  };
