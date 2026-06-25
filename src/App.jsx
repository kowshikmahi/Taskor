import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ClientsPage from "./pages/ClientsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="clients" element={<ClientsPage />} />
      </Route>
    </Routes>
  );
}