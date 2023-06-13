import { AxiosRequestConfig } from 'axios';
import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { ChatApiError } from '../api-error';
import { ApiDevices } from '../devices';
import { ApiMeAvatar } from './avatar';
import { ChatApiMeResponse } from './types';

export enum ApiMeEnum {
  GET_ME = 'ApiMe.getMe'
}
export class ApiMe {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/me';

  static avatar = ApiMeAvatar;

  static devices = ApiDevices;

  static getMe(params?: Pick<AxiosRequestConfig, 'params'>) {
    return ApiMe.api.instance
      .get<ChatApiMeResponse>('/me', { params })
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiMeEnum.GET_ME);
      });
  }
}
