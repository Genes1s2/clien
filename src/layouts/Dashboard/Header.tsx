// import React, {useMemo} from "react";
// import { useSelector } from "react-redux";
// import { AuthUser } from "../../models/auth";
// import { RootState } from "../../store";
// import { SkeletonLoader } from "../../components/SkeletonLoader";
// import { getRandomColor } from "../../utils/RandomColor";

// const Header = () => {
//   const user = useSelector<RootState, AuthUser | null>(
//     (state) => state.session.currentUser.entities
//   );
  
//   const avatarBgColor = useMemo(() => getRandomColor(), []);

//   if (!user) {
//     return (
//       <header className="sticky w-full top-0 p-3 flex items-center justify-end bg-blue-600 text-white shadow-md">
//         <SkeletonLoader />
//       </header>
//     );
//   }

//   return (
//     <header className="sticky top-0 p-4 flex items-center justify-between bg-blue-600 text-white shadow-md">
//       <div className="text-xl font-bold">Dashboard</div>

//       <div className="flex items-center gap-4">
//         <div className="text-right">
//           <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
//           <p className="text-sm opacity-90">{user.email}</p>
//         </div>
//         <div className={`h-10 w-10 rounded-full ${avatarBgColor} flex items-center justify-center`}>
//           <span className="font-medium">
//             {user.firstName[0]}
//             {user.lastName[0]}
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useMemo, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../../models/auth";
import { RootState } from "../../store";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { getRandomColor } from "../../utils/RandomColor";
import { logout } from "../../store/auth/slice";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const user = useSelector<RootState, AuthUser | null>(
    (state) => state.session.currentUser.entities
  );
  
  const avatarBgColor = useMemo(() => getRandomColor(), []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/authentification");
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <header className="sticky w-full top-0 p-3 flex items-center justify-end bg-blue-600 text-white shadow-md">
        <SkeletonLoader />
      </header>
    );
  }

  return (
    <header className="sticky top-0 p-4 flex items-center justify-between bg-blue-600 text-white shadow-md z-50">
      <div className="text-xl font-bold">Dashboard</div>

      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <div 
          className="flex items-center gap-4 cursor-pointer hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors"
          onClick={toggleDropdown}
        >
          <div className="text-right">
            <p className="font-medium uppercase text-[16px]">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm opacity-90">{user.email}</p>
          </div>
          <div className={`h-10 w-10 rounded-full ${avatarBgColor} flex items-center justify-center`}>
            <span className="font-medium">
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          </div>
        </div>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
            <Link
              to="/dashboard/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/dashboard/settings"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <Link
              to="/dashboard/documentation"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Documentation
            </Link>
            <Link
              to="/dashboard/support"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Support
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;