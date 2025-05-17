import { useEffect, useRef, useState } from 'react';
import { showError } from '../utils/Notifications';
import * as ExcelJS from 'exceljs';
import { renderAsync } from 'docx-preview';
import { Presentation , Slide, Text, Image } from 'react-pptx';

type SupportedExtensions = 'pdf' | 'docx' | 'xlsx' | 'xls' | 'pptx' | 'ppt' | 'xls';

const DocumentViewer = ({ fileUrl }: { fileUrl: string }) => {
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileExtension = fileUrl.split('.').pop()?.toLowerCase() as SupportedExtensions;
  const [pptxContent, setPptxContent] = useState<React.ReactNode>(null);
  
  // Common error handler
  const handleError = (error: Error, context: string) => {
    showError(`${context}: ${error.message}`);
    setIsLoading(false);
  };

  const viewerUrl = `http://127.0.0.1:4000${fileUrl}`;

  // Handle DOCX files
  useEffect(() => {
    if (fileExtension === 'docx' && docxContainerRef.current) {
      setIsLoading(true);
      fetch(viewerUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.blob();
        })
        .then(blob => renderAsync(blob, docxContainerRef.current!))
        .catch(error => handleError(error, 'DOCX rendering'))
        .finally(() => setIsLoading(false));
    }
  }, [fileUrl, fileExtension]);

  // Handle Excel files
  useEffect(() => {
    if (['xlsx', 'xls'].includes(fileExtension) && fileUrl) {
      setIsLoading(true);
      fetch(viewerUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.arrayBuffer();
        })
        .then(buffer => {
          const workbook = new ExcelJS.Workbook();
          return workbook.xlsx.load(buffer);
        })
        .then(workbook => {
          const worksheet = workbook.worksheets[0];
          const data = worksheet.getSheetValues().slice(1) as string[][];
          setExcelData(data);
        })
        .catch(error => handleError(error, 'Excel processing'))
        .finally(() => setIsLoading(false));
    }
  }, [fileUrl, fileExtension]);

 // Handle PowerPoint files
  useEffect(() => {
    if (['pptx', 'ppt'].includes(fileExtension) ) {
      setIsLoading(true);
      setPptxContent(
        <Presentation>
          <Slide>
            <Text style={{ x: 1, y: 1, fontSize: 24 }}>
              Loading PowerPoint content...
            </Text>
          </Slide>
        </Presentation>
      );
      
      // Add proper PPTX parsing logic here
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [fileUrl, fileExtension]);


  // if (isLoading) {
  //   return (
  //     <div className="flex h-64 items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-full w-full">
      {fileExtension === 'pdf' ? (
        <div className="h-[75vh] overflow-auto">
          <iframe
            src={viewerUrl}
            className='h-[80vh] w-full '
            onLoad={() => setIsLoading(false)}
            title="Document Viewer"
          />
        </div>
      ) : fileExtension === 'docx' ? (
        <div 
          ref={docxContainerRef}
          className="h-[75vh] overflow-auto p-4 bg-white rounded-lg border"
        />
      ) :  ['xlsx', 'xls'].includes(fileExtension) ? (
        <div className="h-[75vh] overflow-auto rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {excelData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row?.map((cell, j) => (
                    <td 
                      key={j}
                      className="px-4 py-2 text-sm text-gray-900 border-r last:border-r-0"
                    >
                      {cell || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : ['pptx', 'ppt'].includes(fileExtension) ? (
        <div className="h-[75vh] flex justify-center items-center overflow-auto rounded-lg border bg-white p-4">
          <div className="text-center">
            {pptxContent}
          <div className="mt-4 text-sm text-gray-500">
            For full presentation features, please download the file
          </div>
          <a
            href={viewerUrl}
            download
            className="mt-2 inline-block text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Download PowerPoint
          </a>
          </div>
        </div>
      ) :  (
        <div className="flex h-64 items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">
              Preview not available for this file type
            </p>
            <a 
              href={viewerUrl}
              download
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Download file
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


export default DocumentViewer;