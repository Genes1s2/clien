import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { createDocument, fetchDocuments, updateDocument } from '../../store/document/actions';
import { useEffect } from 'react';
import { showError, showSuccess } from '../../utils/Notifications';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchCategories } from '../../store/categories/actions';
import CreatableSelect from 'react-select/creatable';

const animatedComponents = makeAnimated();

interface DocumentForm {
  existingDocument?: any;
  onSuccess?: () => void
}

const documentSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  //   description: Yup.string().required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  // tags: Yup.array().of(Yup.string()).nullable(),
  tags: Yup.array()
    .of(Yup.string().required('Required'))
    .min(2, 'At least two tags are required')
    .nullable(),

  filePath: Yup.mixed().required('File is required')
});

const DocumentForm = ({ existingDocument, onSuccess }: DocumentForm) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        title: existingDocument?.title || '',
        // description: existingDocument?.description || '',
        categoryId: existingDocument?.categoryId || '',
        tags: existingDocument?.tags || [],
        filePath: null
      }}
      validationSchema={documentSchema}
      onSubmit={async (values, { setSubmitting }) => {

        try {
          const formData = new FormData();
          formData.append('title', values.title);
          //   formData.append('description', values.description);
          formData.append('categoryId', values.categoryId);

          // Only append tags if they exist
          if (values.tags.length > 0) {
            // formData.append('tags', JSON.stringify(values.tags));
            values.tags.forEach((tag: string) => {
              formData.append('tags', tag);
            });
          }

          if (values.filePath) {
            formData.append('filePath', values.filePath);
          }
          console.log('formData 1: ', formData);

          if (existingDocument) {
            console.log('existingDocument: ', existingDocument.id);
            formData.append('id', existingDocument.id);
            await dispatch(updateDocument({documentId: existingDocument.id, formData})).unwrap();
            
            // await dispatch(updateDocument({})).unwrap();
            await dispatch(fetchDocuments()).unwrap()
            showSuccess('Document updated successfully');
          } else {
            console.log('formData: ', formData);
            await dispatch(createDocument(formData)).unwrap();
            await dispatch(fetchDocuments()).unwrap()
            showSuccess('Document created successfully');
          }
          
          setSubmitting(false);
          onSuccess?.();
        } catch (error: any) {
          await dispatch(fetchDocuments()).unwrap()
          showError('Failed to process document');
        } 
      }}
    >
      {({ setFieldValue, values, isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Field
              name="title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title && touched.title
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mb-2" />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select
              options={categories.map(c => ({ value: c.id, label: c.name }))}
              onChange={(selected: any) => setFieldValue('categoryId', selected?.value)}
              classNamePrefix="react-select"
              className={`${errors.categoryId && touched.categoryId
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm mb-2" />
          </div>

          {/* Optional Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (optional)</label>
            <CreatableSelect
              isMulti
              components={animatedComponents}
              options={[]}
              onCreateOption={(inputValue: string) => {
                const newTags = [...values.tags, inputValue];
                setFieldValue('tags', newTags);
              }}
              value={values.tags.map((tag: string) => ({ value: tag, label: tag }))}
              onChange={(selected: any) =>
                setFieldValue('tags', selected.map((s: any) => s.value))
              }
              classNamePrefix="react-select"
              className="border-gray-300 focus:ring-blue-500"
            />
            <ErrorMessage name="tags" component="div" className="text-red-500 text-sm mb-2" />         
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
                  : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            <ErrorMessage name="filePath" component="div" className="text-red-500 text-sm mb-2" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : existingDocument ? 'Update Category' : 'Create Category'}
          </button>
        </Form>
      )}
       
    </Formik>
  );
};

export default DocumentForm;