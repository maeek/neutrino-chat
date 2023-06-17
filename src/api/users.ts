import ApiInstance, { ApiInstance as ApiInstanceType } from './api';
import { ChatApiError } from './api-error';

export enum ApiUsersEnum {
  GET_USERS = 'ApiUsers.getUsers'
}

export interface User {
  username: string;
  avatar: string;
  description: string;
  role: 'user' | 'admin';
}

export class ApiUsers {
  private static readonly api: ApiInstanceType = ApiInstance;

  static getUsers() {
    return ApiUsers.api.instance
      .get<{ items: User[]; total: number }>('/users/', {
        params: { limit: 1000 }
      })
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiUsersEnum.GET_USERS);
      });
  }

  static removeUser(username: string) {
    return ApiUsers.api.instance
      .delete(`/users/${username}`)
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiUsersEnum.GET_USERS);
      });
  }
}
