import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingType } from '../../models/store';
import { AppDispatch, RootState } from '../../store';
import { updateUserProfile } from '../../store/user/actions';
import { showError, showSuccess } from '../../utils/Notifications';
import { AuthUser } from '../../models/auth';
import PasswordChangeForm from './PasswordChangeForm';

const profileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .max(50, 'Maximum 50 characters'),
    lastName: Yup.string()
        .required('Last name is required')
        .max(50, 'Maximum 50 characters'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
});

const ProfileForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const user = useSelector<RootState, AuthUser | null>(
        (state) => state.session.currentUser.entities
    );

    const { status } = useSelector((state: RootState) => state.user.currentProfile);

    const initialValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    }

    return (
        <div>

            <Formik
                initialValues={initialValues}
                validationSchema={profileSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        await dispatch(updateUserProfile({
                            userId: user!.id,
                            data: values
                        })).unwrap();

                        showSuccess('Profile updated successfully');
                        resetForm({ values });
                    } catch (error: any) {
                        showError(error || 'Failed to update profile');
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <Field
                                name="firstName"
                                className={`mt-1 block w-full rounded-md ${errors.firstName && touched.firstName
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } shadow-sm`}
                            />

                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                        </div>


                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <Field
                                name="lastName"
                                className={`mt-1 block w-full rounded-md ${errors.lastName && touched.lastName
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } shadow-sm`}
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <Field
                                name="email"
                                type="email"
                                className={`mt-1 block w-full rounded-md ${errors.email && touched.email
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } shadow-sm`}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        </div>

                        <button
                            type="submit"
                            disabled={status === LoadingType.PENDING}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {status === LoadingType.PENDING ? 'Updating...' : 'Update Profile'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileForm;