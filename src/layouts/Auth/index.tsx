import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className={`custom-bg-auth w-full h-screen grid grid-cols-1 lg:grid-cols-2`}>
      <div className="hidden lg:flex flex-col justify-center items-center">
        
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center px-4 z-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
