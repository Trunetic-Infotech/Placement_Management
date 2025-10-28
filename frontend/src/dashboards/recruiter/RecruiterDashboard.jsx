import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar";
import ReceivedApplications from "./ReceivedApplications";
import ShortlistedList from "./ShortlistedList";
import FinalResults from "./FinalResults";
import RecruiterProfileForm from "./RecruiterProfileForm";
import AddJobs from "./AddJobs";

// Placeholder AddJob component
function AddJob() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Job</h2>
      <p className="text-gray-600">Job upload form will go here.</p>
    </div>
  );
}

function RecruiterDashboard({ onLogout }) {
  const [recruiter, setRecruiter] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const email = loggedInUser?.email;

    const allRecruiters = JSON.parse(localStorage.getItem("recruiters")) || [];
    if (email) {
      const loggedRecruiter =
        allRecruiters.find((r) => r.companyEmail === email) || {};
      setRecruiter(loggedRecruiter);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <RecruiterSidebar onLogout={onLogout} />

      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          {/* Dashboard Home: Profile Overview */}
          <Route
            path="/"
            element={
              <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Company Name</label>
                    <input
                      type="text"
                      value={recruiter.companyName || ""}
                      disabled
                      className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Company Email</label>
                    <input
                      type="email"
                      value={recruiter.companyEmail || ""}
                      disabled
                      className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">HR Name</label>
                    <input
                      type="text"
                      value={recruiter.hrName || ""}
                      disabled
                      className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label className="font-semibold">Industry Type</label>
                    <input
                      type="text"
                      value={recruiter.industryType || ""}
                      disabled
                      className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Job Posting</label>
                    <input
                      type="text"
                      value={recruiter.jobPosting || ""}
                      disabled
                      className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Website URL</label>
                    <input
                      type="text"
                      value={recruiter.websiteUrl || ""}
                      disabled
                      className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">HR Photo</label>
                    {recruiter.hrPhoto ? (
                      <img
                        src={recruiter.hrPhoto}
                        alt="HR"
                        className="w-24 h-24 object-cover rounded-full mt-2"
                      />
                    ) : (
                      <p className="text-gray-500 mt-2">No photo uploaded</p>
                    )}
                  </div>
                  <div>
                    <label className="font-semibold">Company Logo</label>
                    {recruiter.companyLogo ? (
                      <img
                        src={recruiter.companyLogo}
                        alt="Company Logo"
                        className="w-24 h-24 object-cover rounded mt-2"
                      />
                    ) : (
                      <p className="text-gray-500 mt-2">No logo uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            }
          />

          {/* Add Job Page */}
          <Route path="add-job" element={<AddJobs />} />

          {/* Profile Edit Page */}
          <Route
            path="profile"
            element={<RecruiterProfileForm profile={recruiter} />}
          />

          {/* Other Pages */}
          <Route
            path="received-applications"
            element={<ReceivedApplications />}
          />
          <Route path="shortlisted-list" element={<ShortlistedList />} />
          <Route path="final-results" element={<FinalResults />} />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
