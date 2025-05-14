import { AccessRight, AuditLog } from "./logActions";
import { UserRole } from "./rolePermissions";
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


export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  token: string;
  accessRights: AccessRight[];
  auditLogs: AuditLog[];
  comments: any[];
}

export interface UserListEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  role: UserRole;
  createdAt: string;
  deletedAt: string;

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
  | 'DEFAULT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'CONFLICT'
  | 'UNPROCESSABLE_ENTITY'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'GATEWAY_TIMEOUT'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'METHOD_NOT_ALLOWED'
  | 'NOT_IMPLEMENTED'
  | 'BAD_GATEWAY'
  | 'PAYLOAD_TOO_LARGE'
  | 'REQUEST_TIMEOUT'
  | 'UNAUTHORIZED_ACCESS'
  | 'FORBIDDEN_ACCESS'
  | 'RESOURCE_NOT_FOUND'
  | 'INVALID_CREDENTIALS'
  | 'EXPIRED_CREDENTIALS'
  | 'INVALID_REQUEST'
  | 'MISSING_REQUIRED_FIELDS'
  | 'INVALID_EMAIL'
  | 'PASSWORD_TOO_WEAK'
  | 'EMAIL_ALREADY_EXISTS'
  | 'PASSWORD_MISMATCH'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_DISABLED'
  | 'ERR_FAILED'
  | 'ERR_CONNECTION_REFUSED'
  | 'INVALID_TOKEN'
  | 'SESSION_EXPIRED'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | string;
