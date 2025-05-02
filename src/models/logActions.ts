export interface AccessRight {
    id: string;
    documentId: string;
    userId: string;
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
    createdAt: string;
  }