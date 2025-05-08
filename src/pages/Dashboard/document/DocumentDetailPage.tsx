import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../../store';
import { LoadingType } from '../../../models/store';
import { getDocumentById } from '../../../store/document/actions';
import DocumentDetail from '../../../components/document/DocumentDetails';
import Modal from '../../../components/modal/Modal';
import DocumentForm from '../../../components/document/DocumentForm';
import { showError } from '../../../utils/Notifications';

const DocumentDetailPage = () => {

    const [showModal, setShowModal] = useState(false);
    const [editingDoc, setEditingDoc] = useState<Document | null>(null);
    const { documentId } = useParams<{ documentId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentDocument, status, error } = useSelector((state: RootState) => state.documents);

    console.log("currentDocument: ", currentDocument);
    
    useEffect(() => {
try {
    if (documentId && currentDocument?.id !== documentId && status !== LoadingType.PENDING) {
        dispatch(getDocumentById(documentId)).unwrap();
    }
} catch (error: any) {
    showError(error || "Failed to get document")
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
        <div>
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
                            {editingDoc ? 'Edit Category' : 'Create New Category'}
                        </h3>
                        <DocumentForm
                            existingDocument={editingDoc}
                            onSuccess={() => setShowModal(false)}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default DocumentDetailPage