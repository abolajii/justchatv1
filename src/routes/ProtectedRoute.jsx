import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user); // Access the user state from useUserStore
  return user !== null ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
