export interface AsyncState<T> {
  entities: T | null;
  status: LoadingType;
  error: string | null;
  pagination?: Pagination; 
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export enum LoadingType {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  REJECTED = "rejected",
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  error?: string;
  statusCode?: number;
}
