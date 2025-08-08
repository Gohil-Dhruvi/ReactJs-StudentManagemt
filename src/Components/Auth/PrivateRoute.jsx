import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;