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
  Register,
  ViewProfile,
} from "./pages"; // Destructure from the index file
import ProtectedRoute from "./routes/ProtectedRoute";
import { AlertProvider, useAlert } from "./context/AlertContext";
import { Alert } from "./components";
import { getMe } from "./api/request";
import useUserStore from "./store/useUserStore";
import BookmarkFolder from "./pages/bookmark/components/BookmarkFolder";
import Trade from "./pages/trade/Trade";
import TradeOnboarding from "./pages/trade/TradeOnboarding";
import Future from "./pages/future/Future";
import UserSignal from "./pages/future/UserSignal";
import Signals from "./pages/future/Signals";
import SignalSettings from "./pages/future/Settings";
import ViewSignal from "./pages/future/ViewSignal";
import AllSignals from "./pages/future/AllSignals";
import SignalCalculator from "./pages/future/SignalCalculator";
import DailySignal from "./pages/future/DailySignal";

const App = () => {
  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        const response = await getMe();
        setCurrentUser(response.user);
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
          path="/profile/:uid"
          element={
            <ProtectedRoute>
              <ViewProfile />
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
          path="/conversation/:id"
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
          path="/bookmarks/:fid"
          element={
            <ProtectedRoute>
              <BookmarkFolder />
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
        <Route
          path="/trade"
          element={
            <ProtectedRoute>
              <SignalCalculator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <Trade />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trade/onboarding"
          element={
            <ProtectedRoute>
              <TradeOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trade/view"
          element={
            <ProtectedRoute>
              <Future />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trade/signal"
          element={
            <ProtectedRoute>
              <UserSignal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signal/all"
          element={
            <ProtectedRoute>
              <AllSignals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signal/day/:day"
          element={
            <ProtectedRoute>
              <DailySignal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trade/future"
          element={
            <ProtectedRoute>
              <Signals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trade/settings"
          element={
            <ProtectedRoute>
              <SignalSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trade/view/:id"
          element={
            <ProtectedRoute>
              <ViewSignal />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
