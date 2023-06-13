import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { ChatApiError } from '../api-error';
import { ChatApiPaginationRequest } from '../types';
import {
  ChatApiDevice,
  ChatApiDeviceId,
  ChatApiDevicesResponse
} from './types';

export enum ApiDevicesEnum {
  GET_LIST = 'ApiDevices.getList',
  REMOVE = 'ApiDevices.remove',
  ADD = 'ApiDevices._add'
}

export class ApiDevices {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/devices';

  static getList(pagination?: ChatApiPaginationRequest) {
    const meta: ChatApiPaginationRequest = {
      page: 0,
      perPage: 10,
      ...pagination
    };

    return ApiDevices.api.instance
      .get<ChatApiDevicesResponse>(`${ApiDevices.route}`, {
        params: meta
      })
      .catch((e: any) => {
        throw new ChatApiError(
          e.message,
          { error: e },
          ApiDevicesEnum.GET_LIST
        );
      });
  }

  static remove(devices: ChatApiDeviceId | ChatApiDeviceId[]) {
    if (typeof devices === 'string') {
      return ApiDevices.api.instance
        .delete(`${ApiDevices.route}/${devices}`)
        .catch((e: any) => {
          throw new ChatApiError(
            e.message,
            { error: e },
            ApiDevicesEnum.REMOVE
          );
        });
    }
    return ApiDevices.api.instance
      .delete(`${ApiDevices.route}/${devices}`, {
        data: JSON.stringify(devices)
      })
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiDevicesEnum.REMOVE);
      });
  }

  static _add(device: Omit<ChatApiDevice, 'id' | 'created'>) {
    return ApiDevices.api.instance
      .post<ChatApiDevicesResponse>(`${ApiDevices.route}`, device)
      .catch((e: any) => {
        throw new ChatApiError(e.message, { error: e }, ApiDevicesEnum.ADD);
      });
  }
}
