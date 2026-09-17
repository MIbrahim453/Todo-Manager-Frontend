import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import NotFound from "./pages/NotFound";

import UserDashboard from "./pages/User/Dashboard";
import MyTodos from "./pages/User/MyTodos";
import SharedWithMe from "./pages/User/SharedWithMe";
import Profile from "./pages/User/Profile";

import AdminDashboard from "./pages/Admin/Dashboard";
import AllUsers from "./pages/Admin/AllUsers";
import AllTodos from "./pages/Admin/AllTodos";
import AdminProfile from "./pages/Admin/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/todos" element={<MyTodos />} />
          <Route path="/user/shared-with-me" element={<SharedWithMe />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/todos" element={<AllTodos />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
