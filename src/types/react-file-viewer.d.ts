
declare module 'react-file-viewer' {
  import React from 'react';
  
  interface FileViewerProps {
    fileType: string;
    filePath: string;
    onError?: (error: Error) => void;
    errorComponent?: React.ReactElement;
    unsupportedComponent?: React.ReactElement;
  }
  
  const FileViewer: React.ComponentType<FileViewerProps>;
  export default FileViewer;
}
