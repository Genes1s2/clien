import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router";
import { restoreUser } from "../store/auth/restoreUser/actions";
import { LoadingType } from "../models/store";
import { clearError } from "../store/auth/slice";
import { showError } from "../utils/Notifications";
import { getAuthError } from "../utils/ErrorMessages";
import { clearRestoreError } from "../store/auth/restoreUser/slice";

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const { status, error } = useSelector((state: RootState) => state.session.currentUser);
  const { entities, status: authStatus } = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch, entities]);

  useEffect(() => {
    // if (status === LoadingType.SUCCESS && entities) {
    //   navigate("/dashboard/documents");
    //   dispatch(clearError());
    // }

    // if (status === LoadingType.REJECTED) {
    //   dispatch(clearRestoreError());
    //   navigate("/authentification");
    // }
    
    if (status !== LoadingType.PENDING) {
      if (authStatus === LoadingType.SUCCESS && entities) {
        navigate("/dashboard/documents");
        dispatch(clearError());
        // dispatch(clearRestoreError());
      }
      else if (status === LoadingType.REJECTED && !entities) {
        navigate("/authentification");
      }
    }
  }, [status, entities, navigate, dispatch]);

  // Show error alert if exists
  useEffect(() => {
    if (error) {
      console.error("AuthLoader error:", error);
      const friendlyMessage = getAuthError(error);
      showError(friendlyMessage);
      
      dispatch(clearError());
      dispatch(clearRestoreError());

      if (['INVALID_TOKEN', 'SESSION_EXPIRED'].includes(error) && !entities) {
        navigate('/authentification');
      }
    }
  }, [error, entities, dispatch, navigate]);

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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        {showDelayMessage && (
          <p className="mt-4 text-gray-600">Taking longer than usual...</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLoader;