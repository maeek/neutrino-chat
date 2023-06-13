import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { ChatApiError } from '../api-error';
import {
  ChatApiChannelCreateObj,
  ChatApiChannelId,
  ChatApiChannelsResponse
} from './types';

export enum ApiChannelsEnum {
  GET_LIST = 'ApiChannels.getList',
  ADD = 'ApiChannels.add',
  DELETE = 'ApiChannels.delete',
  GET_BY_ID = 'ApiChannels.getById',
  GET_BY_NAME = 'ApiChannels.getByName'
}

export class ApiChannels {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/channels';

  static getList() {
    return ApiChannels.api.instance
      .get<ChatApiChannelsResponse>(`${ApiChannels.route}/`)
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiChannelsEnum.GET_LIST
        );
      });
  }

  static add(channel: ChatApiChannelCreateObj) {
    return ApiChannels.api.instance
      .post<ChatApiChannelsResponse>(`${ApiChannels.route}/`, channel)
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiChannelsEnum.ADD);
      });
  }

  static modify(channel: ChatApiChannelCreateObj) {
    return ApiChannels.api.instance
      .post<ChatApiChannelsResponse>(`${ApiChannels.route}/`, channel)
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiChannelsEnum.ADD);
      });
  }

  static delete(channels: ChatApiChannelId | ChatApiChannelId[]) {
    if (typeof channels === 'string') {
      return ApiChannels.api.instance
        .delete<ChatApiChannelsResponse>(`${ApiChannels.route}/`, {
          data: { channels: [channels] }
        })
        .catch((e: any) => {
          throw new ChatApiError(
            e.message,
            { error: e },
            ApiChannelsEnum.DELETE
          );
        });
    }

    return ApiChannels.api.instance
      .delete<ChatApiChannelsResponse>(`${ApiChannels.route}/`, {
        data: { channels }
      })
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiChannelsEnum.DELETE);
      });
  }

  static getByName(name: string) {
    return ApiChannels.api.instance
      .get<ChatApiChannelsResponse>(`${ApiChannels.route}/`, {
        params: {
          name
        }
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiChannelsEnum.GET_BY_NAME
        );
      });
  }

  static getById(id: string) {
    return ApiChannels.api.instance
      .get<ChatApiChannelsResponse>(`${ApiChannels.route}/${id}/`)
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiChannelsEnum.GET_BY_ID
        );
      });
  }
}
