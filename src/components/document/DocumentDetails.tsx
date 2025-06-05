import { useState } from 'react';
import { Document } from '../../models/documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import { archiveDocument, getDocumentById, sensitiveDocument, softDeleteDocument } from '../../store/document/actions';
import { LoadingType } from '../../models/store';
import { useNavigate } from 'react-router';
import { UserActivity } from '../user/UserActivity';
import { AccessRightsPanel } from '../user/AccessRightPanel';
import { DocumentComments } from './DocumentComment';
import { DocumentVersions } from './DocumentVersions';
import excellLogo from '../../assets/images/excellogo.jpeg';
import pdfLogo from '../../assets/images/pdflogo.png';
import wordLogo from '../../assets/images/wordlogo.jpeg';
import powerpointLogo from '../../assets/images/powerpointlogo.jpeg';
import { ArchiveIcon, PencilIcon, ShieldIcon, TrashIcon } from 'lucide-react';
import { AuthUser } from '../../models/auth';
import ConfirmationModal from '../modal/ConfirmationModal';

interface DocumentDetailProps {
    document: Document;
    onEdit: (doc: any) => void;
}

const DocumentDetail = ({ onEdit, document }: DocumentDetailProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('activity');
    const { status } = useSelector((state: RootState) => state.documents);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const user = useSelector<RootState, AuthUser | null>(
        (state) => state.session.currentUser.entities
    );

    const isAdmin = user?.role.name === "admin";

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return pdfLogo;
            case 'doc': case 'docx': return wordLogo;
            case 'xls': case 'xlsx': return excellLogo;
            case 'pptx': case 'ppt': return powerpointLogo;
            default: return '📁';
        }
    };

    const handleDelete = async () => {
        if (selectedDoc) {
            try {
                await dispatch(softDeleteDocument(selectedDoc.id)).unwrap();
                navigate(("/dashboard/documents"))
                showSuccess('Document deleted successfully');
            } catch (error: any) {
                await dispatch(getDocumentById(selectedDoc.id)).unwrap();
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
                : 'Document archived successfully'
            );
        } catch (error: any) {
            showError(error || 'Failed to update archive status');
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
        } catch (error: any) {
            showError(error || 'Failed to update sensitivity status');
        }
    };

    return (
        <div>

            <div className="">

                <div className="border rounded-lg p-3 hover:shadow-lg transition-shadow bg-white">
                    {/* Content Section */}
                    <div className="flex flex-col md:flex-row items-start gap-3">
                        {/* Image */}
                        <div className='w-full md:w-40 lg:w-52 border-b-2 md:border-b-0 md:border-r-2 border-slate-100 pb-2 md:pb-0 md:pr-3'>
                            {document.filePath && (
                                <img
                                    src={getFileIcon(document.filePath)}
                                    className='w-52 h-auto rounded-lg mx-auto'
                                    alt="Document thumbnail"
                                />
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 w-full">
                            <h3 className="font-medium text-purple-700 uppercase text-sm md:text-base truncate">
                                {document.title}
                            </h3>

                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 mt-2 text-sm">
                                <p className="text-gray-600 truncate">
                                    <span className="font-medium">Category:</span> {document.category?.name}
                                </p>
                                <p className="text-gray-500 truncate">
                                    <span className="font-medium">Uploaded:</span> {new Date(document.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {document.tags.map((tag, index) => (
                                    <button
                                        key={index}
                                        className="inline-flex items-center bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full hover:bg-purple-200 transition-colors"
                                    >
                                        🔖 {tag}
                                    </button>
                                ))}
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {document.isArchived && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                        🗄 Archived
                                    </span>
                                )}
                                {document.isSensitive && (
                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                        🔒 Sensitive
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                        <div className="text-xs text-gray-500 truncate">
                            Uploaded by: {document.user?.firstName} {document.user?.lastName}
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">
                            <button
                                onClick={handleArchive}
                                disabled={status === LoadingType.PENDING}
                                className="flex items-center text-yellow-600 hover:text-yellow-800 text-sm px-2 py-1 rounded-md transition-colors disabled:opacity-50"
                            >
                                <ArchiveIcon className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline-flex items-center">{document.isArchived ? 'Unarchive' : 'Archive'}</span>
                            </button>

                            <button
                                onClick={handleSensitivity}
                                disabled={status === LoadingType.PENDING}
                                className={`${isAdmin ? '' : 'hidden'} flex items-center text-purple-600 hover:text-purple-800 text-sm px-2 py-1 rounded-md transition-colors disabled:opacity-50`}
                            >
                                <ShieldIcon className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline-flex items-center">{document.isSensitive && document.isSensitive ? 'Mark Normal' : 'Mark Sensitive'}</span>
                            </button>

                            <button
                                onClick={() => onEdit(document)}
                                className="flex items-center text-green-600 hover:text-green-800 text-sm px-2 py-1 rounded-md transition-colors"
                            >
                                <PencilIcon className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedDoc(document);
                                    setShowDeleteModal(true);
                                }}
                                className="flex items-center text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded-md transition-colors"
                            >
                                <TrashIcon className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Delete</span>
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
                {activeTab === 'versions' && <DocumentVersions documentVersion={document} />}



            </div>


            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Confirm User Deletion"
                message={`Are you sure you want to delete ${selectedDoc?.title}?`}
                bgColor="bg-red-600"
                hoverbgColor="hover:bg-red-700"
            />
        </div>
    );
};

export default DocumentDetail;
