import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please enter email, password, and select your role", {
        style: {
          background: "#FFF5F5", // soft rose background
          borderLeft: "6px solid #EF4444", // strong red accent on left
          color: "#B91C1C", // deep red text
          padding: "16px 20px",
          borderRadius: "8px",
          fontWeight: "600",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 8px 20px rgba(239, 68, 68, 0.25)", // floating shadow
        },
        icon: "⚠️", // adds a warning emoji
      });

      return;
    }

    try {
      let endpoint = "";
      console.log(role);

      // Choose the correct API endpoint based on role
      switch (role) {
        case "student":
          endpoint = `${import.meta.env.VITE_API_URL}/student/login/student`;
          break;
        case "admin":
          endpoint = `${import.meta.env.VITE_API_URL}/admin/login`;
          break;
        case "recruiter":
          endpoint = `${import.meta.env.VITE_API_URL}/recruiter/login`;
          break;
        default:
          toast.error("Invalid role selected");
          return;
      }

      // Call backend API
      const response = await axios.post(endpoint, { email, password });

      if (response.data?.success) {
        const userData = {
          ...response.data.user,
          token: response.data.token,
          role,
        };
        // navigate("");
        // Save to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(userData));

        toast.success(
          response.data.message || `Welcome ${userData.name || "back"}!`,
          {
            style: {
              border: "1px solid #3B82F6", // Tailwind's blue-500
              padding: "12px 16px",
              color: "#1E3A8A", // Tailwind's blue-900
              background: "#EFF6FF", // blue-50
              borderRadius: "10px",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#3B82F6",
              secondary: "#EFF6FF",
            },
          }
        );

        onLogin(userData);

        // Navigate based on role
        if (role === "student") navigate("/student");
        else if (role === "admin") navigate("/admin");
        else if (role === "recruiter") navigate("/recruiter");
      } else {
        toast.error(response.data?.message || "Invalid credentials", {
          style: {
            border: "1px solid #DC2626", // red-600
            background: "#FEF2F2", // red-50
            color: "#7F1D1D", // red-900
            padding: "12px 16px",
            borderRadius: "10px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
          },
        });
      }
    } catch (error) {
      setError(error);
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
        {
          style: {
            border: "1px solid #DC2626", // red-600
            background: "#FEF2F2", // red-50
            color: "#7F1D1D", // red-900
            padding: "12px 16px",
            borderRadius: "10px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-80 md:w-96">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">
          Dashboard Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm md:text-base">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              // required
            />
          </div>

          {/* Password field - commented out but visible in code */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base font-medium">
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-gray-500 text-xs md:text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
