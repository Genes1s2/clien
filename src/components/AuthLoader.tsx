import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../store/auth/actions';
import { AppDispatch, RootState } from '../store';

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    const { status, error } = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch<AppDispatch>();

     useEffect(() => {
    // if (status === LoadingType.SUCCESS) {
    //   alert(isLogin ? 'Login successful!' : 'Registration successful!');
    // }

    if (error) {
      console.log("error token: ", error);
      alert( 'restoration failed');
    }
  }, [status, error]);
  useEffect(() => {
    // Check for existing token and restore user
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(restoreUser());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthLoader;