// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Document } from '../../models/documents';
// import { setCurrentDocument } from '../../store/document/slice';
// import { fetchDocuments } from '../../store/document/actions';
// import { AppDispatch, RootState } from '../../store';

// const DocumentList = ({ onEdit }: { onEdit: (doc: any) => void }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, status, error } = useSelector((state: RootState) => state.documents);

//   useEffect(() => {
//     dispatch(fetchDocuments());
//   }, [dispatch]);

//   return (
//     <div className="overflow-x-auto">
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((document: Document) => (
//             <tr key={document.id}>
//               <td>{document.title}</td>
//               <td>
//                 <button onClick={() => onEdit(document)}>Edit</button>
//                 <button onClick={() => dispatch(setCurrentDocument(document))}>View</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DocumentList;

// import { useEffect, useState } from 'react';
// import { Document } from '../../models/documents';
// import Modal from '../modal/Modal';
// import { AppDispatch } from '../../store';
// import { useDispatch } from 'react-redux';
// import { fetchDocuments } from '../../store/document/actions';
// interface DocumentListProps {
//   documents: Document[];
// }

// const DocumentList = ({ documents }: DocumentListProps) => {
//   const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
//   const dispatch = useDispatch<AppDispatch>();
//   const getFileIcon = (fileName: string) => {
//     const safeFileName = fileName || 'file';
//     const ext = safeFileName.split('.').pop()?.toLowerCase();
//     switch (ext) {
//       case 'pdf':
//         return '📄';
//       case 'doc':
//       case 'docx':
//         return '📃';
//       case 'xls':
//       case 'xlsx':
//         return '📊';
//       default:
//         return '📁';
//     }
//   };

//   useEffect(() => {
//         dispatch(fetchDocuments());
//       }, [dispatch]);

//   if (!documents || documents.length === 0) {
//     return (
//       <div className="p-4 text-center text-gray-500">
//         No documents found
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {documents.map((doc) => (
//           <div
//             key={doc.id}
//             className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
//           >
//             <div className="flex items-center justify-between mb-2">
//               {doc.filePath && (
//                 <span className="text-2xl">
//                   {getFileIcon(doc.filePath)}
//                 </span>
//               )}
//               <button
//                 onClick={() => setSelectedDoc(doc)}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View
//               </button>
//             </div>
//             <h3 className="font-semibold truncate">{doc.title}</h3>
//             <p className="text-sm text-gray-600 truncate">{doc.description}</p>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {doc.tags?.map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-2 py-1 bg-gray-100 text-sm rounded-full"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <Modal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)}>
//         {selectedDoc && (
//           <div className="p-4 h-full flex flex-col">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">{selectedDoc.title}</h2>
//               <button
//                 onClick={() => setSelectedDoc(null)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="flex-1">
//               {selectedDoc.filePath.endsWith('.pdf') ? (
//                 <iframe
//                   src={selectedDoc.filePath}
//                   className="w-full h-full border-none"
//                   title={selectedDoc.title}
//                 />
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full">
//                   <span className="text-4xl mb-4">{getFileIcon(selectedDoc.filePath)}</span>
//                   <a
//                     href={selectedDoc.filePath}
//                     download
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Download File
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default DocumentList;

import { useEffect, useState } from 'react';
import { Document } from '../../models/documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import Modal from '../modal/Modal';
import { fetchDocuments, softDeleteDocument } from '../../store/document/actions';
import { LoadingType } from '../../models/store';
import { useNavigate } from 'react-router';

const DocumentList = ({ onEdit }: { onEdit: (doc: any) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const { items, status, error } = useSelector((state: RootState) => state.documents);
  const navigate = useNavigate()

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return '📄';
      case 'doc': case 'docx': return '📝';
      case 'xls': case 'xlsx': return '📊';
      case 'jpg': case 'jpeg': case 'png': return '🖼️';
      default: return '📁';
    }
  };

  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  // const fileUrl = `http://127.0.0.1:4000${currentDocument.filePath}`;
  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      showError('Failed to download file');
    }
  };
  // const handleDownload = async (doc: Document) => {
  //   try {
  //     // Use proper download endpoint
  //     const response = await fetch(`/api/documents/download/${encodeURIComponent(doc.filePath)}`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });

  //     if (!response.ok) throw new Error('Download failed');

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;

  //     // Get filename from Content-Disposition header
  //     const contentDisposition = response.headers.get('Content-Disposition');
  //     const fileNameMatch = contentDisposition?.match(/filename="?(.+?)"?$/);
  //     const fileName = fileNameMatch ? fileNameMatch[1] : doc.title;

  //     a.download = fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     showError('Failed to download document');
  //   }
  // };
  const handleDelete = async (docId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await dispatch(softDeleteDocument(docId)).unwrap();
        await dispatch(fetchDocuments()).unwrap();
        showSuccess('Document deleted successfully');
      } catch (error: any) {
        await dispatch(fetchDocuments()).unwrap();
        showError(error || 'Failed to delete document');
      }
    }
  };


  if (status === LoadingType.PENDING) return <div>Loading documents...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!Array.isArray(items)) return <div className="text-red-500">Invalid documents data</div>;

  return (
    <div className="p-4">
      {/* WhatsApp-style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(items) &&
          items.map((doc: Document) => (
            <div
              key={doc.id}
              className="border rounded-lg p-3 hover:shadow-lg transition-shadow bg-white"
            >
              <div>
                <iframe
                  src={`http://127.0.0.1:4000/${doc.filePath}`}
                  width="100%"
                  height="200px"
                />
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">{getFileIcon(doc.filePath)}</span>
                <div className="flex-1">
                  <h3 className="font-medium truncate">{doc.title}</h3>
                  <p className="text-xs text-gray-500 truncate">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                uploaded by: {doc.user?.firstName} {doc.user?.lastName}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-2 text-sm">
                <a
                  // href={doc.filePath}
                  href={`http://127.0.0.1:4000/${doc.filePath}`}
                  download
                  className="text-blue-600 hover:text-blue-800"
                >
                  Download
                </a>
                <button
                  // onClick={() => handleDownload(doc)}
                  onClick={() => navigate(`${doc.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Details
                </button>
                {/* <button
                  // onClick={() => handleDownload(doc)}
                  onClick={() => handleDownload(doc.filePath, doc.title)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Download
                </button> */}
                <button
                  onClick={() => onEdit(doc)}
                  className="text-green-600 hover:text-green-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Preview Modal */}
      <Modal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)}>
        {selectedDoc && (
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedDoc.title}</h2>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1">
              {selectedDoc.filePath.endsWith('.pdf') ? (
                <iframe
                  src={selectedDoc.filePath}
                  className="w-full h-full border-none"
                  title={selectedDoc.title}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-4xl mb-4">
                    {getFileIcon(selectedDoc.filePath)}
                  </span>
                  <button
                    onClick={() => handleDownload(selectedDoc.filePath, selectedDoc.title)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DocumentList;

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Document } from '../../models/documents';
// import { setCurrentDocument } from '../../store/document/slice';
// import { fetchDocuments } from '../../store/document/actions';
// import { AppDispatch, RootState } from '../../store';
// import FileViewerWrapper from '../FileViewerWrapper';

// const FileViewer = ({ filePath }: { filePath: string }) => {
//   if (!filePath) return null;
//   return (
//     <iframe
//       src={filePath}
//       title="File Preview"
//       className="w-full h-[500px] border mt-4"
//     ></iframe>
//   );
// };

// const DocumentList = ({ onEdit }: { onEdit: (doc: any) => void }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, status, error } = useSelector((state: RootState) => state.documents);
//   const { currentDocument } = useSelector((state: RootState) => state.documents);
//   const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details');

//   useEffect(() => {
//     dispatch(fetchDocuments());
//   }, [dispatch]);

//   return (
//     <div>
//       <div className="overflow-x-auto">
//         <table className="w-full table-auto">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-2">Title</th>
//               <th className="p-2">Tags</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((document: Document) => (
//               <tr key={document.id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{document.title}</td>
//                 <td className="p-2 space-x-1">
//                   {document.tags.map((tag, i) => (
//                     <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
//                       {tag}
//                     </span>
//                   ))}
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button onClick={() => onEdit(document)} className="text-sm bg-yellow-400 px-3 py-1 rounded">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       dispatch(setCurrentDocument(document));
//                       setActiveTab('details');
//                     }}
//                     className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {currentDocument && (
//         <div className="mt-6">
//           <div className="flex space-x-4 border-b">
//             <button
//               className={`py-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
//               onClick={() => setActiveTab('details')}
//             >
//               Details
//             </button>
//             <button
//               className={`py-2 px-4 ${activeTab === 'preview' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
//               onClick={() => setActiveTab('preview')}
//             >
//               Preview
//             </button>
//           </div>

//           {/* {activeTab === 'details' ? (
//             <div className="p-4">
//               <h2 className="text-xl font-bold">{currentDocument.title}</h2>
//               <p className="mt-2 text-gray-600">{currentDocument.description}</p>
//               <div className="mt-2">
//                 <strong>Tags:</strong>{' '}
//                 {currentDocument.tags.map((tag: any, i: number) => (
//                   <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-1">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <FileViewer filePath={currentDocument.filePath} />
//           )} */}

//           {activeTab === 'preview' && (
//             <FileViewerWrapper filePath={currentDocument.filePath} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentList;


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store';
// import { fetchDocuments } from '../../store/document/actions';
// import { Document } from '../../models/documents';

// const getColorByTag = (tag: string) => {
//   const colors = [
//     'bg-blue-100 text-blue-800 border-blue-300',
//     'bg-green-100 text-green-800 border-green-300',
//     'bg-yellow-100 text-yellow-800 border-yellow-300',
//     'bg-purple-100 text-purple-800 border-purple-300',
//     'bg-pink-100 text-pink-800 border-pink-300',
//   ];
//   const index = tag.charCodeAt(0) % colors.length;
//   return colors[index];
// };

// const DocumentList = ({ onEdit }: { onEdit: (doc: Document) => void }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, currentDocument, status, error } = useSelector((state: RootState) => state.documents);
//   const [filterTag, setFilterTag] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(fetchDocuments());
//   }, [dispatch]);

//   const handleTagClick = (tag: string) => {
//     setFilterTag(prev => (prev === tag ? null : tag));
//   };

//   const filteredItems = filterTag
//     ? items.filter(doc => doc.tags.includes(filterTag))
//     : items;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
//       <div className="overflow-x-auto border rounded-lg shadow-sm">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
//             <tr>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Tags</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {filteredItems.map((document: Document) => (
//               <tr key={document.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 font-medium">{document.title}</td>
//                 <td className="px-4 py-2">
//                   <div className="flex flex-wrap gap-1">
//                     {document.tags.map((tag, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleTagClick(tag)}
//                         className={`px-2 py-1 text-xs rounded-full border ${getColorByTag(tag)} hover:brightness-105 transition`}
//                       >
//                         🔖 {tag}
//                       </button>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-4 py-2 space-x-2">
//                   <button
//                     className="text-sm text-blue-600 hover:underline"
//                     onClick={() => onEdit(document)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="text-sm text-green-600 hover:underline"
//                     // onClick={() => dispatch(setCurrentDocument(document))}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filterTag && (
//           <div className="p-2 text-sm text-gray-600">
//             Filtering by tag: <strong>{filterTag}</strong>{' '}
//             <button className="ml-2 text-blue-500" onClick={() => setFilterTag(null)}>
//               Clear
//             </button>
//           </div>
//         )}
//       </div>

//       {/* File Viewer Panel */}
//       <div className="border rounded-lg p-4 shadow-sm bg-white">
//         {currentDocument ? (
//           <>
//             <h2 className="text-lg font-bold mb-2">{currentDocument.title}</h2>
//             <p className="mb-4 text-sm text-gray-600">{currentDocument.description}</p>
//             <iframe
//               src={currentDocument.filePath}
//               className="w-full h-[500px] border"
//               title={currentDocument.title}
//             />
//             <div className="mt-4">
//               <h3 className="font-semibold mb-1">Tags:</h3>
//               <div className="flex flex-wrap gap-2">
//                 {currentDocument.tags.map((tag: any, index: number) => (
//                   <span
//                     key={index}
//                     className={`px-3 py-1 text-sm rounded-full border ${getColorByTag(tag)}`}
//                   >
//                     🔖 {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500 text-center">Select a document to view</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DocumentList;
