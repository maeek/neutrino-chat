import { AxiosRequestConfig } from 'axios';
import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';

export class ApiMe {
  private static readonly api: ApiInstanceType = ApiInstance;

  static getMe(params?: Pick<AxiosRequestConfig, 'params'>) {
    return ApiMe.api.instance.get('/me', { params });
  }

  static getContacts() {
    return ApiMe.api.instance.get('/me/contacts');
  }

  static getSettings() {
    return ApiMe.api.instance.get('/me/settings');
  }

  static getMuted() {
    return ApiMe.api.instance.get('/me/settings/muted');
  }

  static getMutedUsers() {
    return ApiMe.api.instance.get('/me/settings/muted/users');
  }
  
  static getMutedChannels() {
    return ApiMe.api.instance.get('/me/settings/muted/channels');
  }
}
