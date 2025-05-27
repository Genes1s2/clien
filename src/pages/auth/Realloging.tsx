// import React from 'react'

// export const Realloging = () => {
//   return (
//     <div>
//         <Formik
//                 initialValues={initialValues}
//                 validationSchema={isLogin ? loginSchema : registerSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ errors, touched }) => (
//                   <Form className="space-y-6">
//                     {/* Render different fields based on mode */}
//                     {!isLogin && (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             First Name
//                           </label>
//                           <Field
//                             name="firstName"
//                             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName && touched.firstName
//                               ? 'border-red-500 focus:ring-red-500'
//                               : 'border-gray-300 focus:ring-purple-500'
//                               }`}
//                           />
//                           {errors.firstName && touched.firstName && (
//                             <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
//                           )}
        
//                         </div>
        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Last Name
//                           </label>
//                           <Field
//                             name="lastName"
//                             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName && touched.lastName
//                               ? 'border-red-500 focus:ring-red-500'
//                               : 'border-gray-300 focus:ring-purple-500'
//                               }`}
//                           />
//                           {errors.lastName && touched.lastName && (
//                             <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
//                           )}
//                         </div>
//                       </div>
//                     )}
        
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       <Field
//                         name="email"
//                         type="email"
//                         className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email && touched.email
//                           ? 'border-red-500 focus:ring-red-500'
//                           : 'border-gray-300 focus:ring-purple-500'
//                           }`}
//                       />
//                       {errors.email && touched.email && (
//                         <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//                       )}
//                     </div>
        
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <Field
//                           name="password"
//                           type={showPassword ? 'text' : 'password'}
//                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password && touched.password
//                             ? 'border-red-500 focus:ring-red-500'
//                             : 'border-gray-300 focus:ring-purple-500'
//                             }`}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//                         >
//                           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                         </button>
//                       </div>
//                       {errors.password && touched.password && (
//                         <div className="text-red-500 text-sm mt-1">{errors.password}</div>
//                       )}
//                     </div>
        
//                     <button
//                       type="submit"
//                       disabled={status === LoadingType.PENDING}
//                       className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {status === LoadingType.PENDING ? (
//                         <span className="flex items-center justify-center">
//                           <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                               fill="none"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             />
//                           </svg>
//                           Processing...
//                         </span>
//                       ) : isLogin ? (
//                         'Sign In'
//                       ) : (
//                         'Create Account'
//                       )}
//                     </button>
//                   </Form>
//                 )}
//               </Formik>
//     </div>
//   )
// }

import React from 'react'

export const Realloging = () => {
  return (
    <div>Realloging</div>
  )
}

  // Form submission handler
  // const handleSubmit = async (values: ILoginInput | IRegisterInput) => {

  //   if (isLogin) {

  //     await showPromise(

  //       dispatch(loginAction(values as ILoginInput)).unwrap(),
  //       {
  //         loading: 'Authenticating...',
  //         success: 'Welcome back!',
  //         error: (err) => {
  //           if (err instanceof Error) {
  //             return err.message;
  //           }
  //           return 'Login failed. Please try again.';
  //         }
  //       }
  //     );

  //   } else {
  //     await dispatch(registerAction(values as IRegisterInput)).unwrap();
  //   }
  // };
                            