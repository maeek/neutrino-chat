import { NeutrinoApiError } from '@/api/api-error';
import ApiInstance, { ApiInstance as ApiInstanceType } from '../../api';
import {
  NeutrinoApiMeAvatarTypes,
  NeutrinoApiMeAvatarUpdateBody,
  NeutrinoApiMeMeAvatarInfoResponse,
  NeutrinoApiMeMeAvatarUploadResponse
} from './types';

export enum ApiMeAvatarEnum {
  GET_AVATAR_INFO = 'ApiMeAvatar.getAvatarInfo',
  GET_AVATAR_BLOB = 'ApiMeAvatar.getAvatarBlob',
  MODIFY_AVATAR = 'ApiMeAvatar.modifyAvatar',
  UPLOAD_AVATAR = 'ApiMeAvatar.uploadAvatar',
  DELETE_AVATAR = 'ApiMeAvatar.deleteAvatar',
}

export class ApiMeAvatar {
  private static readonly api: ApiInstanceType = ApiInstance;

  static readonly route = '/me/avatar'

  static getAvatarInfo() {
    return ApiMeAvatar.api.instance.get<NeutrinoApiMeMeAvatarInfoResponse>(`${ApiMeAvatar.route}`)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiMeAvatarEnum.GET_AVATAR_INFO);
      });
  }

  static getAvatarBlob() {
    return ApiMeAvatar.api.instance.get(`${ApiMeAvatar.route}/raw`)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiMeAvatarEnum.GET_AVATAR_BLOB);
      });
  }

  static uploadAvatar(body: Blob | ArrayBuffer | string, onUploadProgress?: (evt: any) => void) {
    return ApiMeAvatar.api.instance.put<NeutrinoApiMeMeAvatarUploadResponse>(
      `${ApiMeAvatar.route}`,
      body,
      { onUploadProgress }
    )
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiMeAvatarEnum.UPLOAD_AVATAR);
      });
  }

  static async modifyAvatar(body: NeutrinoApiMeAvatarUpdateBody, onUploadProgress?: (evt: any) => void) {
    if (body.file) {
      const query = await ApiMeAvatar.uploadAvatar(body.file, onUploadProgress);
      if (!query) return;

      const {
        data: {
          resources: {
            // uuid,
            // created,
            // ttl,
            uri
          }
        }
      } = query;

      body.uri = uri;
      body.isLocal = true;
      body.type = NeutrinoApiMeAvatarTypes.FILE;

      delete body.file;
    }

    return ApiMeAvatar.api.instance.put<NeutrinoApiMeMeAvatarInfoResponse>(`${ApiMeAvatar.route}`, body)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiMeAvatarEnum.MODIFY_AVATAR);
      });
  }

  static deleteAvatar() {
    return ApiMeAvatar.api.instance.delete<NeutrinoApiMeMeAvatarInfoResponse>(`${ApiMeAvatar.route}`)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiMeAvatarEnum.DELETE_AVATAR);
      });
  }
}
