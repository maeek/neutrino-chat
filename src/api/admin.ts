import { AxiosRequestConfig } from 'axios';
import ApiInstance, { ApiInstance as ApiInstanceType } from './api';
import { ChatApiError } from './api-error';

export enum ApiAdminEnum {
  GET_CONFIG = 'ApiAdmin.getConfig'
}
export class ApiAdmin {
  private static readonly api: ApiInstanceType = ApiInstance;

  static getConfig() {
    return ApiAdmin.api.instance
      .get<{ registrationEnabled: boolean }>('/admin/config')
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAdminEnum.GET_CONFIG
        );
      });
  }

  static setConfig(body: { registrationEnabled: boolean }) {
    return ApiAdmin.api.instance
      .patch<{ registrationEnabled: boolean }>('/admin/config', body)
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAdminEnum.GET_CONFIG
        );
      });
  }
}
