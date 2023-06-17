import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { ChatApiError } from '../api-error';
import { ChatApiChannelsResponse } from './types';

export enum ApiChannelsEnum {
  GET_LIST = 'ApiChannels.getList',
  ADD = 'ApiChannels.add',
  DELETE = 'ApiChannels.delete',
  GET_BY_ID = 'ApiChannels.getById',
  GET_BY_NAME = 'ApiChannels.getByName'
}

export class ApiChannels {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/messages';

  static getList() {
    return ApiChannels.api.instance
      .get<ChatApiChannelsResponse>(`${ApiChannels.route}/groups`)
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiChannelsEnum.GET_LIST
        );
      });
  }
}
