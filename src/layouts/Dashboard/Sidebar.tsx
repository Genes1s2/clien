import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="bg-blue-600 overflow-y-scroll h-screen sidebar-scrollbar text-white">
      <div className="h-[48px] flex items-center justify-center">
        <h1 className="uppercase">Getsmarter</h1>
      </div>
      <div className="p-2">
        <ul>
          {[
            { path: "/admin", label: "Dashboard" },
            { path: "/admin/categories", label: "Categories" },
            { path: "/admin/courses", label: "Courses" },
          ].map((item, index) => {
            return (
              <li>
                <Link to={item.path}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
