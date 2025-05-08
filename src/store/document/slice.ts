// import { createSlice } from "@reduxjs/toolkit";
// import { AsyncState, LoadingType } from "../../models/store";
// import { createDocumentAction, softDeleteDocumentAction, getAllDocumentsAction, uploadNewVersionDocumentAction } from "./actions";
// import { RootState } from "..";
// import { CreateDocumentInput, Document } from "../../models/documents";

// type documentstate = {
//   dataPaginate: AsyncState<Document[]>;
//   create: AsyncState<CreateDocumentInput | null>;
//   update: AsyncState<Document | null>;
// };

// const initialState: documentstate = {
//   dataPaginate: {
//     entities: [],
//     pagination: null,
//     status: LoadingType.IDLE,
//     error: null,
//   },
//   create: {
//     entities: null,
//     status: LoadingType.IDLE,
//     error: null,
//   },
//   update: {
//     entities: null,
//     status: LoadingType.IDLE,
//     error: null,
//   },
// };

// const DocumentSlice = createSlice({
//   name: "documents",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     //Fetch all documents
//     // builder.addCase(getAllDocumentsAction.pending, (state, action) => {
//     //   state.dataPaginate.status = LoadingType.PENDING;
//     //   state.dataPaginate.entities = [];
//     //   state.dataPaginate.pagination = null;
//     //   state.dataPaginate.error = null;
//     // }).addCase(getAllDocumentsAction.fulfilled, (state, action) => {
//     //   state.dataPaginate.status = LoadingType.SUCCESS;
//     //   state.dataPaginate.entities = action.payload.data.documents.map((doc) => ({
//     //     ...doc,
//     //     filePath: doc.filePath ? doc.filePath : "/default-image.png",
//     //   }));
//     //   state.dataPaginate.entities = action.payload.data;
//     //   state.create.error = null;

//     // }).addCase(getAllDocumentsAction.rejected, (state, action) => {
//     //   state.dataPaginate.status = LoadingType.REJECTED;
//     //   state.dataPaginate.entities = [];
//     //   state.dataPaginate.pagination = null;
//     //   state.dataPaginate.error = "Something went wrong";
//     // });

//     // Create Document
//     builder
//       .addCase(createDocumentAction.pending, (state) => {
//         state.create.status = LoadingType.PENDING;
//         state.create.entities = null;
//         state.create.error = null;
//       })
//       .addCase(createDocumentAction.fulfilled, (state, action) => {
//         state.create.status = LoadingType.SUCCESS;
//         state.create.entities = action.payload.data;
//         state.create.error = null;
//       })
//       .addCase(createDocumentAction.rejected, (state, action) => {
//         state.create.status = LoadingType.REJECTED;
//         state.create.entities = null;
//         state.create.error = action.error.message || "Failed to create doc (slice).";
//       });

//     // Update Document
//     // builder
//     //   .addCase(uploadNewVersionDocumentAction.pending, (state) => {
//     //     state.update.status = LoadingType.PENDING;
//     //     state.update.entities = null;
//     //     state.update.error = null;
//     //   })
//     //   .addCase(uploadNewVersionDocumentAction.fulfilled, (state, action) => {
//     //     state.update.status = LoadingType.SUCCESS;
//     //     state.update.entities = action.payload.data;
//     //     state.update.error = null;

//     //     // Update the doc list
//     //     const updatedDocument = action.payload.data;
//     //     state.dataPaginate.entities = state.dataPaginate.entities.map((doc) =>
//     //       doc.id === updatedDocument.id ? updatedDocument : doc
//     //     );
//     //   })
//     //   .addCase(uploadNewVersionDocumentAction.rejected, (state, action) => {
//     //     state.update.status = LoadingType.REJECTED;
//     //     state.update.entities = null;
//     //     state.update.error = action.payload || "Failed to update doc";
//     //   });

//     builder
//       .addCase(softDeleteDocumentAction.fulfilled, (state, action) => {
//         state.dataPaginate.entities = state.dataPaginate.entities.filter((doc: any) => doc.id !== action.payload.data.id);
//       });


//   }
// });

// export const selectDocumentsWithPagination = (state: RootState) =>
//   state.documents.dataPaginate;

// export const selectCreateDocumentState = (state: RootState) => state.documents.create;
// export const selectUpdateDocumentState = (state: RootState) => state.documents.update;

// export default DocumentSlice;

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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
  }
});

export const { setCurrentDocument } = documentSlice.actions;
export default documentSlice.reducer;