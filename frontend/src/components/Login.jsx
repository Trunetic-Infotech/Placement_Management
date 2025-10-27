import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("placementOfficer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, role };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    onLogin(userData);

    if (role === "student") navigate("/student");
    else if (role === "placementOfficer") navigate("/placementOfficer");
    else if (role === "admin") navigate("/admin");
    else if (role === "recruiter") navigate("/recruiter");
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
          {/* <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              <option value="admin">Admin</option>
              <option value="placementOfficer">Placement Officer</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base font-medium"
          >
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