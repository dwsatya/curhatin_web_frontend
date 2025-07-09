import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/layout/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./providers/AuthProvider";
import ForumPage from "./pages/ForumPage";
import AdminPage from "./pages/AdminPage";
import KelolaPendengarPage from "./pages/KelolaPendengarPage";
import KelolaSeminarPage from "./pages/KelolaSeminarPage";
import CurhatPage from "./pages/CurhatPage";
import SeminarPage from "./pages/SeminarPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>  
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
          element={<PrivateRoute component={<ForumPage />} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute component={<AdminPage />} />}
        />
        <Route
          path="/admin/pendengar"
          element={<PrivateRoute component={<KelolaPendengarPage />} />}
        />
        <Route
          path="/admin/seminar"
          element={<PrivateRoute component={<KelolaSeminarPage />} />}
        />
        <Route
          path="/curhat"
          element={<PrivateRoute component={<CurhatPage />} />}
        />
        <Route
          path="/seminar"
          element={<PrivateRoute component={<SeminarPage />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute component={<ProfilePage />} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
