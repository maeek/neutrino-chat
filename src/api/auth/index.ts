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
        method: 'password',
        password
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static getWebAuthnRegistrationOptions(username: string) {
    return ApiAuthorization.api.instance
      .post<any>(`${ApiAuthorization.route}/webauthn/reg-options`, {
        username
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static registerWebAuthn(username: string, webauthn: any) {
    return ApiAuthorization.api.instance
      .post<any>(`${ApiAuthorization.route}/registration/webauthn`, {
        username,
        webauthn
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static register(username: string, password: string) {
    return ApiAuthorization.api.instance
      .post<any>(`${ApiAuthorization.route}/registration`, {
        username,
        password
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static getWebAuthnLoginOptions(username: string) {
    return ApiAuthorization.api.instance
      .post<any>(`${ApiAuthorization.route}/webauthn/login-options`, {
        username
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static loginWebAuthn(username: string, webauthn: any) {
    return ApiAuthorization.api.instance
      .post<ChatApiAuthResponse>(`${ApiAuthorization.route}/login/webauthn`, {
        username,
        webauthn
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }

  static logout() {
    return ApiAuthorization.api.instance
      .delete<ChatApiAuthResponse>(`${ApiAuthorization.route}/session`)
      .catch((e: any) => {
        console.error(e);
      });
  }

  static removeAccount(username: string) {
    return ApiAuthorization.api.instance
      .delete<any>(`/users/${username}`)
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiAuthorizationEnum.LOGIN
        );
      });
  }
}
