import { AuthUser } from "./auth";
import { Document } from "./documents";

export interface AccessRight {
    id: string;
    documentId: string;
    document: Document
    userId: string;
    user: AuthUser;
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
  }
  
  export interface AuditLog {
    id: string;
    action: string;
    details: string;
    documentId: string;
    userId: string;
    user: AuthUser
    readonly createdAt: Date;
  }