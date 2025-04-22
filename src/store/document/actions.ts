import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, Pagination } from "../../models/store";
import { AccessControlInput, CreateDocumentInput, Document, DocumentComment, DocumentVersion } from "../../models/documents";

export const getAllDocumentsAction = createAsyncThunk<
  ApiResponse<{ documents: Document[] }>,
  // FetchDocumentsAgrs,
  any
>(
  "documents/getAll",
  async (args, thunkApi) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/doc/documents");

      if (!response.ok) {
        const data = await response.json();
        console.log("Failed to get docs:", data);
      }
      
      const data = await response.json();
      console.log("Docs  fetch successfully:", data);
      return data;
    } catch (error) {
      console.log("Error occurred !!! ", error);
    }
  }
);

export const createDocumentAction = createAsyncThunk<
  ApiResponse<CreateDocumentInput>,
  FormData,
  any
>(
  "documents/create",
  async (formData, thunkApi) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/doc/doecuments", {
        method: "POST",
        body: formData,
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create doc:", errorData);

        return thunkApi.rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("Doc created successfully:", data);

      return data;
    } catch (error) {
      console.error("Error occurred while creating doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to create doc" });
    }
  }
);


export const getDocumentByIdAction = createAsyncThunk<
  ApiResponse<Document>,
  { id: string},
  any
>(
  "Documents/getById",
  async ({ id }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete doc:", errorData);
        return thunkApi.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log("Document updated successfully:", data);
      return data; 
    } catch (error) {
      console.error("Error deleting doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to delete doc" });
    }
  }
);

// export const updateDocumentAction = createAsyncThunk<
//   ApiResponse<UpdateDocumentInput>,
//   { id: string; formData: FormData },
//   any
// >(
//   "Documents/update",
//   async ({ id, formData }, thunkApi) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/api/Documents/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       console.log("Response:", response);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Failed to update doc:", errorData);
//         return thunkApi.rejectWithValue(errorData);
//       }

//       const data = await response.json();
//       console.log("Document updated successfully:", data);

//       return data;
//     } catch (error) {
//       console.error("Error occurred while updating doc:", error);
//       return thunkApi.rejectWithValue({ message: "Failed to update doc" });
//     }
//   }
// );

// Soft delete (owner or admin)
export const softDeleteDocumentAction = createAsyncThunk<
  ApiResponse<Document>,
  { id: string},
  any
>(
  "Documents/delete",
  async ({ id }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete doc:", errorData);
        return thunkApi.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log("Document updated successfully:", data);
      return data; 
    } catch (error) {
      console.error("Error deleting doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to delete doc" });
    }
  }
);

// Hard delete (admin only)
export const hardeleteDocumentAction = createAsyncThunk<
  ApiResponse<Document>,
  { id: string},
  any
>(
  "Documents/delete",
  async ({ id }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/admin/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete doc:", errorData);
        return thunkApi.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log("Document updated successfully:", data);
      return data; 
    } catch (error) {
      console.error("Error deleting doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to delete doc" });
    }
  }
);

// Restore document
export const restoreDocumentAction = createAsyncThunk<
  ApiResponse<Document>,
  { id: string },
  any
>(
  "documents/update",
  async ({ id }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/restore`, {
        method: "PUT",
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to restore doc:", errorData);
        return thunkApi.rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("Document restored successfully:", data);

      return data;
    } catch (error) {
      console.error("Error occurred while restoring doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to restore doc" });
    }
  }
);

// Document Versions
export const uploadNewVersionDocumentAction = createAsyncThunk<
  ApiResponse<DocumentVersion>,
  { id: string; formData: FormData },
  any
>(
  "documents/create",
  async ({ id, formData }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/versions`, {
        method: "POST",
        body: formData,
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update doc version:", errorData);

        return thunkApi.rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("Doc version updated successfully:", data);

      return data;
    } catch (error) {
      console.error("Error occurred while updating new doc version: ", error);
      return thunkApi.rejectWithValue({ message: "Failed to update doc version:" });
    }
  }
);

// Comments
export const commentDocumentAction = createAsyncThunk<
  ApiResponse<DocumentComment>,
  { id: string },
  any
>(
  "documents/create",
  async ({ id }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/comments`, {
        method: "POST",
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to comment doc:", errorData);
        return thunkApi.rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("Comment successfully:", data);

      return data;
    } catch (error) {
      console.error("Error occurred while commenting doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to comment doc" });
    }
  }
);

export const controlDocumentAction = createAsyncThunk<
  ApiResponse<AccessControlInput>,
  { id: string },
  any
>(
  "documents/create",
  async ({ id }, thunkApi) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/doc/${id}/access`, {
        method: "POST",
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to comment doc:", errorData);
        return thunkApi.rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("Access done successfully:", data);

      return data;
    } catch (error) {
      console.error("Error occurred while accessing doc:", error);
      return thunkApi.rejectWithValue({ message: "Failed to access doc" });
    }
  }
);