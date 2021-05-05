export interface NeutrinoApiResponse<T> {
  resources: T;
  params?: {
    perPage?: number;
    page?: number;
    fields?: string[];
  }
}

export interface NeutrinoApiPaginationRequest {
  page?: number;
  perPage?: number;
}

export interface NeutrinoApiPaginationMetadata {
  total: number;
  page: number;
  perPage: number;
  hasMorePages: boolean;
  indices: [number, number];
}

export interface NeutrinoApiPagination<T> {
  collection: T;
  pagination: NeutrinoApiPaginationMetadata;
}
