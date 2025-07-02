import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/layout/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={<PrivateRoute component={<Dashboard />} />}
      />
      <Route
        path="/"
        element={<PrivateRoute component={<Dashboard />} />}
      />
      <Route
        path="/forum"
        element={<PrivateRoute component={<LoginPage />} />}
      />


    </Routes>
  );
}

export default App;
