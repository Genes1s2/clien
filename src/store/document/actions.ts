// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { ApiResponse, Pagination } from "../../models/store";
// import { AccessControlInput, CreateDocumentInput, Document, DocumentComment, DocumentVersion } from "../../models/documents";

// export const getAllDocumentsAction = createAsyncThunk<
//   ApiResponse<{ documents: Document[] }>,
//   // FetchDocumentsAgrs,
//   any
// >(
//   "documents/getAll",
//   async (args, thunkApi) => {
//     try {
//       const response = await fetch("http://127.0.0.1:4000/api/doc/documents");

//       if (!response.ok) {
//         const data = await response.json();
//         console.log("Failed to get docs:", data);
//       }

//       const data = await response.json();
//       console.log("Docs  fetch successfully:", data);
//       return data;
//     } catch (error) {
//       console.log("Error occurred !!! ", error);
//     }
//   }
// );

// export const createDocumentAction = createAsyncThunk<
//   ApiResponse<CreateDocumentInput>,
//   FormData,
//   any
// >(
//   "documents/create",
//   async (formData, thunkApi) => {
//     try {
//       const response = await fetch("http://127.0.0.1:4000/api/doc/doecuments", {
//         method: "POST",
//         body: formData,
//       });

//       console.log("Response:", response);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to create doc:", errorData);

//         return thunkApi.rejectWithValue(errorData);
//       }

//       const data = await response.json();
//       console.log("Doc created successfully:", data);

//       return data;
//     } catch (error) {
//       console.error("Error occurred while creating doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to create doc" });
//     }
//   }
// );


// export const getDocumentByIdAction = createAsyncThunk<
//   ApiResponse<Document>,
//   { id: string},
//   any
// >(
//   "Documents/getById",
//   async ({ id }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to delete doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }
//       const data = await response.json();
//       console.log("Document updated successfully:", data);
//       return data; 
//     } catch (error) {
//       console.error("Error deleting doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to delete doc" });
//     }
//   }
// );

// // export const updateDocumentAction = createAsyncThunk<
// //   ApiResponse<UpdateDocumentInput>,
// //   { id: string; formData: FormData },
// //   any
// // >(
// //   "Documents/update",
// //   async ({ id, formData }, thunkApi) => {
// //     try {
// //       const response = await fetch(`http://127.0.0.1:4000/api/Documents/${id}`, {
// //         method: "PUT",
// //         body: formData,
// //       });

// //       console.log("Response:", response);

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error("Failed to update doc:", errorData);
// //         return thunkApi.rejectWithValue(errorData);
// //       }

// //       const data = await response.json();
// //       console.log("Document updated successfully:", data);

// //       return data;
// //     } catch (error) {
// //       console.error("Error occurred while updating doc:", error);
// //       return thunkApi.rejectWithValue({ message: "Failed to update doc" });
// //     }
// //   }
// // );

// // Soft delete (owner or admin)
// export const softDeleteDocumentAction = createAsyncThunk<
//   ApiResponse<Document>,
//   { id: string},
//   any
// >(
//   "Documents/delete",
//   async ({ id }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to delete doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }
//       const data = await response.json();
//       console.log("Document updated successfully:", data);
//       return data; 
//     } catch (error) {
//       console.error("Error deleting doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to delete doc" });
//     }
//   }
// );

// // Hard delete (admin only)
// export const hardeleteDocumentAction = createAsyncThunk<
//   ApiResponse<Document>,
//   { id: string},
//   any
// >(
//   "Documents/delete",
//   async ({ id }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/admin/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to delete doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }
//       const data = await response.json();
//       console.log("Document updated successfully:", data);
//       return data; 
//     } catch (error) {
//       console.error("Error deleting doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to delete doc" });
//     }
//   }
// );

// // Restore document
// export const restoreDocumentAction = createAsyncThunk<
//   ApiResponse<Document>,
//   { id: string },
//   any
// >(
//   "documents/update",
//   async ({ id }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/restore`, {
//         method: "PUT",
//       });

//       console.log("Response:", response);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to restore doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }

//       const data = await response.json();
//       console.log("Document restored successfully:", data);

//       return data;
//     } catch (error) {
//       console.error("Error occurred while restoring doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to restore doc" });
//     }
//   }
// );

// // Document Versions
// export const uploadNewVersionDocumentAction = createAsyncThunk<
//   ApiResponse<DocumentVersion>,
//   { id: string; formData: FormData },
//   any
// >(
//   "documents/create",
//   async ({ id, formData }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/versions`, {
//         method: "POST",
//         body: formData,
//       });

//       console.log("Response:", response);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to update doc version:", errorData);

//         return thunkApi.rejectWithValue(errorData);
//       }

//       const data = await response.json();
//       console.log("Doc version updated successfully:", data);

//       return data;
//     } catch (error) {
//       console.error("Error occurred while updating new doc version: ", error);
//       return thunkApi.rejectWithValue({ message: "Failed to update doc version:" });
//     }
//   }
// );

// // Comments
// export const commentDocumentAction = createAsyncThunk<
//   ApiResponse<DocumentComment>,
//   { id: string },
//   any
// >(
//   "documents/create",
//   async ({ id }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/comments`, {
//         method: "POST",
//       });

//       console.log("Response:", response);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to comment doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }

//       const data = await response.json();
//       console.log("Comment successfully:", data);

//       return data;
//     } catch (error) {
//       console.error("Error occurred while commenting doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to comment doc" });
//     }
//   }
// );

// export const controlDocumentAction = createAsyncThunk<
//   ApiResponse<AccessControlInput>,
//   { id: string },
//   any
// >(
//   "documents/create",
//   async ({ id }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/access`, {
//         method: "POST",
//       });

//       console.log("Response:", response);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to comment doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }

//       const data = await response.json();
//       console.log("Access done successfully:", data);

//       return data;
//     } catch (error) {
//       console.error("Error occurred while accessing doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to access doc" });
//     }
//   }
// );

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
