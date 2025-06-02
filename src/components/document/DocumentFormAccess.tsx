import { useDispatch, useSelector } from 'react-redux';
import { controlDocument } from '../../store/document/actions';
import { AppDispatch, RootState } from '../../store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showError, showSuccess } from '../../utils/Notifications';
import Select from 'react-select';
import { useEffect } from 'react';
import { getAllActiveUsers } from '../../store/user/actions';
import { AuthUser, UserListEntry } from '../../models/auth';
import { AccessRight } from '../../models/logActions';
import { LockOpenIcon } from 'lucide-react';

interface DocumentFormAcces {
    documentId: string;
    onSuccess?: () => void;
}

const DocumentFormAccess = ({ documentId, onSuccess }: DocumentFormAcces) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: users } = useSelector((state: RootState) => state.user.list);

    useEffect(() => {
        dispatch(getAllActiveUsers());
    }, [dispatch]);

    const accessSchema = Yup.object().shape({
        userId: Yup.string().required('User selection is required'),
        canRead: Yup.boolean(),
        canWrite: Yup.boolean(),
        canDelete: Yup.boolean(),
    }).test(
        'at-least-one-permission',
        'At least one permission must be selected',
        (values) => values.canRead || values.canWrite || values.canDelete
    );

    return (
        <div className="space-y-4">
            <Formik
                initialValues={{
                    userId: '',
                    canRead: false,
                    canWrite: false,
                    canDelete: false
                }}
                validationSchema={accessSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    console.log("values: ", values);

                    try {
                        await dispatch(controlDocument({
                            documentId,
                            data: values as AccessRight
                        })).unwrap();

                        // await dispatch(getDocumentById(documentId)).unwrap();
                        showSuccess('Access rights updated successfully');
                        resetForm();
                        onSuccess?.();
                    } catch (error: any) {
                        showError(error || 'Failed to update access rights');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({setFieldValue, isSubmitting, errors, touched }) => (
                    <Form className="space-y-4">
                        <div><LockOpenIcon className=" animate-pulse -z-10 opacity-30 w-96 h-96 absolute text-purple-500 bottom-0 -right-32 " /></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select User
                            </label>
                            <Field
                                name="userId"
                                as="select"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.userId && touched.userId
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            >
                                <option value="">Select a user</option>
                                {users.map((user: UserListEntry) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName} ({user.email})
                                    </option>
                                ))}
                            </Field>
                            {/* <Select
                                options={users.map((u: AuthUser) => ({ value: u.id, label: u.firstName }))}
                                onChange={(selected: any) => setFieldValue('userId', selected?.value)}
                                classNamePrefix="react-select"
                                className={`${errors.userId && touched.userId
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            /> */}
                            <ErrorMessage name="userId" component="div" className="text-red-500 text-sm mb-2" />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <Field type="checkbox" name="canRead" className="rounded text-purple-600" />
                                Read Access
                            </label>

                            <label className="flex items-center gap-2">
                                <Field type="checkbox" name="canWrite" className="rounded text-purple-600" />
                                Write Access
                            </label>

                            <label className="flex items-center gap-2">
                                <Field type="checkbox" name="canDelete" className="rounded text-purple-600" />
                                Delete Access
                            </label>
                        </div>

                        <ErrorMessage name="atLeastOnePermission" component="div" className="text-red-500 text-sm mb-2" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Permissions'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DocumentFormAccess;