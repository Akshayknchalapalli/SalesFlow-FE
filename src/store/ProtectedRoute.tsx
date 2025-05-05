import React from "react";
import { Outlet, Navigate } from "react-router-dom";

interface IProtectedRoute {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
