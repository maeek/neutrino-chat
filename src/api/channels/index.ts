import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiError } from '../api-error';
import { NeutrinoApiChannelCreateObj, NeutrinoApiChannelId, NeutrinoApiChannelsResponse } from './types';

export enum ApiChannelsEnum {
  GET_LIST = 'ApiChannels.getList',
  ADD = 'ApiChannels.add',
  DELETE = 'ApiChannels.delete',
  GET_BY_ID = 'ApiChannels.getById',
  GET_BY_NAME = 'ApiChannels.getByName',
}

export class ApiChannels {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/channels'

  static getList() {
    return ApiChannels.api.instance.get<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/`)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.GET_LIST);
      });
  }

  static add(channel: NeutrinoApiChannelCreateObj) {
    return ApiChannels.api.instance.post<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/`, channel)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.ADD);
      });
  }

  static modify(channel: NeutrinoApiChannelCreateObj) {
    return ApiChannels.api.instance.post<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/`, channel)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.ADD);
      });
  }

  static delete(channels: NeutrinoApiChannelId | NeutrinoApiChannelId[]) {
    if (typeof channels === 'string') {
      return ApiChannels.api.instance.delete<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/`, {
        data: { channels: [ channels ] }
      })
        .catch((e: any) => {
          throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.DELETE);
        });
    }

    return ApiChannels.api.instance.delete<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/`, {
      data: { channels }
    })
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.DELETE);
      });
  }

  static getByName(name: string) {
    return ApiChannels.api.instance.get<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/`, {
      params: {
        name
      }
    })
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.GET_BY_NAME);
      });
  }

  static getById(id: string) {
    return ApiChannels.api.instance.get<NeutrinoApiChannelsResponse>(`${ApiChannels.route}/${id}/`)  
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiChannelsEnum.GET_BY_ID);
      });
  }
}
