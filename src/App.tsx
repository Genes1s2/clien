import React from "react";
import { Navigate, Route, Routes } from "react-router";
import MainLayout from "./layouts/Main";
import DashboardLayout from "./layouts/Dashboard";
import Home from "./pages/Main/Home";
import About from "./pages/Main/About";
import Notfound from "./pages/Main/errors/Notfound";
import NotfoundDashboard from "./pages/Dashboard/errors/Notfound";
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthLayout from "./layouts/Auth";
import AuthForms from "./pages/auth/LogIn";
import SettingsPage from "./pages/Dashboard/others/SettingsPage";
import DocumentationPage from "./pages/Dashboard/others/DocumentationPage";
import SupportPage from "./pages/Dashboard/others/SupportPage";
import UserProfile from "./pages/Dashboard/user/UserProfile";
import AdminRoute from "./components/routesProtection/AdminRoutes";
import UserList from "./pages/Dashboard/user/UserList";
import UserAdminProfile from "./pages/Dashboard/user/UserAdminProfile";
import RolesPage from "./pages/Dashboard/rolePermissions/RolesPage";
import CategoriesPage from "./pages/Dashboard/Categories/CategoryPage";
import DocumentsPage from "./pages/Dashboard/document/DocumentPage";
import AllDeletedDocuments from "./components/document/AllDeletedDocuments";
import DeletedDocumentsPage from "./pages/Dashboard/document/DeletedDocumentsPage";
import DocumentDetailPage from "./pages/Dashboard/document/DocumentDetailPage";
// import CategoryList from "./pages/Dashboard/Categories";
// import DocumentList from "./pages/Dashboard/document";

const App = () => {

  return (
    <Routes>
      {/* <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<Navigate to={`home`} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Notfound />} />
      </Route> */}

      <Route path="" element={<AuthLayout />}>
        <Route path="/" index element={<Navigate to={`authentification`} />} />
        <Route path="authentification" element={<AuthForms />} />
        {/* <Route path="/se-connecter" index element={<Navigate to={`se-connecter`} />} /> */}
        {/* <Route path="auth/se-connecter" index element={<LogIn />} /> */}
        {/* <Route path="/créé-un-compte" element={<Register />} /> */}
        {/* <Route path="/réinisialiser-le-mot-de-pass" element={<About />} /> */}
        {/* <Route path="*" element={<Notfound />} /> */}
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="" index element={<Dashboard />} />
        <Route path="documents" >
          <Route path="" index element={<DocumentsPage />} />
          <Route path="deleted-documents" element={<DeletedDocumentsPage />} />
          <Route path=":documentId" element={<DocumentDetailPage />} />

        </Route>
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="documentation" element={<DocumentationPage />} />
        <Route path="support" element={<SupportPage />} />

        <Route path="admin/users" element={<AdminRoute />}>
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserAdminProfile />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
        <Route path="*" element={<NotfoundDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
