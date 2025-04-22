// import { Category } from "./category";

// export type Document = {
// 	id: number;
// 	title: string;
// 	description?: string;
// 	image?: string;
// 	categoryId: number;
// 	category: Category;
// 	createdAt: Date;
// 	updatedAt: Date;
//   };
  
//   export type DocumentFormArgs = {
// 	id?: number;
// 	title: string;
// 	description?: string;
// 	image?: string;
// 	categoryId: number;
//   };

//   export type CreateDocumentArgs = {
// 	title: string;
// 	description: string;
// 	image?: string | File; // Allow File type for uploads
// 	categoryId: number;
//   }
//   export type FetchDocumentsAgrs = {
// 	page?: number;
// 	limit?: number;
//   };

export interface Document {
    id: string;
    title: string;
    filePath: string;
    categoryId: string;
    userId: string;
    tags: string[];
    isArchived: boolean;
    isSensitive: boolean;
    readonly createdAt: Date; // Helps track
}

export interface CreateDocumentInput {
    // title: string;
    // categoryId: string;
    // tags?: string[];
    // isSensitive?: boolean;
    // id: string;
    title: string;
    filePath: string;
    categoryId: string;
    // userId: string;
    // tags: string[];
    // isArchived: boolean;
    // isSensitive: boolean;
    // readonly createdAt: Date; // Helps track
}

export interface DocumentVersion {
    // title?: string;
    // categoryId?: string;
    // tags?: string[];
    // isSensitive?: boolean;
    id: string;
    title: string;
    filePath: string;
    categoryId: string;
    userId: string;
    tags: string[];
    isArchived: boolean;
    isSensitive: boolean;
    readonly createdAt: Date; // Helps track
}

// export interface DocumentVersion {
//     id: string;
//     documentId: string;
//     filePath: string;
//     versionNumber: number;
//     readonly createdAt: Date; // Helps track
// }

export interface DocumentComment {
    id: string;
    content: string;
    documentId: string;
    userId: string;
    readonly createdAt: Date; // Helps track
}

export interface AccessControlInput {
    userId: string;
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
}