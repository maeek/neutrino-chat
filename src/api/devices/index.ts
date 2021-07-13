import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiError } from '../api-error';
import { NeutrinoApiPaginationRequest } from '../types';
import { NeutrinoApiDevice, NeutrinoApiDeviceId, NeutrinoApiDevicesResponse } from './types';

export enum ApiDevicesEnum {
  GET_LIST = 'ApiDevices.getList',
  REMOVE = 'ApiDevices.remove',
  ADD = 'ApiDevices._add',
}

export class ApiDevices {
  private static readonly api: ApiInstanceType = ApiInstance;

  static route = '/devices'

  static getList(pagination?: NeutrinoApiPaginationRequest) {
    const meta: NeutrinoApiPaginationRequest = {
      page: 0,
      perPage: 10,
      ...pagination
    };

    return ApiDevices.api.instance.get<NeutrinoApiDevicesResponse>(`${ApiDevices.route}`, {
      params: meta
    })
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiDevicesEnum.GET_LIST);
      });
  }

  static remove(devices: NeutrinoApiDeviceId | NeutrinoApiDeviceId[]) {
    if (typeof devices === 'string') {
      return ApiDevices.api.instance.delete(`${ApiDevices.route}/${devices}`)
        .catch((e: any) => {
          throw new NeutrinoApiError(e.message, { error: e }, ApiDevicesEnum.REMOVE);
        });
    }
    return ApiDevices.api.instance.delete(`${ApiDevices.route}/${devices}`, {
      data: JSON.stringify(devices)
    })
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiDevicesEnum.REMOVE);
      });
  }

  static _add(device: Omit<NeutrinoApiDevice, 'id' | 'created'>) {
    return ApiDevices.api.instance.post<NeutrinoApiDevicesResponse>(`${ApiDevices.route}`, device)
      .catch((e: any) => {
        throw new NeutrinoApiError(e.message, { error: e }, ApiDevicesEnum.ADD);
      });
  }
}
