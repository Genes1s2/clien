import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import DashboardLayout from "./layouts/Dashboard";
import NotfoundDashboard from "./pages/Dashboard/errors/Notfound";
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
import DeletedDocumentsPage from "./pages/Dashboard/document/DeletedDocumentsPage";
import DocumentDetailPage from "./pages/Dashboard/document/DocumentDetailPage";

const App = () => {
  useEffect(() => {
    document.title = "Document Management System";
  }, []);
  return (
    <Routes>

      <Route path="" element={<AuthLayout />}>
        <Route path="/" index element={<Navigate to={`authentification`} />} />
        <Route path="authentification" element={<AuthForms />} />
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="documents" index element={<DocumentsPage />} />
        <Route path="documents/deleted-documents" element={<DeletedDocumentsPage />} />
        <Route path="documents/:documentId" element={<DocumentDetailPage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="documentation" element={<DocumentationPage />} />
        <Route path="support" element={<SupportPage />} />

        <Route path="admin" element={<AdminRoute />}>
          <Route path="users" index element={<UserList />} />
          <Route path="users/:userId" element={<UserAdminProfile />} />
          {/* <Route path="roles" element={<RolesPage />} /> */}
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
        <Route path="*" element={<NotfoundDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
