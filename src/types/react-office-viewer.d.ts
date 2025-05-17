declare module 'react-office-viewer' {
  import React from 'react';

  interface OfficeViewerProps {
    url: string;
    onError?: (error: Error) => void;
  }

  const OfficeViewer: React.FC<OfficeViewerProps>;
  export default OfficeViewer;
}