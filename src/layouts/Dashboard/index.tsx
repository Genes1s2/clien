import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { FolderArchive, FolderClosed, FolderOpen } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="overflow-hidden relative z-0 bg-gray-200 scroll h-screen overflow-y-auto">
      <div><FolderClosed size={200} className=" animate-pulse -z-10 opacity-30 fixed text-purple-700 top-28 left-6" /></div>
      <div><FolderOpen className=" animate-pulse -z-10 opacity-30 w-64 h-64 lg:w-96 lg:h-96 fixed text-purple-700 top-[19rem] left-0 md:top-[20rem] md:left-[16rem] lg:top-[20rem] lg:left-[35rem]" /></div>
      <div><FolderArchive size={200} className=" animate-pulse -z-10 opacity-30 fixed text-purple-700 bottom-0 md:bottom-10 right-2" /></div>
      <Header />
      <div className="z-50">
        <main className="min-h-[calc(100vh-8rem)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
