import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../store/user/actions';
import { showError, showSuccess } from '../../utils/Notifications';
import { AppDispatch, RootState } from '../../store';
import { LoadingType } from '../../models/store';
import { AuthUser } from '../../models/auth';
import { useNavigate } from 'react-router';
import { logout } from '../../store/auth/slice';


const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
});

const PasswordChangeForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const user = useSelector<RootState, AuthUser | null>(
        (state) => state.session.currentUser.entities
    );

    const { status } = useSelector((state: RootState) => state.user.currentProfile);

    return (
        <div>
            <Formik
                initialValues={{ currentPassword: '', newPassword: '' }}
                validationSchema={passwordSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        await dispatch(changeUserPassword({
                            userId: user!.id,
                            data: values
                        })).unwrap();

                        showSuccess('Password changed successfully');
                        dispatch(logout());
                            navigate("/authentification");
                        resetForm();
                    } catch (error: any) {
                        console.log("error: ", error);

                        showError(error || 'Failed to change password');
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Current Password</label>
                            <Field
                                name="currentPassword"
                                type="password"
                                className={`mt-1 block w-full rounded-md ${errors.currentPassword && touched.currentPassword
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } shadow-sm`}
                            />
                            {errors.currentPassword && touched.currentPassword && (
                                <div className="text-red-500 text-sm">{errors.currentPassword}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">New Password</label>
                            <Field
                                name="newPassword"
                                type="password"
                                className={`mt-1 block w-full rounded-md ${errors.newPassword && touched.newPassword
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    } shadow-sm`}
                            />
                            {errors.newPassword && touched.newPassword && (
                                <div className="text-red-500 text-sm">{errors.newPassword}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={status === LoadingType.PENDING}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {status === LoadingType.PENDING ? 'Changing...' : 'Change Password'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PasswordChangeForm;