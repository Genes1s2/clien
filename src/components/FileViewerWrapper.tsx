import React from 'react';
import FileViewer from 'react-file-viewer';
import { showError } from '../utils/Notifications';

interface FileViewerWrapperProps {
  filePath: string;
}

const FileViewerWrapper: React.FC<FileViewerWrapperProps> = ({ filePath }) => {
  const getFileType = (url: string) => {
    const parts = url.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  console.log("filePath: ", filePath);
  const fileUrl = `http://127.0.0.1:4000${filePath}`;
  const fileType = getFileType(fileUrl);

  return (
    <div className="mt-4 border rounded shadow p-2">
      <FileViewer
        fileType={fileType}
        filePath={fileUrl}
        onError={(e: any) => {
          showError(e.message || 'Error loading file');
          console.error('FileViewer error:', e);
        }}
      />
    </div>
  );
};

export default FileViewerWrapper;