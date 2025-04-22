// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { createDocumentAction, uploadNewVersionDocumentAction } from "../../../store/document/actions";
// import { getAllCategoriesWithPaginationAction } from "../../../store/categories/actions";
// import { selectCategoriesWithPagination } from "../../../store/categories/slice";
// import { AppDispatch } from "../../../store";
// import { Category } from "../../../models/category";
// import { Document, CreateDocumentInput } from "../../../models/documents";
// import Input from "../../../components/Input";

// interface DocumentFormProps {
//   toggleModal: () => void;
//   document?: Document | null; // Optional prop for editing a document
// }

// const DocumentForm: React.FC<DocumentFormProps> = ({ toggleModal, document }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const categories = useSelector(selectCategoriesWithPagination);
//   const [loading, setLoading] = useState(false);
//   const [filePathPreview, setImagePreview] = useState<string | null>(document ? `http://127.0.0.1:4000${document.filePath}` : null);

//   useEffect(() => {
//     dispatch(getAllCategoriesWithPaginationAction({}));
//   }, [dispatch]);

//   const initialValues: CreateDocumentInput = {
//     title: document?.title || "",
//     // description: document?.description || "",
//     filePath: "",
//     categoryId: document?.categoryId || "0",
//   };

//   const validationSchema = yup.object().shape({
//     title: yup.string().required("Veuillez entré le titre"),
//     // description: yup.string().required("Description is required"),
//     filePath: document ? yup.mixed() : yup.mixed().required("Aucun fichier chargé."), // Image is required only for new documents
//     categoryId: yup.number().moreThan(0, "Veuillez selectioner une categorie. "),
//   });

//   const handleFormSubmit = async (values: CreateDocumentInput) => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("name", values.title);
//       // formData.append("description", values.description);
//       formData.append("categoryId", values.categoryId.toString());

//       if (values.filePath) {
//         formData.append("filePath", values.filePath);
//       }

//       if (document) {
//         // If editing, send an update request
//         formData.append("id", document.id.toString());
//         await dispatch(uploadNewVersionDocumentAction({ id: document.id, formData })).unwrap();
//         alert("Document updated successfully!");
//       } else {
//         // If creating, send a create request
//         await dispatch(createDocumentAction(formData)).unwrap();
//         alert("Document created successfully!");
//       }

//       toggleModal();
//     } catch (err) {
//       console.error("Failed to save document:", err);
//       alert("Failed to save document!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg w-96">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">{document ? "Edit Document" : "Add New Document"}</h2>
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
//           {({ setFieldValue, errors, touched }) => (
//             <Form>
//               <Input label="Nom du document" name="title" type="text" isRequired errorMessage={touched.title && errors.title} />

//               {/* <Input
//                 label="Description"
//                 name="description"
//                 type="text"
//                 isRequired
//                 errorMessage={touched.description && errors.description}
//               /> */}

//               {/* file Upload Field */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold text-blue-600">Document Image</label>
//                 <input
//                   type="file"
//                   accept="file/*"
//                   onChange={(event) => {
//                     const file = event.currentTarget.files?.[0] || null;
//                     setFieldValue("filePath", file);
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onload = () => setImagePreview(reader.result as string);
//                       reader.readAsDataURL(file);
//                     }
//                   }}
//                   className="w-full p-2 border rounded"
//                 />
//                 {filePathPreview && (
//                   <img src={filePathPreview} alt="Preview" className="mt-2 rounded-md w-full h-32 object-cover" />
//                 )}
//                 {touched.filePath && errors.filePath && <small className="text-red-600">{errors.filePath}</small>}
//               </div>

//               {/* Category Selection */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold text-blue-600">Category</label>
//                 <Field as="select" name="categoryId" className="w-full p-2 border rounded">
//                   <option value={0}>Select a category</option>
//                   {categories.entities && categories.entities.map((category: Category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </Field>
//                 {touched.categoryId && errors.categoryId && <small className="text-red-600">{errors.categoryId}</small>}
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={toggleModal}
//                   className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//                 >
//                   {loading ? (document ? "Updating..." : "Saving...") : document ? "Update" : "Create"}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default DocumentForm;

import React from 'react'

const DocumentForm = () => {
  return (
    <div>DocumentForm</div>
  )
}

export default DocumentForm