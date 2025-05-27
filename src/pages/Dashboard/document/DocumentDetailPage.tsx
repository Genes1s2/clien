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
import { Download, EyeIcon, LockOpenIcon, Text, UploadIcon } from 'lucide-react';
import { showError } from '../../../utils/Notifications';

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

    if (status === LoadingType.PENDING) {
        return <div className="text-center p-8">Loading document details...</div>;
    }

    if (error) {
        return <div className="text-red-500 w-full text-center h-screen p-8">{error}</div>;
    }

    if (!currentDocument) {
        return <div className="p-8">Document not found</div>;
    }

     const handleDownload = async (filePath: string, fileName: string) => {
    
            const viewerUrl = `http://127.0.0.1:4000${currentDocument?.filePath}`;
            try {
                const response = await fetch(viewerUrl);
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

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 bg-white p-3 rounded-lg ">
                <button
                    className="bg-purple-200 hover:bg-purple-300 text-purple-700 font-semibold p-2 rounded-lg transition-colors flex justify-center items-center flex-shrink-0"
                    onClick={() => setActiveForm('version')}
                >
                    <UploadIcon className="w-4 h-4 mr-1 md:mr-2" />
                    <span>New Version</span>
                </button>

                <button
                    className="bg-green-200 hover:bg-green-300 text-green-700 font-semibold p-2 rounded-lg transition-colors flex justify-center items-center flex-shrink-0"
                    onClick={() => setActiveForm('comment')}
                >
                    <Text className="w-4 h-4 mr-1 md:mr-2" />
                    <span>Add Comment</span>
                </button>

                <button
                    className="bg-purple-200 hover:bg-purple-300 text-purple-700 font-semibold p-2 rounded-lg transition-colors flex justify-center items-center flex-shrink-0"
                    onClick={() => setActiveForm('access')}
                >
                    <LockOpenIcon className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden xs:inline">Manage</span> Access
                </button>

                <button
                    className="bg-orange-200 hover:bg-orange-300 text-orange-700 font-semibold p-2 rounded-lg transition-colors flex justify-center items-center flex-shrink-0"
                    onClick={() => setActiveForm('view')}
                >
                    <EyeIcon className="w-4 h-4 mr-1 md:mr-2" />
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
                        <button
                            onClick={() => handleDownload(currentDocument.filePath, currentDocument.title)}
                            className="flex gap-2 bg-purple-600 text-white mt-2 px-4 py-2 rounded hover:bg-purple-700"
                        >
                            <Download size={22} /> Download File
                        </button>
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