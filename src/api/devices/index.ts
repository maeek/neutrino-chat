import ApiInstance, { ApiInstance as ApiInstanceType } from '../api';
import { NeutrinoApiPaginationRequest } from '../types';
import { NeutrinoApiDevicesResponse } from './types';

export class ApiDevices {
  private static readonly api: ApiInstanceType = ApiInstance;

  static getDevices(pagination?: NeutrinoApiPaginationRequest) {
    const meta: NeutrinoApiPaginationRequest = {
      page: 0,
      perPage: 10,
      ...pagination
    };

    return ApiDevices.api.instance.get<NeutrinoApiDevicesResponse>('/devices', {
      params: meta
    });
  }

  static removeDevices(devices: string | string[]) {
    if (typeof devices === 'string') {
      return ApiDevices.api.instance.delete(`/devices/${devices}`);
    }
    return ApiDevices.api.instance.delete(`/devices/${devices}`, {
      data: JSON.stringify(devices)
    });
  }
}
