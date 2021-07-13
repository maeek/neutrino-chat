import { AxiosRequestConfig } from 'axios';
import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiError } from '../api-error';
import { ApiDevices } from '../devices';
import { ApiMeAvatar } from './avatar';
import { NeutrinoApiMeResponse } from './types';

export enum ApiMeEnum {
  GET_ME = 'ApiMe.getMe'
}
export class ApiMe {
  private static readonly api: ApiInstanceType = ApiInstance;
  
  static route = '/me'
  
  static avatar = ApiMeAvatar;

  static devices = ApiDevices;

  static getMe(params?: Pick<AxiosRequestConfig, 'params'>) {
    return ApiMe.api.instance.get<NeutrinoApiMeResponse>('/me', { params })
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiMeEnum.GET_ME);
      });
  }
}
