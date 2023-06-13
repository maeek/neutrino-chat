import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { ChatApiError } from '../api-error';
import { ChatApiAuthHeadersEnum, ChatApiAuthResponse } from './types';

export enum ApiAuthorizationEnum {
  LOGIN = 'ApiAuthorization.login',
  LOGOUT = 'ApiAuthorization.logout',
  REFRESH = 'ApiAuthorization.refresh'
}

export class ApiAuthorization {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/auth';

  static login(username: string, password: string) {
    return ApiAuthorization.api.instance
      .post<ChatApiAuthResponse>(`${ApiAuthorization.route}/login`, {
        username,
        password,
        newDeviceName: navigator.userAgent
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static logout(refreshToken: string) {
    return ApiAuthorization.api.instance
      .delete<ChatApiAuthResponse>(`${ApiAuthorization.route}/logout`, {
        headers: {
          [ChatApiAuthHeadersEnum.REFRESH_TOKEN]: refreshToken
        }
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGOUT
        );
      });
  }

  static refresh() {
    return ApiAuthorization.api.instance
      .put<ChatApiAuthResponse>(`${ApiAuthorization.route}/refresh`)
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.REFRESH
        );
      });
  }
}
