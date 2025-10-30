import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const userData = { email, role, name: email.split("@")[0] };
    onLogin(userData);

    switch (role) {
      case "student":
        navigate("/student");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "recruiter":
        navigate("/recruiter");
        break;
      case "company":
        navigate("/company");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image/illustration */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Login Illustration"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials to access your dashboard
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
                <option value="company">Company</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <div className="flex justify-between mt-6 text-gray-500 text-sm">
            <span className="hover:text-blue-600 cursor-pointer">Forgot Password?</span>
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
