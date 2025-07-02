import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/layout/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
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
