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
import { ApiUsers } from '@/api/users';
import { modifyUsers, populateUsersCache } from '@/store/users/actions';
import { ApiChannels } from '@/api/channels';
import { addChannels } from '@/store/channels/actions';

export const fetchMeBasicInfo = () => async (dispatch: Dispatch) => {
  await ApiUsers.getUsers()
    .then((response) => {
      const users = response.data.items;
      const me = users.find((user) => user.username === getMeUsername());

      if (me) {
        dispatch(
          setMeAvatar(me.avatar ? `/api/users/${me.username}/avatar` : '')
        );
        dispatch(setMeUsername(me.username));
        dispatch(setMeRole(me.role));
        dispatch(setMeBio(me.description));
      }

      dispatch(
        populateUsersCache(
          users.map((user) => ({
            id: user.username,
            bio: user.description,
            avatar: user.avatar ? `/api/users/${user.username}/avatar` : '',
            role: user.role
          }))
        )
      );
    })
    .catch((e: any) => {
      console.error('Request failed with reason: ', e);
      dispatch(
        addNewError(
          unifiedErrorTemplate(e.type, 'Failed to fetch user info', null, {
            shouldLogout: [ 401, 403 ].includes(e.base.response.status)
          })
        )
      );
    });
  
  ApiMe.getMe()
    .then((response) => {
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
      dispatch(modifyUsers(response.data.settings?.mutedUsers?.map((user) => ({
        id: user,
        muted: true
      }))));
    })
    .catch((e: any) => {
      console.error('Request failed with reason: ', e);
      dispatch(
        addNewError(
          unifiedErrorTemplate(e.type, 'Failed to fetch user info', null, {
            shouldLogout: [ 401, 403 ].includes(e.base.response.status)
          })
        )
      );
    });

  ApiChannels.getList()
    .then((res) => {
      dispatch(addChannels(res.data.items));
    })
    .catch((err) => {
      console.error(err);
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
            unifiedErrorTemplate(e.type, 'Failed to update avatar', null, {
              shouldLogout: [ 401, 403 ].includes(e.base.response.status)
            })
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
            unifiedErrorTemplate(e.type, 'Failed to update user info', null, {
              shouldLogout: [ 401, 403 ].includes(e.base.response.status)
            })
          )
        );
      });
  };
