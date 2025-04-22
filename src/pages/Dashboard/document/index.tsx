// import React, { useEffect, useState } from "react";
// import Card from "../../../components/Card";
// import Pagination from "../../../components/Pagination";
// import TableContainer from "../../../components/TableContainer";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../../../store";
// import { LoadingType } from "../../../models/store";
// import DocumentForm from "./DocumentForm";
// import { selectCreateDocumentState, selectDocumentsWithPagination, selectUpdateDocumentState } from "../../../store/document/slice";
// import { softDeleteDocumentAction } from "../../../store/document/actions";

// const DocumentList = () => {
//   const documents = useSelector(selectDocumentsWithPagination);
//   const createState = useSelector(selectCreateDocumentState);
//   const updateState = useSelector(selectUpdateDocumentState);
//   const dispatch = useDispatch<AppDispatch>();

//   const [showModal, setShowModal] = useState(false);
//   const [editDocument, setEditDocument] = useState(null);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//     // setEditDocument(null);
//   };

//   useEffect(() => {
//     if (createState.status === LoadingType.SUCCESS || updateState.status === LoadingType.SUCCESS) {
//       // dispatch(getAllDocumentsAction({}));
//       setShowModal(false);
//       setEditDocument(null);
//     }
//   }, [createState.status, updateState.status, dispatch]);

//   // useEffect(() => {
//   //     dispatch(getAllDocumentsAction({}));
//   // }, [dispatch]);

//   const handleEdit = (document: any) => {
//     setEditDocument(document);
//     toggleModal();
//   };

//   const handleDelete = async (coursId: any) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this document?");
//     if (!isConfirmed) return;

//     try {
//       await dispatch(softDeleteDocumentAction(coursId)).unwrap();
//       alert("Document deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       alert("Failed to delete document.");
//     }
//   };

//   return (
//     <div>
//       {showModal && <DocumentForm toggleModal={toggleModal} document={editDocument} />}
//       <Card>
//         <div className="flex flex-row justify-between">
//           <h4>Add, update, delete and filter </h4>
//           <div className="flex flex-row gap-2">
//             <button onClick={toggleModal} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
//               Add Document
//             </button>
//           </div>
//         </div>

//         <TableContainer>
//           <thead>
//             <tr className="bg-hovercolor px-8 flex flex-row gap-20">
//               <th scope="col" className="py-4">Image</th>
//               <th scope="col" className="py-4">ID</th>
//               <th scope="col" className="py-4">Name</th>
//               <th scope="col" className="py-4">Description</th>
//               <th scope="col" className="py-4">Created At</th>
//               <th scope="col" className="py-4">Updated At</th>
//               <th scope="col" className="py-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="flex flex-col table-auto">
//             {documents.entities.map((document: any) => (
//               <tr
//                 className="bg-white border-b flex items-center px-8 gap-20 whitespace-nowrap dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 key={document.id}
//               >
//                 <td className="py-4">
//                   <img
//                     src={`http://127.0.0.1:4000${document.image}`}
//                     alt={document.name}
//                     onError={(e) => (e.currentTarget.src = "/default-image.png")}
//                     className="w-10 h-10 rounded-full"
//                   />
//                 </td>
//                 <th className="py-4">{document.id}</th>
//                 <td className="py-4 first-letter:capitalize">{document.name}</td>
//                 <td className="py-4 first-letter:capitalize">{document.description.substring(0, 20)}</td>
//                 <td className="py-4 first-letter:capitalize">{new Date(document.createdAt).toLocaleDateString()}</td>
//                 <td className="py-4 first-letter:capitalize">{new Date(document.updatedAt).toLocaleDateString()}</td>
//                 <td className="py-4">
//                   <button
//                     className="font-medium text-blue-600 dark:text-blue-600 hover:underline"
//                     onClick={() => handleEdit(document)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="font-medium text-red-600 dark:text-red-600 hover:underline ms-3"
//                     onClick={() => handleDelete(document)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </TableContainer>
//         <Pagination />
//       </Card>
//     </div>
//   );
// };

// export default DocumentList;

import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index