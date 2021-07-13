import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiError } from '../api-error';
import { NeutrinoApiAuthResponse } from './types';

export enum ApiAuthorizationEnum {
  LOGIN = 'ApiAuthorization.login',
  LOGOUT = 'ApiAuthorization.logout',
  REFRESH = 'ApiAuthorization.refresh'
}

export class ApiAuthorization {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/auth'

  static login(username: string, password: string) {
    return ApiAuthorization.api.instance.post<NeutrinoApiAuthResponse>(
      `${ApiAuthorization.route}/login`, { username, password }
    )
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiAuthorizationEnum.LOGIN);
      });
  }

  static logout() {
    return ApiAuthorization.api.instance.delete<NeutrinoApiAuthResponse>(`${ApiAuthorization.route}/logout`)
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
