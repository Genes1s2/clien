import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDocuments,
  createDocument,
  allDeletedDocuments,
  allDeletedDocumentsByOwner,
  allDocumentsByOwner,
  getDocumentById,
  restoreDocument,
  uploadNewVersionDocument,
  commentDocument,
  updateDocument,
  softDeleteDocument,
  hardeleteDocument,
  controlDocument,
  sensitiveDocument,
  archiveDocument,
  fetchArchivedDocuments,
  fetchSensitiveocuments,
} from './actions';
import { LoadingType } from '../../models/store';

interface DocumentState {
  items: any[];
  deletedItems: any[];
  currentDocument: any | null;
  status: LoadingType;
  error: string | null;
}

const initialState: DocumentState = {
  items: [],
  deletedItems: [],
  currentDocument: null,
  status: LoadingType.IDLE,
  error: null
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload;
    }
  },
  extraReducers: (builder) => {
    // All documents
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Create doc
    builder
      .addCase(createDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // all deleted doc
    builder
      .addCase(allDeletedDocuments.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(allDeletedDocuments.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.deletedItems = action.payload;
      })
      .addCase(allDeletedDocuments.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // all deleted doc by owner
    builder
      .addCase(allDeletedDocumentsByOwner.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(allDeletedDocumentsByOwner.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.deletedItems = action.payload;
      })
      .addCase(allDeletedDocumentsByOwner.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // all doc by owner
    builder
      .addCase(allDocumentsByOwner.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(allDocumentsByOwner.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(allDocumentsByOwner.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // get doc by id
    builder
      .addCase(getDocumentById.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.currentDocument = action.payload;
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // update doc
    builder
      .addCase(updateDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Soft delete (owner or admin)
    builder
      .addCase(softDeleteDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(softDeleteDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(softDeleteDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Hard delete (admin only)
    builder
      .addCase(hardeleteDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(hardeleteDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(hardeleteDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Restore document
    builder
      .addCase(restoreDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(restoreDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(restoreDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Document Versions
    builder
      .addCase(uploadNewVersionDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(uploadNewVersionDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(uploadNewVersionDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Comments doc
    builder
      .addCase(commentDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(commentDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(commentDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // access control
    builder
      .addCase(controlDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(controlDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(controlDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // Archived document
    builder
      .addCase(archiveDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(archiveDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.currentDocument = action.payload;
      })
      .addCase(archiveDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // sensitive document
    builder
      .addCase(sensitiveDocument.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(sensitiveDocument.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.currentDocument = action.payload;
      })
      .addCase(sensitiveDocument.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // All archived documents
    builder
      .addCase(fetchArchivedDocuments.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(fetchArchivedDocuments.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchArchivedDocuments.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

    // All sensitive documents
    builder
      .addCase(fetchSensitiveocuments.pending, (state) => {
        state.status = LoadingType.PENDING;
        state.error = null;
      })
      .addCase(fetchSensitiveocuments.fulfilled, (state, action) => {
        state.status = LoadingType.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchSensitiveocuments.rejected, (state, action) => {
        state.status = LoadingType.REJECTED;
        // state.error = action.payload as string;
      })

  }
});

export const { setCurrentDocument } = documentSlice.actions;
export default documentSlice.reducer;