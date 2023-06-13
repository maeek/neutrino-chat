import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuthRefreshToken, getAuthToken } from '@/selectors/session';
import { ChatApiAuthHeadersEnum } from './auth/types';

export class ApiInstance {
  baseURL: string;
  readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    this.instance = axios.create({
      baseURL
    });

    this._initializeInterceptor();
  }

  private _initializeInterceptor = (): void => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );

    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = getAuthToken();
    if (token && config?.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }

  private _handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  // private _updateToken = (): Promise<string> => {
  //   const refreshToken = getAuthRefreshToken();

  //   if (!refreshToken) return Promise.reject();

  //   const refreshRequest = axios.post(
  //     `${this.baseURL}/auth/refresh`,
  //     {},
  //     {
  //       headers: {
  //         [ChatApiAuthHeadersEnum.REFRESH_TOKEN]: refreshToken
  //       }
  //     }
  //   );

  //   return refreshRequest.then((res: { data: { token: string } }) => {
  //     return res.data.token;
  //   });
  // };

  private _handleError = (error: any): Promise<any> => {
    // if (error.config && error.response && error.response.status === 401) {
    //   return this._updateToken().then((token: string) => {
    //     error.config.headers['Authorization'] = `JWT ${token}`;

    //     return axios.request(error.config);
    //   });
    // }

    return Promise.reject(error);
  };
}

export default new ApiInstance('/api');
