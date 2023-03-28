import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/app";
import AuthLayout from "../layout/auth";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Protected from "./protected";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="app"
        element={
          <Protected>
            <AppLayout />
          </Protected>
        }
      ></Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/app" />} />
    </Routes>
  );
};

export default AppRouter;
