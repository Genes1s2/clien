import React, { useState } from 'react';
import { Download, EyeIcon } from 'lucide-react';
import { Document, DocumentVersion } from '../../models/documents';
import excellLogo from '../../assets/images/excellogo.jpeg';
import pdfLogo from '../../assets/images/pdflogo.png';
import wordLogo from '../../assets/images/wordlogo.jpeg';
import powerpointLogo from '../../assets/images/powerpointlogo.jpeg';
import { ModalPreview } from '../modal/Modal';
import DocumentViewer from '../DocumentViewer';
import { showError } from '../../utils/Notifications';

interface DocumentVersionProps {
    documentVersion: Document
}

export const DocumentVersions = ({ documentVersion }: DocumentVersionProps) => {
    const [previewDoc, setPreviewDoc] = useState<DocumentVersion | null>(null);
    const versions = documentVersion?.versions || [];

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

    const handleDownload = async (filePath: string, fileName: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:4000${filePath}`);
            // Check if the response is ok (status 200-299)
            console.log('Download response:', response);

            if (!response.ok) throw new Error('File not found');

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
            console.log('Download error:', error);
            showError('Failed to download file');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Versions
            </h3>

            <div className="space-y-4">
                {versions.length > 0 ? (
                    versions.map((version, index) => (
                        <div key={version.id} className="border-l-4 border-purple-200 pl-4">
                            <div className="flex md:items-center gap-3">
                                <div className="bg-purple-200 w-10 h-10 font-medium text-purple-700 text-center rounded-full flex items-center justify-center">
                                    v-{version.versionNumber}
                                </div>

                                <div className='md:flex items-center gap-4 w-full'>
                                    <div>
                                        {version.filePath && (
                                            <img
                                                src={getFileIcon(version.filePath)}
                                                className='w-32 rounded-lg'
                                                alt="File type"
                                            />
                                        )}
                                    </div>
                                    <div className=''>
                                        <p className="text-sm font-medium text-gray-600">{version.description || 'No Description.'}</p>
                                        <time className="text-xs text-gray-500 mt-1 block">
                                            {new Date(version.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </time>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => setPreviewDoc(version)}
                                                 className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold p-2 rounded transition-colors flex items-center flex-shrink-0"
                                            >
                                                <EyeIcon className="w-4 h-4 mr-1" />
                                                Preview
                                            </button>
                                            <button
                                                onClick={() => handleDownload(version.filePath, documentVersion.title)}
                                               className="  flex gap-1 justify-center items-center rounded hover:bg-blue-100 bg-slate-100 p-2 text-blue-600 hover:text-blue-800 text-sm transition-all w-full"
                                            >
                                                <Download className="w-4 h-4 mr-1" />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">
                        No versions available
                    </div>
                )}
            </div>
            

            <ModalPreview isOpen={!!previewDoc} onClose={() => setPreviewDoc(null)}>
                {previewDoc && (
                    <div className="p-4">

                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                <span className='text-2xl text-purple-600 capitalize'>{documentVersion?.title}</span>
                            </h3>
                        </div>

                        <div className="max-h-[80vh] overflow-hidden rounded-lg">
                            <DocumentViewer
                                fileUrl={previewDoc.filePath}
                            />
                        </div>


                        <button
                            onClick={() => handleDownload(previewDoc.filePath, documentVersion.title)}
                            className="flex gap-2 bg-purple-600 text-white mt-2 px-4 py-2 rounded hover:bg-purple-700"
                        >
                            <Download size={22} /> Download File
                        </button>
                    </div>
                )}
            </ModalPreview>
        </div>
    );
};