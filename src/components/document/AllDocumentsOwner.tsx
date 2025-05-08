
import { useEffect, useState } from 'react';
import { Document } from '../../models/documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import Modal from '../modal/Modal';
import { allDocumentsByOwner, softDeleteDocument } from '../../store/document/actions';
import { LoadingType } from '../../models/store';

const AllDocumentsOwner = ({ onEdit }: { onEdit: (category: any) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    // const user = useSelector<RootState, AuthUser | null>((state) => state.session.currentUser.entities);
    const { items, status, error } = useSelector((state: RootState) => state.documents);

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

    // const allDocumentsByOwner = {}

    useEffect(() => {
        dispatch(allDocumentsByOwner())
    }, [dispatch])

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
                await dispatch(allDocumentsByOwner()).unwrap();
                showSuccess('Document deleted successfully');
            } catch (error: any) {
                await dispatch(allDocumentsByOwner()).unwrap();
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
                            <div className="flex items-start gap-3">
                                <span className="text-3xl">{getFileIcon(doc.filePath)}</span>
                                <div className="flex-1">
                                    <h3 className="font-medium truncate">{doc.title}</h3>
                                    <p className="text-xs text-gray-500 truncate">
                                        {new Date(doc.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 mt-2">
                                {/* <a
                href={doc.filePath}
                download
                className="text-blue-600 hover:text-blue-800"
              >
                Download File
              </a> */}
                                <button
                                    // onClick={() => handleDownload(doc)}
                                    onClick={() => handleDownload(doc.filePath, doc.title)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Download
                                </button>
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

export default AllDocumentsOwner;