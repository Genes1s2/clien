// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router';
// import { AppDispatch, RootState } from '../../../store';
// import { LoadingType } from '../../../models/store';
// import { getDocumentById } from '../../../store/document/actions';
// import DocumentDetail from '../../../components/document/DocumentDetails';
// import Modal from '../../../components/modal/Modal';
// import DocumentFormVersions from '../../../components/document/DocumentFormVersion';
// import DocumentFormComments from '../../../components/document/DocumentFormComment';
// import DocumentFormAccess from '../../../components/document/DocumentFormAccess';

// const DocumentDetailPage = () => {

//     const [showModal, setShowModal] = useState(false);
//     const [editingDoc, setEditingDoc] = useState<Document | null>(null);
//     const { documentId } = useParams<{ documentId: string }>();
//     const dispatch = useDispatch<AppDispatch>();
//     const { currentDocument, status, error } = useSelector((state: RootState) => state.documents);

//     // console.log("currentDocument: ", currentDocument);

//     useEffect(() => {
//         if (documentId && currentDocument?.id !== documentId && status !== LoadingType.PENDING) {
//             dispatch(getDocumentById(documentId)).unwrap();
//         }

//     }, [dispatch, documentId, currentDocument?.id, status]);

//     if (status === LoadingType.PENDING) {
//         return <div className="text-center p-8">Loading document details...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500 w-full text-center h-screen p-8">{error}</div>;
//     }

//     if (!currentDocument) {
//         return <div className="p-8">Document not found</div>;
//     }


//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <div className="flex justify-between mb-6">
//                 <h1>Document Management</h1>
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
//                     onClick={() => {
//                         setShowModal(true);
//                     }}>
//                     Upload New Version
//                 </button>
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
//                     onClick={() => {
//                         setShowModal(true);
//                     }}>
//                     Comment
//                 </button>
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
//                     onClick={() => {
//                         setShowModal(true);
//                     }}>
//                     Give access
//                 </button>
//             </div>
//             <DocumentDetail
//                 onEdit={(doc) => {
//                     setEditingDoc(doc);
//                     setShowModal(true);
//                 }}
//                 document={currentDocument}
//             />

//             <div>
//                 <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//                     <div className="p-4">

//                         <DocumentFormVersions
//                             documentId={currentDocument.id}
//                             onSuccess={() => {dispatch(getDocumentById(currentDocument.id)); setShowModal(false)}}
//                         />
//                         <DocumentFormComments
//                             documentId={currentDocument.id}
//                             onSuccess={() => { dispatch(getDocumentById(currentDocument.id)); setShowModal(false) }}
//                         />
//                         <DocumentFormAccess
//                             documentId={currentDocument.id}
//                             onSuccess={() => {dispatch(getDocumentById(currentDocument.id)); setShowModal(false)}}
//                         />

//                     </div>
//                 </Modal>
//             </div>
//         </div>
//     )
// }

// export default DocumentDetailPage

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../../store';
import { LoadingType } from '../../../models/store';
import { getDocumentById } from '../../../store/document/actions';
import DocumentDetail from '../../../components/document/DocumentDetails';
import Modal from '../../../components/modal/Modal';
import DocumentFormVersions from '../../../components/document/DocumentFormVersion';
import DocumentFormComments from '../../../components/document/DocumentFormComment';
import DocumentFormAccess from '../../../components/document/DocumentFormAccess';
import DocumentForm from '../../../components/document/DocumentForm';

type ActiveForm = 'version' | 'comment' | 'access' | null;

const DocumentDetailPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeForm, setActiveForm] = useState<ActiveForm>(null);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const { documentId } = useParams<{ documentId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentDocument, status, error } = useSelector((state: RootState) => state.documents);

    useEffect(() => {
        if (documentId && currentDocument?.id !== documentId && status !== LoadingType.PENDING) {
            dispatch(getDocumentById(documentId)).unwrap();
        }
    }, [dispatch, documentId, currentDocument?.id, status]);

    const closeModal = () => {
        setActiveForm(null);
        setEditingDoc(null);
    };

    const handleSuccess = () => {
        dispatch(getDocumentById(currentDocument?.id || ''));
        closeModal();
    };

    if (status === LoadingType.PENDING) {
        return <div className="text-center p-8">Loading document details...</div>;
    }

    if (error) {
        return <div className="text-red-500 w-full text-center h-screen p-8">{error}</div>;
    }

    if (!currentDocument) {
        return <div className="p-8">Document not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex gap-4 mb-6">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold py-1 px-3 rounded-lg"
                    onClick={() => setActiveForm('version')}
                >
                    Upload New Version
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-sm text-white font-semibold py-1 px-3 rounded-lg"
                    onClick={() => setActiveForm('comment')}
                >
                    Add Comment
                </button>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-sm text-white font-semibold py-1 px-3 rounded-lg"
                    onClick={() => setActiveForm('access')}
                >
                    Manage Access
                </button>
            </div>

            {/* <DocumentDetail
                onEdit={(doc) => {
                    setEditingDoc(doc);
                    setActiveForm('edit');
                }}
                document={currentDocument}
            /> */}

            <DocumentDetail
                onEdit={(doc) => {
                    setEditingDoc(doc);
                    setShowModal(true);
                }}
                document={currentDocument}
            />

            {/* Version Upload Modal */}
            <Modal isOpen={activeForm === 'version'} onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Upload New Version
                    </h3>
                    <DocumentFormVersions
                        documentId={currentDocument.id}
                        onSuccess={handleSuccess}
                    />
                </div>
            </Modal>

            {/* Comment Modal */}
            <Modal isOpen={activeForm === 'comment'} onClose={closeModal}>
                <div className="p-4">

                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Add Comment
                    </h3>
                    <DocumentFormComments
                        documentId={currentDocument.id}
                        onSuccess={handleSuccess}
                    />
                </div>
            </Modal>

            {/* Access Management Modal */}
            <Modal isOpen={activeForm === 'access'} onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Manage Access Rights
                    </h3>
                    <DocumentFormAccess
                        documentId={currentDocument.id}
                        onSuccess={handleSuccess}
                    />
                </div>
            </Modal>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="p-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {editingDoc ? 'Edit Category' : 'Create New Category'}
                    </h3>
                    <DocumentForm
                        existingDocument={editingDoc}
                        onSuccess={() => setShowModal(false)}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default DocumentDetailPage;