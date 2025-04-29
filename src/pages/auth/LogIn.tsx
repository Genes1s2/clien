import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logout, clearError } from '../../store/auth/slice';
import { useNavigate } from 'react-router';
import { LoadingType } from '../../models/store';
import { ILoginInput, IRegisterInput } from '../../models/auth';
import { loginAction, registerAction } from '../../store/auth/actions';
import { showPromise } from '../../utils/Notifications';

const AuthForms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth.currentUser);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // Clear errors when switching between forms
  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  // Handle alerts and redirection
  // useEffect(() => {
  //   if (status === LoadingType.SUCCESS) {
  //     alert(isLogin ? 'Login successful!' : 'Registration successful!');
  //   }

  //   if (error) {
  //     console.log("error logi: ", error);
  //   }
  // }, [status, error, isLogin]);

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Form submission handler
  const handleSubmit = async (values: ILoginInput | IRegisterInput) => {

    if (isLogin) {
      // if (status === LoadingType.SUCCESS) {
      //       alert(isLogin ? 'Login successful!' : 'Registration successful!');
      //     }
      await showPromise(
        // dispatch(loginAction(values)).unwrap(),
        dispatch(loginAction(values as ILoginInput)),
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
    } else {
      await dispatch(registerAction(values as IRegisterInput));
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

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={isLogin ? loginSchema : registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName && touched.firstName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
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
                      : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {/* {errors.lastName && touched.lastName && (
                    <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                  )} */}
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email && touched.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
                  }`}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

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
                    : 'border-gray-300 focus:ring-blue-500'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {/* {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} */}
                </button>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === LoadingType.PENDING}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
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
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div >
  );
};

export default AuthForms;