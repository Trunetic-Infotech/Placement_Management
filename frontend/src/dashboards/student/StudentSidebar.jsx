import React from "react";
import { Home, User, Briefcase, FileText, Award, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";

function StudentSidebar({ isSidebarOpen, toggleSidebar, onLogout }) {
  const tabs = [
    { name: "Dashboard", path: "/student", icon: Home },
    { name: "My Profile", path: "/student/profile", icon: User },
    { name: "Job Openings", path: "/student/jobs", icon: Briefcase },
    { name: "My Applications", path: "/student/applications", icon: FileText },
    { name: "Placement Results", path: "/student/results", icon: Award },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 h-screen bg-white shadow-lg flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-blue-700">Student Panel</h2>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.path}>
                  <NavLink
                    to={tab.path}
                    end={tab.path === "/student"}
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 w-full p-3 rounded-lg transition font-medium ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-blue-100"
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Fixed Logout Button */}
        <div className="sticky bottom-0 bg-white  border-gray-200 p-6">
          <button
            onClick={() => onLogout && onLogout()}
            className="flex items-center gap-3 w-full text-red-600 hover:text-red-700 p-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default StudentSidebar;