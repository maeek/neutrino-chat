import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiAuthResponse } from './types';

export class ApiAuthorization {
  private static readonly api: ApiInstanceType = ApiInstance;

  static login(username: string, password: string) {
    return ApiAuthorization.api.instance.post<NeutrinoApiAuthResponse>('/auth/login', { username, password });
  }

  static logout() {
    return ApiAuthorization.api.instance.delete<NeutrinoApiAuthResponse>('/auth/logout');
  }

  static refresh() {
    return ApiAuthorization.api.instance.put<NeutrinoApiAuthResponse>('/auth/refresh');
  }
}
