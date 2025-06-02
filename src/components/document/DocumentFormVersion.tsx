import { useDispatch } from 'react-redux';
import { getDocumentById, uploadNewVersionDocument } from '../../store/document/actions';
import { AppDispatch } from '../../store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showError, showSuccess } from '../../utils/Notifications';
import { Upload } from 'lucide-react';
import excellLogo from '../../assets/images/excellogo.jpeg';
import pdfLogo from '../../assets/images/pdflogo.png';
import wordLogo from '../../assets/images/wordlogo.jpeg';
import powerpointLogo from '../../assets/images/powerpointlogo.jpeg';

interface DocumentFormVersion {
    documentId: string;
    onSuccess?: () => void
}

const DocumentFormVersions = ({ documentId, onSuccess }: DocumentFormVersion) => {
    const dispatch = useDispatch<AppDispatch>();

    const documentVersionSchema = Yup.object().shape({
        description: Yup.string().nullable(),
        filePath: Yup.mixed().required('File is required')
    });

    return (
        <div className="space-y-4">
            <Formik
                initialValues={{ description: '', filePath: null }}
                validationSchema={documentVersionSchema}
                onSubmit={async (values, { setSubmitting }) => {

                    try {
                        const formData = new FormData();
                        formData.append('description', values.description);

                        if (values.filePath) {
                            formData.append('filePath', values.filePath);
                        }

                        await dispatch(uploadNewVersionDocument({ documentId, formData })).unwrap();
                        await dispatch(getDocumentById(documentId)).unwrap();
                        showSuccess('Document updated successfully');
                        setSubmitting(false);
                        onSuccess?.();
                    } catch (error: any) {
                        
                        showError('Failed to process upload');
                    }
                }}
            >
                {({ setFieldValue, values, isSubmitting, errors, touched }) => (
                    <Form className="space-y-4">
                        {/* Description Field */}
                        <div><Upload className=" animate-pulse -z-10 opacity-30 w-96 h-96 absolute text-purple-500 top-0 -right-32 " /></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <Field
                                name="description"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.description && touched.description
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mb-2" />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Document File</label>
                            <input
                                type="file"
                                name="filePath"
                                onChange={(e) => setFieldValue("filePath", e.target.files?.[0])}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.filePath && touched.filePath
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            />
                            <ErrorMessage name="filePath" component="div" className="text-red-500 text-sm mb-2" />
                        </div>
                        
                                  <div>
                                    <h2 className='text-gray-500 text-sm'>Supported files</h2>
                                    <div className='flex gap-2'>
                                      <img src={wordLogo} className='w-7 lg:w-10' alt="" />
                                      <img src={excellLogo} className='w-7 lg:w-10' alt="" />
                                      <img src={powerpointLogo} className='w-7 lg:w-10' alt="" />
                                      <img src={pdfLogo} className='w-7 lg:w-10' alt="" />
                                    </div>
                                  </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Upload version'}
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    );
};

export default DocumentFormVersions;