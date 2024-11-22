import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Profile,
  Conversations,
  Settings,
  Notifications,
  Bookmarks,
  Discover,
} from "./pages"; // Destructure from the index file
import Modal from "./pages/components/Modal";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AlertProvider, useAlert } from "./context/AlertContext";
import { Alert } from "./components";
import { fetchCurrent } from "./api/request";
import useUserStore from "./store/useUserStore";

const App = () => {
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        const response = await fetchCurrent();
        setCurrentUser(response);
      };
      fetchUser();
    }
  }, [setCurrentUser]);

  return (
    <AlertProvider>
      <AlertDisplay />
      <Routes>
        {/* Protected routes for authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <Conversations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </AlertProvider>
  );
};

const AlertDisplay = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  return <Alert type={alert.type} message={alert.message} onClose={() => {}} />;
};

export default App;
