// export type AsyncState<T> = {
//   entities: T;
//   pagination?: Pagination | null;
//   status: LoadingType;
//   error: null | undefined | string | Record<string, any>;
// };

// export type ApiResponse<T> = {
//   meta: {
//     message: string,
//     status: number,
//   },
//   data: T,
//   error: null | string | Record<string, any>
// }

// export type Pagination = {
//   limit: number,
//   page: number,
// };

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
  data: T;
  message?: string;
  success: boolean;
}
