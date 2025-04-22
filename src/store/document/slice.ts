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

export const wait = 12345