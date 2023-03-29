import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";

const Protected = ({ children }) => {
  const { getToken } = useApp();
  const [canAccess, setCanAccess] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      setCanAccess(false);
    } else {
      setCanAccess(true);
    }
  }, [token]);

  if (canAccess === null) return <div />;

//   if (!canAccess) return <Navigate to="/auth" replace />;

  return children;
};
export default Protected;
