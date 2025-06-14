import { AuthUser } from "./auth";
import { Category } from "./category";
import { AccessRight, AuditLog } from "./logActions";

export interface Document {
    id: string;
    title: string;
    description?: string;
    filePath: string;
    categoryId: string;
    category: Category;
    userId: string;
    tags: string[];
    user: AuthUser;
    versions: DocumentVersion[];
    comments: DocumentComment[];
    auditLogs: AuditLog[]
    // workflows: Workflow[];
    accessLogs: AccessRight[];
    deletedAt: string;
    isArchived: boolean;
    isSensitive: boolean;
    readonly createdAt: Date;
}

export interface DocumentVersion {
    id: string;
    filePath: string;
    documentId: string;
    document: Document;
    versionNumber: string;
    userId: string;
    description: string;
    uploadedBy: string;
    readonly createdAt: Date;
}

export interface DocumentComment {
    id: string;
    content: string;
    documentId: string;
    document: Document;
    userId: string;
    user: AuthUser;
    readonly createdAt: Date;
}