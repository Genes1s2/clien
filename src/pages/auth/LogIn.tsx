import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logout, clearError } from '../../store/auth/slice';
import { useNavigate } from 'react-router';
import { LoadingType } from '../../models/store';
import { ILoginInput, IRegisterInput } from '../../models/auth';
import { loginAction, registerAction, resetPasswordAction, forgotPasswordAction } from '../../store/auth/actions';
import { showPromise } from '../../utils/Notifications';
import { Eye, EyeOff } from 'lucide-react';


type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password';

const AuthForms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth.currentUser);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [mode, setMode] = useState<AuthMode>('login');
  const [emailForReset, setEmailForReset] = useState('');
  const resetPasswordStatus = useSelector((state: RootState) => state.auth.resetPasswordStatus);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Clear errors when switching between forms
  useEffect(() => {
    dispatch(clearError());
  }, [mode, dispatch]);

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // navigate('/dashboard/documents');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: any) => {
    switch (mode) {
      case 'login':
        await showPromise(

          dispatch(loginAction(values as ILoginInput)).unwrap(),
          {
            loading: 'Authenticating...',
            success: 'Welcome back!',
            error: (err) => {
              if (err instanceof Error) {
                return err.message;
              }
              return 'Login failed. Please try again.';
            }
          }
        );
        break;
      case 'register':
        await showPromise(
           dispatch(registerAction(values as IRegisterInput)).unwrap(),
          {
            loading: 'Registering...',
            success: 'Register successfully!',
            error: (err: any) => err || 'Failed to register'
          }
        );
        setMode('login');
        break;
      case 'forgot-password':
        setEmailForReset(values.email);
        await showPromise(
          dispatch(forgotPasswordAction({ email: values.email })).unwrap(),
          {
            loading: 'Sending OTP...',
            success: 'OTP sent successfully!',
            error: (err: any) => err || 'Failed to send OTP'
          }
        );
        setMode('reset-password');
        break;
      case 'reset-password':
        await showPromise(
          dispatch(resetPasswordAction({
            email: emailForReset,
            otp: values.otp,
            newPassword: values.newPassword
          })).unwrap(),
          {
            loading: 'Resetting password...',
            success: 'Password reset successfully!',
            error: (err: any) => err || 'Password reset failed'
          }
        );
        setMode('login');
        break;
    }
  };

  // Update form rendering logic
  const getFormTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Create Account';
      case 'forgot-password': return 'Reset Password';
      case 'reset-password': return 'Enter New Password';
    }
  };

  // User Registration Schema
  const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  // User Login Schema
  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
  });

  // User forgot Password Schema
  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  // User Reset Password Schema
  const resetPasswordSchema = yup.object().shape({
    otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
    newPassword: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  // Add OTP and new password fields
  const renderResetPasswordFields = (errors: any, touched: any) => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          OTP Code
        </label>
        <Field
          name="otp"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.otp && touched.otp
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-purple-500'
            }`}
        />
        {errors.otp && touched.otp && (
          <div className="text-red-500 text-sm mt-1">{errors.otp}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <Field
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.newPassword && touched.newPassword
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-purple-500'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.newPassword && touched.newPassword && (
          <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>
        )}
      </div>
    </>
  );

  // Update the form validation schema based on mode
  const getValidationSchema = () => {
    switch (mode) {
      case 'login': return loginSchema;
      case 'register': return registerSchema;
      case 'forgot-password': return forgotPasswordSchema;
      case 'reset-password': return resetPasswordSchema;
    }
  };

  // Update the submit button text
  const getSubmitButtonText = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'register': return 'Create Account';
      case 'forgot-password': return 'Send OTP';
      case 'reset-password': return 'Reset Password';
    }
  };

  // Add password reset links
  const renderFooterLinks = () => {
    if (mode === 'login') {
      return (
        <div className="mt-4 text-center flex gap-4">
          <button
            type="button"
            onClick={() => setMode('register')}
            className="text-purple-600 hover:text-purple-800 text-sm"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => setMode('forgot-password')}
            className="text-purple-600 hover:text-purple-800 text-sm"
          >
            Forgot password?
          </button>
        </div>
      );
    }

    if (mode === 'register') {
      return (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setMode('login')}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Have already an account? Login
          </button>
        </div>
      );
    }

    if (mode === 'forgot-password') {
      return (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setMode('login')}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Back to Login
          </button>
        </div>
      );
    }
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // otp: '',
    // newPassword: '',
  }

  return (
    <div className="max-w-md w-full mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {getFormTitle()}
      </h2>

      {/* Error messages */}
      {(error || resetPasswordStatus.error) && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error || resetPasswordStatus.error}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Render different fields based on mode */}
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
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
              </div>
            )}

            {(mode === 'login' || mode === 'register' || mode === 'forgot-password') && (
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
            )}

            {mode === 'reset-password' && (
              <div>
                {renderResetPasswordFields(errors, touched)}
              </div>
            )}

            {(mode === 'login' || mode === 'register') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password && touched.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-purple-500'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={status === LoadingType.PENDING}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === LoadingType.PENDING ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) :
                <span className="flex items-center justify-center">
                  {getSubmitButtonText()}
                </span>}

            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            dispatch(logout());
            setIsLogin(!isLogin);
          }}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          {renderFooterLinks()}
        </button>
      </div>
    </div >
  );
};

export default AuthForms;