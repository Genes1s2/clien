import { useEffect, useState } from 'react';
import { Document } from '../../models/documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import Modal from '../modal/Modal';
import { fetchDocuments, getDocumentById, softDeleteDocument } from '../../store/document/actions';
import { LoadingType } from '../../models/store';
import { useNavigate } from 'react-router';
import { UserActivity } from '../user/UserActivity';
import { AccessRightsPanel } from '../user/AccessRightPanel';

interface DocumentDetailProps {
    document: Document;
    onEdit: (doc: any) => void;
}

const DocumentDetail = ({ onEdit, document }: DocumentDetailProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('activity');

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

    return (
        <div className="p-4">

            <div className="">

                <div className="border rounded-lg p-3 hover:shadow-lg transition-shadow bg-white" >
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">{getFileIcon(document.filePath)}</span>
                        <div className="flex-1">
                            <h3 className="font-medium truncate">{document.title}</h3>
                            <p className="text-xs text-gray-500 truncate">
                                {new Date(document.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between item-center gap-2 mt-2">

                        <div className="text-xs text-gray-500 truncate">
                            uploaded by: {document.user?.firstName} {document.user?.lastName}
                        </div>
                        {/* <a
                href={doc.filePath}
                download
                className="text-blue-600 hover:text-blue-800"
              >
                Download File
              </a> */}
                        {/* <button
                  // onClick={() => handleDownload(doc)}
                  onClick={() => handleDownload(doc.filePath, doc.title)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Download
                </button> */}
                        <div className='flex gap-2'>
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
                      <nav className="flex space-x-4 mb-6 border-b border-gray-200">
                        <button
                          onClick={() => setActiveTab('activity')}
                          className={`pb-4 px-1 ${activeTab === 'activity'
                            ? 'border-b-2 border-purple-500 text-purple-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                          Activity Log
                        </button>
                        <button
                          onClick={() => setActiveTab('access')}
                          className={`pb-4 px-1 ${activeTab === 'access'
                            ? 'border-b-2 border-purple-500 text-purple-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                          Access Rights
                        </button>
                      </nav>
                
                      {/* Tab Content */}
                      {activeTab === 'activity' && <UserActivity auditLogs={document.auditLogs} />}
                      {activeTab === 'access' && <AccessRightsPanel accessRights={document.accessLogs} />}
                


            </div>
        </div>
    );
};

export default DocumentDetail;
