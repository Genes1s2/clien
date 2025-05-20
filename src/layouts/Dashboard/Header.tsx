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
import { AppDispatch, RootState } from "../../store";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { getRandomColor } from "../../utils/RandomColor";
import { logout } from "../../store/auth/slice";
import { Link, NavLink, useNavigate } from "react-router";
import SearchModal from "../../components/search/searchModal";
import { searchDocuments } from "../../store/search/action";
import { FileSearch, SearchCheck } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarBgColor = useMemo(() => getRandomColor(), []);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector<RootState, AuthUser | null>(
    (state) => state.session.currentUser.entities
  );

  const isAdmin = user?.role.name === "admin";

  const links = [
    { path: "/dashboard", label: "Dashboard", requireAdmin: false },
    { path: "/dashboard/documents", label: "Documents", requireAdmin: false },
    { path: "/dashboard/admin/users", label: "Users", requireAdmin: true },
    { path: "/dashboard/admin/users/roles", label: "Roles", requireAdmin: true },
    { path: "/dashboard/admin/users/categories", label: "Categories", requireAdmin: true },
  ];

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

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(searchDocuments(searchQuery));
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
      {/* Left Section - Hamburger Menu and Logo */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-blue-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-2">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        {/* Logo */}
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 mr-4"
        >
          <span className="text-xl font-bold uppercase tracking-wider">
            Fichiers
          </span>
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {links.map((item, index) => {
            if (item.requireAdmin && !isAdmin) return null;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive
                    ? "bg-white text-blue-600 font-bold"
                    : "text-white hover:bg-blue-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
          {/* Search Input */}
          <div className="ml-4 flex-1 max-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className=" w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-0 bottom-0 p-1 text-gray-500 hover:text-blue-600"
              >
                <FileSearch />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`absolute lg:hidden top-full left-0 w-full bg-blue-600 transition-all duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <ul className="p-4">
          {links.map((item, index) => {
            if (item.requireAdmin && !isAdmin) return null;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block p-2 rounded-md text-sm ${isActive
                      ? "bg-white text-blue-600 font-bold"
                      : "text-white hover:bg-blue-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
          <li>
            {/* Search Input */}
            <div className=" flex-1 max-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="relative w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-0 bottom-0 p-1 text-gray-500 hover:text-blue-600"
                >
                  <FileSearch />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <SearchModal />
      {/* user profile */}
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