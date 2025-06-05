import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createCategory, updateCategory } from '../../store/categories/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import { Group } from 'lucide-react';

interface CategoryForms {
    existingCategory?: any;
    onSuccess?: () => void
}

const categorySchema = Yup.object().shape({
    name: Yup.string().required('Category name is required')
});

const CategoryForm = ({ existingCategory, onSuccess }: CategoryForms) => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Formik
            initialValues={{ name: existingCategory?.name || '' }}
            validationSchema={categorySchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    if (existingCategory) {
                        await dispatch(updateCategory({ id: existingCategory.id, name: values.name })).unwrap();
                        showSuccess('Category added successfully')
                    } else {
                        await dispatch(createCategory(values.name)).unwrap();
                        showSuccess('Category updated successfully')
                    }

                    onSuccess?.();
                } catch (error: any) {

                    showError(error || 'Failed to create/update category')
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-4">
                    <div><Group className=" animate-pulse -z-10 opacity-30 w-96 h-96 absolute text-purple-500 bottom-0 -right-32 " /></div>
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                        <Field
                            name="name"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name && touched.name
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-purple-500'
                                }`}
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Submitting...' : existingCategory ? 'Update Category' : 'Create Category'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CategoryForm;