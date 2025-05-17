// import React from "react";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Header from "./Header";
// import { Outlet } from "react-router";

// const DashboardLayout = () => {
//   return (
//     // <div className="grid grid-cols-[160px_1fr] bg-gray-200">
//     //   <Sidebar />
//     //   <div className="h-screen overflow-hidden">
//     //     <Header />
//     //     <main className="h-[calc(100vh-72px)] overflow-y-auto">
//     //       <Outlet />
//     //     </main>
//     //     <Footer />
//     //   </div>
//     // </div>
    
//     <div className=" bg-gray-200">
//       <Sidebar />
//       <div className="h-screen overflow-hidden">
//         <Header />
//         <main className=" overflow-y-auto">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Updated Sidebar (now acting as top navigation) */}
      <Sidebar /><Header />
      
      {/* Main Content Area */}
      <div className="pt-16"> {/* Add padding-top equal to navbar height */}
        <main className="min-h-[calc(100vh-8rem)] p-4 md:p-6 lg:p-8"> {/* Adjust padding */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
