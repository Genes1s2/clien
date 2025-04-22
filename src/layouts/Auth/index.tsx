import React from "react";
import { Outlet } from "react-router";
import Side from "./Side";

const AuthLayout = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 overflow-hidden">
        <div className=" bg-black">
          <Side />
        </div>
        <div className=" h-screen bg-slate-700 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
