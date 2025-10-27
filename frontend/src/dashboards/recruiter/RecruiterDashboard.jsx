import React, { useState, useEffect } from "react";
import RecruiterSidebar from "./RecruiterSidebar";
import ReceivedApplications from "./ReceivedApplications";
import ShortlistedList from "./ShortlistedList";
import FinalResults from "./FinalResults";

function RecruiterDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("recruiterActiveTab");
    return saved && saved !== "undefined" && saved !== "null"
      ? saved
      : "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("recruiterActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(
      "loggedRecruiter",
      JSON.stringify({
        name: "John Smith",
        company: "qwwd",
      })
    );
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("loggedRecruiter");
    localStorage.removeItem("recruiterActiveTab");
    if (onLogout) onLogout(); // redirect to login if parent handles it
    else window.location.href = "/"; // fallback redirect
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Pass the logout handler here */}
      <RecruiterSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome back, <span className="font-semibold">John Smith</span>!
              Here’s an overview of your hiring activities and progress.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-blue-600">42</h2>
                <p className="text-gray-600 mt-1">Total Applications</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-yellow-600">10</h2>
                <p className="text-gray-600 mt-1">Shortlisted Candidates</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-green-600">4</h2>
                <p className="text-gray-600 mt-1">Final Offers Sent</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-red-600">3</h2>
                <p className="text-gray-600 mt-1">Positions Open</p>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 shadow rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Applications
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-gray-100 text-gray-700">
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Position</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">Ananya Patel</td>
                    <td className="p-3">Frontend Developer</td>
                    <td className="p-3 text-yellow-600 font-medium">
                      Shortlisted
                    </td>
                    <td className="p-3">Oct 20, 2025</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Rahul Mehta</td>
                    <td className="p-3">Backend Engineer</td>
                    <td className="p-3 text-blue-600 font-medium">
                      Under Review
                    </td>
                    <td className="p-3">Oct 18, 2025</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Sana Khan</td>
                    <td className="p-3">UI/UX Designer</td>
                    <td className="p-3 text-green-600 font-medium">Selected</td>
                    <td className="p-3">Oct 17, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "received" && <ReceivedApplications />}
        {activeTab === "shortlisted" && <ShortlistedList />}
        {activeTab === "results" && <FinalResults />}
      </main>
    </div>
  );
}

export default RecruiterDashboard;
