import { useDispatch } from 'react-redux';
import { commentDocument } from '../../store/document/actions';
import { AppDispatch } from '../../store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showError, showSuccess } from '../../utils/Notifications';

interface DocumentFormComment {
    documentId: string;
    onSuccess?: () => void;
}

const DocumentFormComments = ({ documentId, onSuccess }: DocumentFormComment) => {
    const dispatch = useDispatch<AppDispatch>();

    const commentSchema = Yup.object().shape({
        content: Yup.string()
            .required('Comment is required')
            .max(500, 'Comment cannot exceed 500 characters')
    });

    return (
        <div className="space-y-4">
            <Formik
                initialValues={{ content: '' }}
                validationSchema={commentSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        await dispatch(commentDocument({ 
                            documentId, 
                            content: values.content 
                        })).unwrap();
                        showSuccess('Comment added successfully');
                        resetForm();
                        onSuccess?.();
                    } catch (error) {
                        console.log('eroor comment: ', error);
                        showError('Failed to add comment');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Add Comment
                            </label>
                            <Field
                                name="content"
                                as="textarea"
                                rows={3}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                    errors.content && touched.content
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-purple-500'
                                }`}
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mb-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DocumentFormComments;