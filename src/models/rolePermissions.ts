export interface RolePermission {
    id: string;
    name: string;
    description: string;
    permissions: string[];
  }

  export interface Permission {
    id: string;
    name: string;
    description: string;
}

export interface UserRole {
    id: string;
    name: string;
    permissionIds: string[];
    permissions: Permission[];
  }