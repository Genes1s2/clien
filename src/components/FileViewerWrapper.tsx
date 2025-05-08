// import React from 'react';
// import FileViewer from 'react-file-viewer';

// interface FileViewerWrapperProps {
//   filePath: string;
// }

// const FileViewerWrapper: React.FC<FileViewerWrapperProps> = ({ filePath }) => {
//   const getFileType = (path: string) => {
//     const parts = path.split('.');
//     return parts[parts.length - 1].toLowerCase();
//   };

//   const fileType = getFileType(filePath);

//   return (
//     <div className="mt-4 border rounded shadow p-2">
//       <FileViewer
//         fileType={fileType}
//         filePath={filePath}
//         onError={(e: any) => {
//           console.error('FileViewer error:', e);
//         }}
//       />
//     </div>
//   );
// };

// export default FileViewerWrapper;

import React from 'react'

export const FileViewerWrapper = () => {
  return (
    <div>FileViewerWrapper</div>
  )
}
