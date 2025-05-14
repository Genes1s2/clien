// import { useState } from 'react';

// const DocumentViewer = ({ fileUrl }: { fileUrl: string }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   // Encode URL for Google Docs Viewer
//   const encodedUrl = encodeURIComponent(fileUrl);
//   const viewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;

//   return (
//     <div className="mt-4 border rounded shadow p-2">
//       {isLoading && <div>Loading document...</div>}
//       <iframe
//         src={viewerUrl}
//         style={{ width: '100%', height: '500px', border: 'none' }}
//         onLoad={() => setIsLoading(false)}
//         title="Document Viewer"
//       />
//     </div>
//   );
// };

// export default DocumentViewer;

// import { useState } from 'react';
// import FileViewerWrapper from './FileViewerWrapper';
// import OfficeViewer from "react-office-viewer"
// import { showError } from '../utils/Notifications';

// const DocumentViewer = ({ fileUrl }: { fileUrl: string }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [numPages, setNumPages] = useState<number | null>(null);
//     const fileExtension = fileUrl.split('.').pop()?.toLowerCase();


//     const encodedUrl = encodeURIComponent(fileUrl);
//     const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;

//     // Handle PDF files
//     if (fileExtension === 'pdf') {
//         return (
//             <div className="mt-4 border rounded shadow p-2">
//                 <iframe
//                     src={`http://127.0.0.1:4000${fileUrl}`}
//                     width="100%"
//                     height="500px"
//                     className=' bg-white border rounded-lg shadow-md'
//                     title="Document Viewer"
//                 />
//             </div>
//         );
//     } else {
//         // Handle other files
//         return (
//             // <div className="mt-4 border rounded shadow p-2">
//             //     <FileViewerWrapper
//             //         filePath={fileUrl}
//             //     />
//             // </div>
//             <div className="mt-4 border rounded shadow p-2">
//                 {isLoading && <div>Loading document...</div>}
//                 {/* <iframe
//                     src={viewerUrl}
//                     style={{ width: '100%', height: '500px', border: 'none' }}
//                     onLoad={() => setIsLoading(false)}
//                     title="Document Viewer"
//                     /> */}
//                 <OfficeViewer
//                     url={fileUrl}
//                     onError={(error: any) => showError("Office Viewer Error:" + error)}
//                 />
//             </div>
//             // <div className="App">
//             //     <file-viewer
//             //         filename={fileUrl}
//             //         url={`http://127.0.0.1:4000${fileUrl}`}
//             //     />
//             // </div>
//         );
//     }


//     return <div>Unsupported file type.</div>;
// };

// export default DocumentViewer;

// import React from 'react';
// import OfficeViewer from "react-office-viewer"
// import { showError } from '../utils/Notifications';

// const DocumentViewer = ({ fileUrl }: { fileUrl: string }) => {

//     return (
//         <div className="mt-4 border rounded shadow p-2">
//                 <OfficeViewer
//                     url={fileUrl}
//                     onError={(error: any) => showError("Office Viewer Error:" + error)}
//                 />
//             </div>
//     )
// };

// export default DocumentViewer;

// import React from 'react';
// import OfficeViewer from "react-office-viewer";
// import { showError } from '../utils/Notifications';

// const DocumentViewer = ({ fileUrl }: { fileUrl: string }) => {
//   try {
//     return (
//       <div className="mt-4 border rounded shadow p-2">
//         <OfficeViewer
//           url={fileUrl}
//           onError={(error: any) => showError("Office Viewer Error:" + error)}
//         />
//       </div>
//     );
//   } catch (error) {
//     console.error("Component Error:", error);
//     return <div>Failed to load document.</div>;
//   }
// };

// export default DocumentViewer;

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
import { showError } from '../utils/Notifications';
import * as ExcelJS from 'exceljs';
import { renderAsync } from 'docx-preview';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type SupportedExtensions = 'pdf' | 'docx' | 'xlsx' | 'xls' | 'pptx' | 'ppt';

const DocumentViewer = ({ fileUrl }: { fileUrl: string }) => {
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const fileExtension = fileUrl.split('.').pop()?.toLowerCase() as SupportedExtensions;

  // DOCX handler
  useEffect(() => {
    if (fileExtension === 'docx' && docxContainerRef.current) {
      fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          renderAsync(blob, docxContainerRef.current!)
            .catch(error => showError('DOCX rendering failed: ' + error));
        });
    }
  }, [fileUrl, fileExtension]);

  // Excel handler
  useEffect(() => {
    if (['xlsx', 'xls'].includes(fileExtension)) {
      fetch(fileUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          const workbook = new ExcelJS.Workbook();
          return workbook.xlsx.load(buffer);
        })
        .then(workbook => {
          const worksheet = workbook.worksheets[0];
          const data = worksheet.getSheetValues().slice(1) as string[][];
          setExcelData(data);
        })
        .catch((error: any) => showError('Excel processing failed: ' + error));
    }
  }, [fileUrl, fileExtension]);

  return (
    <div className="h-full w-full">
      {fileExtension === 'pdf' ? (
        <div className="h-[80vh] overflow-auto rounded-lg border">
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => showError('PDF Error: ' + error.message)}
            className="!w-full"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <Page 
                key={`page_${index + 1}`} 
                pageNumber={index + 1}
                className="!w-full"
                width={undefined} // Let container width determine size
              />
            ))}
          </Document>
        </div>
      ) : fileExtension === 'docx' ? (
        <div 
          ref={docxContainerRef}
          className="h-[70vh] overflow-auto rounded-lg border p-4"
        />
      ) : ['xlsx', 'xls'].includes(fileExtension) ? (
        <div className="h-[70vh] overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 bg-white">
              {excelData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <td 
                      key={j}
                      className="whitespace-nowrap px-4 py-2 text-sm text-gray-900"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : ['pptx', 'ppt'].includes(fileExtension) ? (
        <div className="h-[70vh] overflow-auto rounded-lg border bg-gray-50 p-4">
          <div className="flex h-full items-center justify-center text-gray-500">
            PowerPoint preview not available - download to view
          </div>
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg border bg-gray-50">
          <p className="text-gray-500">Preview not available for this file type</p>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;

{/* <iframe
                        src={`http://127.0.0.1:4000${currentDocument.filePath}`}
                        width="100%"
                        height="500px"
                        className=' bg-white border rounded-lg shadow-md'
                        title="Document Viewer"
                    /> */}