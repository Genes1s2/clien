// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router";
// import { RootState } from "../../store";
// import { AuthUser } from "../../models/auth";

// const Sidebar = () => {
//   const user = useSelector<RootState, AuthUser | null>(
//     (state) => state.session.currentUser.entities
//   );

//   const isAdmin = user?.role.name === 'admin';

//   return (
//     <aside className="bg-blue-600 overflow-y-scroll h-screen sidebar-scrollbar text-white">
//       <div className="h-[48px] flex items-center justify-center">
//         <h1 className="uppercase">Fichiers</h1>
//       </div>
//       <div className="p-2">
//         <ul>
//           {[
//             {  path: "/dashboard", label: "Dashboard" },
//             {  path: "/dashboard/admin/users", label: "Users" },
//             { isAdmin, path: "/dashboard/courses", label: "Courses" },
//           ].map((item, index) => {
//             return (
//               <li key={index}>
//                 <Link className={`${isAdmin ? '' : 'hidden'}`} to={item.path}>{item.label}</Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router"; // 👉 Correct import (react-router-dom, not react-router)
import { RootState } from "../../store";
import { AuthUser } from "../../models/auth";

const Sidebar = () => {
  const user = useSelector<RootState, AuthUser | null>(
    (state) => state.session.currentUser.entities
  );

  const isAdmin = user?.role.name === "admin";

  const links = [
    { path: "/dashboard", label: "Dashboard", requireAdmin: false },
    { path: "/dashboard/admin/users", label: "Users", requireAdmin: true },
    { path: "/dashboard/courses", label: "Courses", requireAdmin: false },
  ];

  return (
    <aside className="bg-blue-600 overflow-y-scroll h-screen sidebar-scrollbar text-white">
      <div className="h-[48px] flex items-center justify-center">
        <h1 className="uppercase">Fichiers</h1>
      </div>
      <div className="p-2">
        <ul>
          {links.map((item, index) => {
            if (item.requireAdmin && !isAdmin) {
              return null;
            }

            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block p-2 rounded mt-1 ${
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
    </aside>
  );
};

export default Sidebar;
