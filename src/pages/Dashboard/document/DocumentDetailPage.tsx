import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../../store';
import { LoadingType } from '../../../models/store';
import { getDocumentById } from '../../../store/document/actions';
import DocumentDetail from '../../../components/document/DocumentDetails';
import Modal from '../../../components/modal/Modal';
import DocumentFormVersions from '../../../components/document/DocumentFormVersion';

const DocumentDetailPage = () => {

    const [showModal, setShowModal] = useState(false);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const { documentId } = useParams<{ documentId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentDocument, status, error } = useSelector((state: RootState) => state.documents);

    console.log("currentDocument: ", currentDocument);

    useEffect(() => {
        if (documentId && currentDocument?.id !== documentId && status !== LoadingType.PENDING) {
            dispatch(getDocumentById(documentId)).unwrap();
        }

    }, [dispatch, documentId, currentDocument?.id, status]);

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
            <div className="flex justify-between mb-6">
                <h1>Document Management</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={() => {
                        setShowModal(true);
                    }}>
                    Upload New Version
                </button>
            </div>
            <DocumentDetail
                onEdit={(doc) => {
                    setEditingDoc(doc);
                    setShowModal(true);
                }}
                document={currentDocument}
            />

            <div>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <div className="p-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                            Upload New Version
                        </h3>
                        <DocumentFormVersions
                            documentId={currentDocument.id}
                            onSuccess={() => setShowModal(false)}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default DocumentDetailPage