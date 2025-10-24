import React from "react";
import { LogOut } from "lucide-react";

function RecruiterSidebar({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { name: "Dashboard Home", key: "dashboard" },
    { name: "Received Applications", key: "received" },
    { name: "Shortlisted Candidates", key: "shortlisted" },
    { name: "Final Results", key: "results" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Tabs */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Recruiter Panel
        </h2>

        <ul className="space-y-3">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.key
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

      {/* Logout */}
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
