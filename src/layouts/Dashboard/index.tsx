import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[160px_1fr] bg-gray-200">
      <Sidebar />
      <div className="h-screen overflow-hidden">
        <Header />
        <main className="h-[calc(100vh-72px)] overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
