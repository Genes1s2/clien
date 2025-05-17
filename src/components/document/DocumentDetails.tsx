import { useEffect, useState } from 'react';
import { Document } from '../../models/documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import Modal from '../modal/Modal';
import { archiveDocument, fetchDocuments, getDocumentById, sensitiveDocument, softDeleteDocument, uploadNewVersionDocument } from '../../store/document/actions';
import { LoadingType } from '../../models/store';
import { useNavigate } from 'react-router';
import { UserActivity } from '../user/UserActivity';
import { AccessRightsPanel } from '../user/AccessRightPanel';
import { DocumentComments } from './DocumentComment';
import { DocumentVersions } from './DocumentVersions';
import DocumentFormVersions from './DocumentFormVersion';

interface DocumentDetailProps {
    document: Document;
    onEdit: (doc: any) => void;
}

const DocumentDetail = ({ onEdit, document }: DocumentDetailProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('activity');
    const { status } = useSelector((state: RootState) => state.documents);

    const getFileIcon = (fileName: string) => {
        const ext = fileName && fileName?.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return '📄';
            case 'doc': case 'docx': return '📝';
            case 'xls': case 'xlsx': return '📊';
            case 'jpg': case 'jpeg': case 'png': return '🖼️';
            default: return '📁';
        }
    };

    const handleDelete = async (docId: string) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await dispatch(softDeleteDocument(docId)).unwrap();
                navigate(("/dashboard/documents"))
                showSuccess('Document deleted successfully');
            } catch (error: any) {
                await dispatch(getDocumentById(docId)).unwrap();
                showError(error || 'Failed to delete document');
            }
        }
    };

    const handleArchive = async () => {
        try {
            await dispatch(archiveDocument({
                documentId: document.id,
                isArchived: !document.isArchived
            })).unwrap();
            dispatch(getDocumentById(document.id)).unwrap();

            showSuccess(document.isArchived
                ? 'Document unarchived successfully'
                : 'Document archived successfully');
        } catch (error) {
            showError('Failed to update archive status');
        }
    };

    const handleSensitivity = async () => {
        try {
            await dispatch(sensitiveDocument({
                documentId: document.id,
                isSensitive: !document.isSensitive
            })).unwrap();
            dispatch(getDocumentById(document.id)).unwrap();

            showSuccess(document.isSensitive
                ? 'Document marked as normal'
                : 'Document marked as sensitive');
        } catch (error) {
            showError('Failed to update sensitivity status');
        }
    };

    return (
        <div>

            <div className="">

                <div className="border rounded-lg p-3 hover:shadow-lg transition-shadow bg-white" >
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">{getFileIcon(document.filePath)}</span>
                        <div className="flex-1">
                            <h3 className="font-medium truncate">{document.title}</h3>
                            <p className="text-xs text-gray-500 truncate">
                                {new Date(document.createdAt).toLocaleDateString()}
                                {document.isArchived && ' (Archived)'}
                                {document.isSensitive && ' (Sensitive)'}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between item-center gap-2 mt-2">

                        <div className="text-xs text-gray-500 truncate">
                            uploaded by: {document.user?.firstName} {document.user?.lastName}
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={handleArchive}
                                disabled={status === LoadingType.PENDING}
                                className={`text-yellow-600 hover:text-yellow-800 text-sm ${status === LoadingType.PENDING ? 'opacity-50' : ''
                                    }`}
                            >
                                {document.isArchived ? 'Unarchive' : 'Archive'}
                            </button>
                            <button
                                onClick={handleSensitivity}
                                disabled={status === LoadingType.PENDING}
                                className={`text-purple-600 hover:text-purple-800 text-sm ${status === LoadingType.PENDING ? 'opacity-50' : ''
                                    }`}
                            >
                                {document.isSensitive ? 'Mark Normal' : 'Mark Sensitive'}
                            </button>
                            <button
                                onClick={() => onEdit(document)}
                                className="text-green-600 hover:text-green-800 text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(document.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="flex overflow-x-auto my-4 sm:my-6 bg-white shadow-md rounded-lg 
               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="flex flex-nowrap min-w-max">
                        {['activity', 'access', 'comments', 'versions'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium transition-colors
                   duration-200 whitespace-nowrap ${activeTab === tab
                                        ? 'text-white bg-purple-600 border-b-4 border-purple-400'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, (str) => str.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Tab Content */}
                {activeTab === 'activity' && <UserActivity auditLogs={document.auditLogs} />}
                {activeTab === 'access' && <AccessRightsPanel accessRights={document.accessLogs} />}
                {activeTab === 'comments' && <DocumentComments comment={document.comments} />}
                {activeTab === 'versions' && <DocumentVersions version={document.versions} />}



            </div>
        </div>
    );
};

export default DocumentDetail;
