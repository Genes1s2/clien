import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { allDocumentsByOwner, createDocument, getDocumentById, updateDocument } from '../../store/document/actions';
import { useEffect } from 'react';
import { showError, showSuccess } from '../../utils/Notifications';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchCategories } from '../../store/categories/actions';
import CreatableSelect from 'react-select/creatable';
import { Category } from '../../models/category';
import { FolderOpen } from 'lucide-react';
import excellLogo from '../../assets/images/excellogo.jpeg';
import pdfLogo from '../../assets/images/pdflogo.png';
import wordLogo from '../../assets/images/wordlogo.jpeg';
import powerpointLogo from '../../assets/images/powerpointlogo.jpeg';

const animatedComponents = makeAnimated();

interface DocumentForms {
  existingDocument?: any;
  onSuccess?: () => void
}

const documentSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  //   description: Yup.string().required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  tags: Yup.array()
    .of(Yup.string().required('Required'))
    .min(2, 'At least two tags are required')
    .nullable(),

  filePath: Yup.mixed().required('File is required')
});

const DocumentForm = ({ existingDocument, onSuccess }: DocumentForms) => {
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
          if (values.tags.length > 1) {
            values.tags.forEach((tag: string) => {
              formData.append('tags', tag);
            });
          }

          if (values.filePath) {
            formData.append('filePath', values.filePath);
          }

          if (existingDocument) {
            // formData.append('id', existingDocument.id);

            await dispatch(updateDocument({ documentId: existingDocument.id, formData })).unwrap();
            await dispatch(allDocumentsByOwner()).unwrap();
            await dispatch(getDocumentById(existingDocument.id));
            showSuccess('Document updated successfully');
          } else {
            await dispatch(createDocument(formData)).unwrap();
            await dispatch(allDocumentsByOwner()).unwrap();
            showSuccess('Document created successfully');
          }

          setSubmitting(false);
          onSuccess?.();
        } catch (error: any) {
          // await dispatch(allDocumentsByOwner()).unwrap();
          console.log("error: ", error);
          
          showError('Failed to process document');
        }
      }}
    >
      {({ setFieldValue, values, isSubmitting, errors, touched }) => (
        <Form className=" space-y-4">
          <div><FolderOpen className=" animate-pulse -z-10 opacity-30 w-96 h-96 absolute text-purple-500 bottom-0 -right-32 " /></div>
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Field
              name="title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title && touched.title
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
                }`}
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mb-2" />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select
              options={categories.map((c: Category) => ({ value: c.id, label: c.name }))}
              onChange={(selected: any) => setFieldValue('categoryId', selected?.value)}
              classNamePrefix="react-select"
              className={`${errors.categoryId && touched.categoryId
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
                }`}
            />
            <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm mb-2" />
          </div>

          {/* Optional Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
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
              className="border-gray-300 focus:ring-purple-500"
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
                : 'border-gray-300 focus:ring-purple-500'
                }`}
            />
            <ErrorMessage name="filePath" component="div" className="text-red-500 text-sm mb-2" />
          </div>

          <div>
            <h2 className='text-gray-500 text-sm'>Supported files</h2>
            <div className='flex gap-2'>
              <img src={wordLogo} className='w-10' alt="" />
              <img src={excellLogo} className='w-10' alt="" />
              <img src={powerpointLogo} className='w-10' alt="" />
              <img src={pdfLogo} className='w-10' alt="" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : existingDocument ? 'Update Document' : 'Create Document'}
          </button>
        </Form>
      )}

    </Formik>
  );
};

export default DocumentForm;