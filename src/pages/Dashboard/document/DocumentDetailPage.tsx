import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../../store';
import { LoadingType } from '../../../models/store';
import { getDocumentById } from '../../../store/document/actions';
import DocumentDetail from '../../../components/document/DocumentDetails';
import Modal, { ModalPreview } from '../../../components/modal/Modal';
import DocumentFormVersions from '../../../components/document/DocumentFormVersion';
import DocumentFormComments from '../../../components/document/DocumentFormComment';
import DocumentFormAccess from '../../../components/document/DocumentFormAccess';
import DocumentForm from '../../../components/document/DocumentForm';
import DocumentViewer from '../../../components/DocumentViewer';

type ActiveForm = 'version' | 'comment' | 'access' | 'view' | null;

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
    // console.log("currentDocument: ", currentDocument);

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
                <button
                    className="bg-orange-600 hover:bg-orange-700 text-sm text-white font-semibold py-1 px-3 rounded-lg"
                    onClick={() => setActiveForm('view')}
                >
                    Preview
                </button>
            </div>

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

            {/* View Modal */}
            <ModalPreview isOpen={activeForm === 'view'} onClose={closeModal}>
                <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                 <span className='text-2xl text-purple-600 capitalize'>{currentDocument?.title}</span>
                            </h3>
                    </div>
                    <div className="max-h-[80vh] overflow-hidden rounded-lg">
                        <DocumentViewer fileUrl={currentDocument.filePath} />
                    </div>
                </div>
            </ModalPreview>

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