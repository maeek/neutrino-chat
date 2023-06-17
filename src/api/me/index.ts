import { AxiosRequestConfig } from 'axios';
import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { ChatApiError } from '../api-error';
import { ChatApiMeResponse } from './types';

export enum ApiMeEnum {
  GET_ME = 'ApiMe.getMe',
  UPDATE_USER = 'ApiMe.updateUser',
  SET_AVATAR = 'ApiMe.setAvatar'
}
export class ApiMe {
  private static readonly api: ApiInstanceType = ApiInstance;

  static getMe(params?: Pick<AxiosRequestConfig, 'params'>) {
    return ApiMe.api.instance
      .get<ChatApiMeResponse>('/users/me', { params })
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiMeEnum.GET_ME);
      });
  }

  static uploadAvatar(username: string, body: any) {
    return ApiMe.api.instance
      .put<void>(`/users/${username}/avatar`, body)
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiMeEnum.SET_AVATAR);
      });
  }

  static updateUser(username: string, body: any) {
    return ApiMe.api.instance
      .put<ChatApiMeResponse>(`/users/${username}`, body)
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiMeEnum.GET_ME);
      });
  }

  static getSessions() {
    return ApiMe.api.instance.get<any>('/auth/sessions').catch((e: any) => {
      throw new ChatApiError(e.message, { error: e }, ApiMeEnum.GET_ME);
    });
  }

  static deleteSessions(sessions: string[]) {
    return ApiMe.api.instance
      .delete<any>('/auth/sessions', { data: { sessions } })
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiMeEnum.GET_ME);
      });
  }
}
