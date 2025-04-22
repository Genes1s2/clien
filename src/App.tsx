import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainLayout from "./layouts/Main";
import DashboardLayout from "./layouts/Dashboard";
import Home from "./pages/Main/Home";
import About from "./pages/Main/About";
import Notfound from "./pages/Main/errors/Notfound";
import NotfoundDashboard from "./pages/Dashboard/errors/Notfound";
import Dashboard from "./pages/Dashboard/Dashboard";
import LogIn from "./pages/auth/LogIn";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/Auth";
import AuthForms from "./pages/auth/LogIn";
// import CategoryList from "./pages/Dashboard/Categories";
// import DocumentList from "./pages/Dashboard/document";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" index element={<Navigate to={`home`} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Notfound />} />
          </Route>

          <Route path="authentification" element={<AuthLayout />}>
          <Route path="" index element={<AuthForms />} />
            {/* <Route path="/se-connecter" index element={<Navigate to={`se-connecter`} />} /> */}
            {/* <Route path="auth/se-connecter" index element={<LogIn />} /> */}
            {/* <Route path="/créé-un-compte" element={<Register />} /> */}
            {/* <Route path="/réinisialiser-le-mot-de-pass" element={<About />} /> */}
            {/* <Route path="*" element={<Notfound />} /> */}
          </Route>

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="" index element={<Dashboard />} />
            {/* <Route path="categories" element={<CategoryList />} /> */}
            {/* <Route path="courses" element={<DocumentList />} /> */}
            <Route path="*" element={<NotfoundDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
