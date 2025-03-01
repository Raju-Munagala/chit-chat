import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  console.log({ authUser });
  return (
    <div className="text-red-500">
      <Navbar />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={authUser?<HomePage />:<Navigate to="/login"/>} />
          <Route path="/signup" element={!authUser?<SignupPage />:<Navigate to="/"/>} />
          <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/"/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  );
};

export default App;
