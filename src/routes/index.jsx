import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/app";
import AuthLayout from "../layout/auth";
import Home from "../pages/app";
import Content from "../pages/app/content";
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
      >
        <Route index element={<Home />} />
        <Route path={`content/:id`} element={<Content />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/app" />} />
    </Routes>
  );
};

export default AppRouter;
