import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import StudentDashboard from "./dashboards/student/StudentDashboard";
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import RecruiterDashboard from "./dashboards/recruiter/RecruiterDashboard";
import CompanyDashboard from "./dashboards/company/CompanyDashboard"; // Add this import
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = ({ email, role }) => {
    const userData = { email, role };
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    console.log(children, allowedRoles);
    
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
    return React.cloneElement(children, { onLogout: handleLogout, user });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  console.log(user);
  

  return (
    <Router>
      <Routes>
        {/* Redirect root based on role */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "student" ? (
                <Navigate to="/student" replace />
              ) : user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : user.role === "recruiter" ? (
                <Navigate to="/recruiter" replace />
              ) : user.role === "company" ? (
                <Navigate to="/company" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth pages */}
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            user ? <Navigate to="/" replace /> : <Register />
          } 
        />

        {/* Dashboards */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/*"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/*"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;