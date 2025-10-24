import React from "react";
import { Home, User, Briefcase, FileText, Award, LogOut } from "lucide-react";

function StudentSidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between min-h-screen">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">
          Student Panel
        </h2>

        <ul className="space-y-4">
          {[
            { key: "dashboard", label: "Dashboard", icon: Home },
            { key: "profile", label: "My Profile", icon: User },
            { key: "jobs", label: "Job Openings", icon: Briefcase },
            { key: "applications", label: "My Applications", icon: FileText },
            { key: "results", label: "Placement Results", icon: Award },
          ].map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition ${
                activeTab === tab.key
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <tab.icon size={20} /> {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          if (onLogout) onLogout();
          else alert("Logout handler not defined!");
        }}
        className="flex items-center gap-3 w-full text-red-600 hover:text-red-700 p-2 rounded-lg transition font-semibold"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}

export default StudentSidebar;