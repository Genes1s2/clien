import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingType } from '../../models/store';
import { AppDispatch, RootState } from '../../store';
import { updateUserProfile } from '../../store/user/actions';
import { showError, showSuccess } from '../../utils/Notifications';
import { AuthUser } from '../../models/auth';
import { restoreUser } from '../../store/auth/restoreUser/actions';

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

const UserProfileForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector<RootState, AuthUser | null>((state) => state.session.currentUser.entities);


    const { status } = useSelector((state: RootState) => state.user.currentProfile);

    const initialValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    }

    return (
        <div className=" p-8 bg-white rounded-lg shadow-lg">

            <Formik
                initialValues={initialValues}
                validationSchema={profileSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        await dispatch(updateUserProfile({
                            userId: user!.id,
                            data: values
                        })).unwrap();

                        await dispatch(restoreUser()).unwrap();

                        showSuccess('Profile updated successfully');
                        resetForm({ values });
                    } catch (error: any) {
                        showError(error || 'Failed to update profile');
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <Field
                                name="firstName"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName && touched.firstName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            />

                            {errors.firstName && touched.firstName && (
                                <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <Field
                                name="lastName"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName && touched.lastName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            />
                            {errors.lastName && touched.lastName && (
                                <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <Field
                                name="email"
                                type="email"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email && touched.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-purple-500'
                                    }`}
                            />
                            {errors.email && touched.email && (
                                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={status === LoadingType.PENDING}
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
                        >
                            {status === LoadingType.PENDING ? 'Updating...' : 'Update Profile'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserProfileForm;