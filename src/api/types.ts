export interface ChatApiResponse<T> {
  resources: T;
  params?: {
    perPage?: number;
    page?: number;
    fields?: string[];
  };
}

export interface ChatApiPaginationRequest {
  page?: number;
  perPage?: number;
}

export interface ChatApiPaginationMetadata {
  total: number;
  page: number;
  perPage: number;
  hasMorePages: boolean;
  indices: [number, number];
}

export interface ChatApiPagination<T> {
  collection: T;
  pagination: ChatApiPaginationMetadata;
}
