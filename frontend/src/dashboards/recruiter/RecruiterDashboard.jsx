import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import RecruiterSidebar from "./RecruiterSidebar";
import ReceivedApplications from "./ReceivedApplications";
import ShortlistedList from "./ShortlistedList";
import FinalResults from "./FinalResults";
import RecruiterProfileForm from "./RecruiterProfileForm";
import AddJobs from "./AddJobs";

function RecruiterDashboard({ onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 🧩 Dummy Recruiter Data
  const [recruiter] = useState({
    companyName: "TechNova Pvt Ltd",
    companyEmail: "hr@technova.com",
    hrName: "Aditi Sharma",
    industryType: "IT Services",
    jobPosting: "Software Developer Intern",
    websiteUrl: "https://technova.com",
    hrPhoto: "https://via.placeholder.com/100",
    companyLogo: "https://via.placeholder.com/100",
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <RecruiterSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4 sticky top-0 z-40 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white p-6 rounded-2xl shadow max-w-4xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                    My Profile
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Company Name", value: recruiter.companyName },
                      { label: "Company Email", value: recruiter.companyEmail },
                      { label: "HR Name", value: recruiter.hrName },
                      { label: "Industry Type", value: recruiter.industryType },
                      { label: "Job Posting", value: recruiter.jobPosting },
                      { label: "Website URL", value: recruiter.websiteUrl },
                    ].map((item, index) => (
                      <div key={index}>
                        <label className="font-semibold text-gray-700">
                          {item.label}
                        </label>
                        <input
                          type="text"
                          value={item.value || ""}
                          disabled
                          className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed mt-1"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="font-semibold text-gray-700">
                        HR Photo
                      </label>
                      <img
                        src={recruiter.hrPhoto}
                        alt="HR"
                        className="w-24 h-24 object-cover rounded-full mt-2 border"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700">
                        Company Logo
                      </label>
                      <img
                        src={recruiter.companyLogo}
                        alt="Company Logo"
                        className="w-24 h-24 object-cover rounded mt-2 border"
                      />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="add-job" element={<AddJobs />} />
            <Route path="profile" element={<RecruiterProfileForm />} />
            <Route path="received-applications" element={<ReceivedApplications />} />
            <Route path="shortlisted-list" element={<ShortlistedList />} />
            <Route path="final-results" element={<FinalResults />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;
