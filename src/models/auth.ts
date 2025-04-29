import { LoadingType } from "./store";

export interface ILoginInput {
    email: string;
    password: string;
  }
  
  export interface IRegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
  }

  interface RoleName {
    name: string;
  }
  
  export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    createdAt: string;
    role: RoleName;
    token: string;
  }
  
  export interface UserListEntry {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    createdAt: string;
    deletedAt: string
  }
  
  export interface UserListState {
    data: UserListEntry[];
    status: LoadingType;
    error: string | null;
  }

  export interface AuthResponse {
    user: AuthUser;
    token: string;
  }

  export type AuthError =
  | 'INVALID_TOKEN'
  | 'SESSION_EXPIRED'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | string;
