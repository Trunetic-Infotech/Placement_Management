import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Login({ onLogin }) {
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
        localStorage.setItem(`token`, response.data.token);

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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side illustration */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Login Illustration"
          className="w-3/4 h-auto animate-fadeIn"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6 md:p-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials to access your dashboard
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded-md">
              {error}
            </p>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Login
          </button>

          {/* Links */}
          <div className="flex justify-between mt-4 text-gray-500 text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
