import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface RequestParameters {
  url: string;
  requiresToken?: boolean;
  headers?: {}
}

export class HttpClient {
  private readonly baseURL: string;
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL
    });
  }

  request<T>(path: string, data = {}, config = {}): Promise<AxiosResponse<T>> {
    return this.instance.request<T>({
      url: `${this.baseURL}${path}`,
      data,
      ...config
    });
  }

  get<T>(parameters: RequestParameters): Promise<AxiosResponse<T>> {
    const { url, headers } = parameters;    

    return this.instance.get<T>(url, { headers });
  }

  post<T>(path: string, data = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(path, data, { headers });
  }

  put<T>(path: string, data = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(path, data, { headers });
  }

  patch<T>(path: string, data = {}, headers = {}): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(path, data, { headers });
  }

  delete<T>(path: string, data = {}, headers = {}): Promise<unknown> {
    return this.instance.delete<T>(path, {
      data,
      headers
    });
  }
}
