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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    const user = useSelector<RootState, AuthUser | null>((state) => state.session.currentUser.entities);
    const { status } = useSelector((state: RootState) => state.user.currentProfile);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    return (
        <div className=" bg-white p-8 rounded-lg shadow-lg">
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
                        showError(error || 'Failed to change password');
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <div className="relative">
                                <Field
                                    name="currentPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.currentPassword && touched.currentPassword
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-purple-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                            {errors.currentPassword && touched.currentPassword && (
                                <div className="text-red-500 text-sm mt-1">{errors.currentPassword}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <div className="relative">
                                <Field
                                    name="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.currentPassword && touched.currentPassword
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-purple-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                            {errors.newPassword && touched.newPassword && (
                                <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={status === LoadingType.PENDING}
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
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