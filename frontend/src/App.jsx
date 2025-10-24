import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import StudentDashboard from "./dashboards/student/StudentDashboard";
import PlacementOfficerDashboard from "./dashboards/placement/PlacementOfficerDashboard";
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import RecruiterDashboard from "./dashboards/recruiter/RecruiterDashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  // ✅ Save user after login
  const handleLogin = ({ email, role }) => {
    const userData = { email, role };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading) return null;
    if (!user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/login" />;
    return React.cloneElement(children, { onLogout: handleLogout, user });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard based on role */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "student" ? (
                <Navigate to="/student" replace />
              ) : user.role === "placementOfficer" ? (
                <Navigate to="/placementOfficer" replace />
              ) : user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : user.role === "recruiter" ? (
                <Navigate to="/recruiter" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based dashboards */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placementOfficer"
          element={
            <ProtectedRoute allowedRoles={["placementOfficer"]}>
              <PlacementOfficerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
