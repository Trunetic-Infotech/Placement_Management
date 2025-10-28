import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function RecruiterSidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Dashboard Home", path: "/recruiter" },
    {name:"Manage Profile", path:"/recruiter/profile"},
    { name: "Add Job", path: "/recruiter/add-job" },
    { name: "Received Applications", path: "/recruiter/received-applications" },
    { name: "Shortlisted Candidates", path: "/recruiter/shortlisted-list" },
    { name: "Final Results", path: "/recruiter/final-results" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Recruiter Panel
        </h2>
        <ul className="space-y-3">
          {tabs.map((tab) => (
            <li key={tab.path}>
              <button
                onClick={() => navigate(tab.path)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  location.pathname === tab.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={() => {
            if (onLogout) onLogout();
            else console.warn("onLogout not defined!");
          }}
          className="flex items-center gap-3 w-full text-red-600 hover:text-red-700 p-2 rounded-lg transition font-semibold"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default RecruiterSidebar;
