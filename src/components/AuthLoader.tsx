// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { restoreUser } from '../store/auth/actions';
// import { AppDispatch, RootState } from '../store';
// import { LoadingType } from '../models/store';
// import { clearError } from '../store/auth/slice';
// import { useNavigate } from 'react-router';
// import { getAuthError } from '../utils/ErrorMessages';
// import { showError } from '../utils/Notifications';

// const AuthLoader = ({ children }: { children: React.ReactNode }) => {

//     const { status, error } = useSelector((state: RootState) => state.auth.currentUser);
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const [startTime, setStartTime] = useState<number>(0);
//     const [showDelayMessage, setShowDelayMessage] = useState(false);
//     const checked = useRef(false);

//     useEffect(() => {
//         if (checked.current) return;
//         checked.current = true;

//         let isMounted = true;
//         const checkAuth = async () => {
//           if (!isMounted) return;
//             const token = localStorage.getItem("token");
//             if (token && status === LoadingType.IDLE) {
//                 try {
//                     await dispatch(restoreUser()).unwrap();
//                 } catch (error) {
//                     console.error("Session restoration failed:", error);
//                     localStorage.removeItem("token");
//                     dispatch(clearError());
//                     showError("Session expired. Please log in again.");
//                     navigate("/authentification");
//                 }
//             } else {
//                 dispatch(clearError());
//                 console.log('yes');

//                 navigate("/authentification");
//             }
//         };
//         checkAuth();
//         return () => {
//             isMounted = false;
//           };
//     }, [dispatch, navigate, status]);

//     // Show error alert if exists
//     useEffect(() => {
//         if (error) {
//             const friendlyMessage = getAuthError(error);
//             showError(friendlyMessage);
//             dispatch(clearError());

//             if (['INVALID_TOKEN', 'SESSION_EXPIRED'].includes(error)) {
//                 navigate('/authentification');
//             }
//         }
//     }, [error, dispatch, navigate]);

//     useEffect(() => {
//         if (status === LoadingType.PENDING) {

//           const timer = setTimeout(() => {
//             setShowDelayMessage(true);
//           }, 3000);

//           return () => clearTimeout(timer);
//         }
//       }, [status]);

//       if (status === LoadingType.PENDING) {
//         return (
//           <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//             {showDelayMessage && (
//               <p className="mt-4 text-gray-600">Taking longer than usual...</p>
//             )}
//           </div>
//         );
//       }

//     return <>{children}</>;
// };

// export default AuthLoader;

// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../store';
// import { useNavigate } from 'react-router';

// const AuthLoader = ({ children }: { children: React.ReactNode }) =>  {
//       const { status, error } = useSelector((state: RootState) => state.auth.currentUser);
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//   return <>{children}</>;
// }

// export default AuthLoader

// components/AuthLoader.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router";
import { restoreUser } from "../store/auth/restoreUser/actions";
import { LoadingType } from "../models/store";
import { clearError } from "../store/auth/slice";
import { showError } from "../utils/Notifications";
import { getAuthError } from "../utils/ErrorMessages";

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const { status, error } = useSelector((state: RootState) => state.session.currentUser);
  const { entities } = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === LoadingType.SUCCESS && entities) {
      navigate("/dashboard");
    }

    if (status === LoadingType.REJECTED) {
      navigate("/authentification");
    }
  }, [status, entities, navigate]);

  // Show error alert if exists
  useEffect(() => {
    if (error) {
      const friendlyMessage = getAuthError(error);
      showError(friendlyMessage);
      dispatch(clearError());

      if (['INVALID_TOKEN', 'SESSION_EXPIRED'].includes(error)) {
        navigate('/authentification');
      }
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    if (status === LoadingType.PENDING) {

      const timer = setTimeout(() => {
        setShowDelayMessage(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === LoadingType.PENDING) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        {showDelayMessage && (
          <p className="mt-4 text-gray-600">Taking longer than usual...</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLoader;