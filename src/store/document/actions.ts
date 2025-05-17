import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccessRight } from '../../models/logActions';

//  get all docs
export const fetchDocuments = createAsyncThunk(
  'documents/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/documents', {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch documents');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch documents');
    }
  }
);

// all deleted doc
export const allDeletedDocuments = createAsyncThunk(
  'documents/allDeletedDocuments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/all-deleted-documents', {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch deleted documents');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch deleted documents');
    }
  }
);

// all deleted doc by owner
export const allDeletedDocumentsByOwner = createAsyncThunk(
  'documents/allDeletedDocumentsByOwner',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/all-deleted-documents-owner', {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();

      console.log("allDeletedDocumentsByOwner: ", data);
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch deleted documents');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch deleted documents');
    }
  }
);

// all doc by owner
export const allDocumentsByOwner = createAsyncThunk(
  'documents/allDocumentsByOwner',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/all-documents-owner', {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch owner documents');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch owner documents');
    }
  }
);

// create doc
export const createDocument = createAsyncThunk(
  'documents/createDocument',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/documents', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });


      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to create document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create document');
    }
  }
);

// get doc by id
export const getDocumentById = createAsyncThunk(
  "Documents/getDocumentById",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get category');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to det category');
    }
  }
);

// update doc
export const updateDocument = createAsyncThunk(
  "Documents/updateDocument",
  async ({ documentId, formData }: { documentId: string, formData: FormData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          // "Content-Type": "application/json"
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to update document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update document');
    }
  }
);

// Soft delete (owner or admin)
export const softDeleteDocument = createAsyncThunk(
  "Documents/softDeleteDocument",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to delete document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete document');
    }
  }
);

// Hard delete (admin only)
export const hardeleteDocument = createAsyncThunk(
  "Documents/hardeleteDocument",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/admin/${documentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to delete document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete document');
    }
  }
);

// Restore document
export const restoreDocument = createAsyncThunk(
  "documents/restoreDocument",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}/restore`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to completely delete document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to completely delete document');
    }
  }
);

// Document Versions
export const uploadNewVersionDocument = createAsyncThunk(
  "documents/uploadNewVersionDocument",
  async ({ documentId, formData }: { documentId: string, formData: FormData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}/versions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to upload new document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to upload new document');
    }
  }
)

// Comments doc
export const commentDocument = createAsyncThunk(
  "documents/commentDocument",
  async ({ documentId, content }: { documentId: string, content: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}/comments`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to comment document');

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to comment document');
    }
  }
);

// Access control
export const controlDocument = createAsyncThunk(
  "documents/controlDocument",
  async ({ documentId, data }: { documentId: string, data: AccessRight }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}/access`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const datas = await response.json();

      if (!response.ok) throw new Error(datas.error || 'Failed to grants access document');

      return datas;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to grants access document');
    }
  }
);

// Arvhived document
export const archiveDocument = createAsyncThunk(
  'documents/archive',
  async ({ documentId, isArchived }: { documentId: string; isArchived: boolean }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}/archive`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isArchived })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update archive status');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update archive status');
    }
  }
);

// Sensitive document
export const sensitiveDocument = createAsyncThunk(
  'documents/sensitive',
  async ({ documentId, isSensitive }: { documentId: string; isSensitive: boolean }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${documentId}/sensitive`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isSensitive })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update sensitivity status');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update sensitivity status');
    }
  }
);

//  get all archived docs
export const fetchArchivedDocuments = createAsyncThunk(
  'documents/fetchArchivedDocuments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/archive', {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch documents');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch documents');
    }
  }
);

//  get all sensitive docs
export const fetchSensitiveocuments = createAsyncThunk(
  'documents/fetchSensitiveocuments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://127.0.0.1:4000/api/doc/sensitive', {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch documents');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch documents');
    }
  }
);