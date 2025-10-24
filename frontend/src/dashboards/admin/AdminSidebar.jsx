import React from "react";
import { Home, User, Briefcase, Users, FileText, LogOut } from "lucide-react";

function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { name: "Dashboard", key: "dashboard", icon: Home },
    { name: "Manage Students", key: "students", icon: User },
    { name: "Manage Placement Officers", key: "officers", icon: Users },
    { name: "Manage Jobs", key: "jobs", icon: Briefcase },
    { name: "Reports", key: "reports", icon: FileText },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Sidebar Top */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-blue-700 text-center">
          Admin Panel
        </h2>
        <ul className="space-y-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-3 w-full p-2 rounded-lg transition font-medium ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <Icon size={20} /> {tab.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={() => onLogout && onLogout()}
          className="flex items-center gap-3 w-full text-red-600 hover:text-red-700 p-2 rounded-lg transition font-semibold"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
