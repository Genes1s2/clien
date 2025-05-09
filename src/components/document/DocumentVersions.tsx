import React from 'react';
import { Activity, Code } from 'lucide-react';
import { DocumentComment, DocumentVersion } from '../../models/documents';

interface DocumentVersionProps {
    version: DocumentVersion[];
}

export const DocumentVersions = ({ version }: DocumentVersionProps) => {

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

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-500" />
                Versions
            </h3>

            <div className="space-y-4">
                {version.length > 0
                    ? (version && version.map((version, index) => (
                        <div key={index} className="border-l-4 border-purple-200 pl-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-200 px-4 py-2 rounded-full">{version.versionNumber}</div>
                                
                                <div>
                                    <p className="font-medium text-gray-900">{getFileIcon(version.filePath || '')} {version.description || "No description"}</p>
                                    <p className="text-sm text-gray-600">{version.document?.title}</p>
                                    <time className="text-xs text-gray-500 mt-1 block">
                                        {new Date(version.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                    )))
                    : (
                        <div className="text-gray-500">
                            No Versions available.
                        </div>
                    )
                }
            </div>
        </div>
    );
};