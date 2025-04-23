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
    token: string;
  }
  
  export interface AuthResponse {
    user: AuthUser;
    token: string;
  }