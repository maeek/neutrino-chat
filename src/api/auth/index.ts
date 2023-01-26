import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiError } from '../api-error';
import { NeutrinoApiAuthHeadersEnum, NeutrinoApiAuthResponse } from './types';

export enum ApiAuthorizationEnum {
  LOGIN = 'ApiAuthorization.login',
  LOGOUT = 'ApiAuthorization.logout',
  REFRESH = 'ApiAuthorization.refresh'
}

export class ApiAuthorization {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/auth';

  static login(username: string, password: string) {
    return ApiAuthorization.api.instance.post<NeutrinoApiAuthResponse>(
      `${ApiAuthorization.route}/login`, { username, password, newDeviceName: navigator.userAgent }
    )
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiAuthorizationEnum.LOGIN);
      });
  }

  static logout(refreshToken: string) {
    return ApiAuthorization.api.instance.delete<NeutrinoApiAuthResponse>(`${ApiAuthorization.route}/logout`, {
      headers: {
        [ NeutrinoApiAuthHeadersEnum.REFRESH_TOKEN ]: refreshToken
      }
    })
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiAuthorizationEnum.LOGOUT);
      });
  }

  static refresh() {
    return ApiAuthorization.api.instance.put<NeutrinoApiAuthResponse>(`${ApiAuthorization.route}/refresh`)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiAuthorizationEnum.REFRESH);
      });
  }
}
