import React from "react";
import { useSelector } from "react-redux";
import { AuthUser } from "../../models/auth";
import { RootState } from "../../store";


const Header = () => {
  const user = useSelector<RootState, AuthUser | null>(
    (state) => state.auth.currentUser.entities
  );

  if (!user) {
    return (
      <header className="sticky top-0 p-3 flex items-center justify-end bg-blue-600 text-white shadow-md">
        <div className=" animate-pulse">Loading user data...</div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 p-4 flex items-center justify-between bg-blue-600 text-white shadow-md">
      <div className="text-xl font-bold">Dashboard</div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm opacity-90">{user.email}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center">
            <span className="font-medium">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;