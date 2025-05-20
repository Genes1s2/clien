// import React from "react";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router"; // 👉 Correct import (react-router-dom, not react-router)
// import { RootState } from "../../store";
// import { AuthUser } from "../../models/auth";

// const Sidebar = () => {
//   const user = useSelector<RootState, AuthUser | null>(
//     (state) => state.session.currentUser.entities
//   );

//   const isAdmin = user?.role.name === "admin";

//   const links = [
//     { path: "/dashboard", label: "Dashboard", requireAdmin: false },
//     { path: "/dashboard/documents", label: "Documents", requireAdmin: false },
//     { path: "/dashboard/admin/users", label: "Users", requireAdmin: true },
//     { path: "/dashboard/admin/users/roles", label: "Roles", requireAdmin: true },
//     { path: "/dashboard/admin/users/categories", label: "Categories", requireAdmin: true },
//   ];

//   return (
//     <aside className="bg-blue-600 overflow-x-scroll sidebar-scrollbar text-white">
//       <div className=" flex items-center justify-center">
//         <h1 className="uppercase">Fichiers</h1>
//       </div>
//       <div className="p-2">
//         <ul className=" flex">
//           {links.map((item, index) => {
//             if (item.requireAdmin && !isAdmin) {
//               return null;
//             }

//             return (
//               <li key={index}>
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `block p-2 rounded mt-1 ${
//                       isActive
//                         ? "bg-white text-blue-600 font-bold"
//                         : "text-white hover:bg-blue-700"
//                     }`
//                   }
//                 >
//                   {item.label}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { RootState } from "../../store";
import { AuthUser } from "../../models/auth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-600 text-white z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1 className="uppercase text-xl font-bold">Fichiers</h1>

          {/* Hamburger Button */}
          <button
            className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-2">
              <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
            </div>
          </button>

          {/* Desktop Menu (hidden on mobile) */}
          <div className="hidden lg:flex space-x-4">
            {links.map((item, index) => {
              if (item.requireAdmin && !isAdmin) return null;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive 
                        ? "bg-white text-blue-600 font-bold" 
                        : "text-white hover:bg-blue-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden origin-top transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'
        }`}>
          <ul className="pb-4 space-y-2">
            {links.map((item, index) => {
              if (item.requireAdmin && !isAdmin) return null;
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={handleCloseMenu}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-md text-sm ${
                        isActive
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;