import React, { useState, useEffect } from "react";
import PlacementOfficerSidebar from "./PlacementOfficerSidebar";
import AddJobForm from "./AddJobForm";
import JobManagement from "./JobManagement";
import StudentApplicationList from "./StudentApplicationList";
import PlacementResults from "./PlacementResult";

function PlacementOfficerDashboard({ onLogout }) {
  // ✅ Load from localStorage on mount, or fallback to 'dashboard'
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activePlacementTab") || "dashboard";
  });

  // ✅ Store in localStorage whenever tab changes
  useEffect(() => {
    localStorage.setItem("activePlacementTab", activeTab);
  }, [activeTab]);

  // Sample Data
  const studentApplications = [
    { id: 1, name: "John Doe", rollNo: "CS101", company: "Infosys", role: "Software Engineer", status: "Applied" },
    { id: 2, name: "Jane Smith", rollNo: "CS102", company: "TCS", role: "Developer", status: "Shortlisted" },
    { id: 3, name: "Alice Lee", rollNo: "CS103", company: "Wipro", role: "Analyst", status: "Under Review" },
  ];

  const placementResults = [
    { id: 1, name: "John Doe", rollNo: "CS101", company: "Infosys", role: "Software Engineer", package: "6 LPA", status: "Placed" },
    { id: 2, name: "Alice Lee", rollNo: "CS103", company: "Wipro", role: "Analyst", package: "5 LPA", status: "Placed" },
    { id: 3, name: "Bob Brown", rollNo: "CS104", company: "-", role: "-", package: "-", status: "Not Placed" },
  ];

  // Summary stats
  const totalJobs = 12;
  const totalApplications = studentApplications.length;
  const totalPlaced = placementResults.filter((r) => r.status === "Placed").length;
  const totalNotPlaced = placementResults.filter((r) => r.status === "Not Placed").length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <PlacementOfficerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 p-8">
        {/* Dashboard Home */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Placement Officer Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalJobs}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Total Applications</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">{totalApplications}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Placed Students</h2>
                <p className="text-3xl font-bold text-purple-600 mt-2">{totalPlaced}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Not Placed</h2>
                <p className="text-3xl font-bold text-red-600 mt-2">{totalNotPlaced}</p>
              </div>
            </div>

            {/* Recent Student Applications */}
            <div className="bg-white p-6 rounded-2xl shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Recent Student Applications</h2>
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Roll No</th>
                    <th className="py-2 px-4 text-left">Company</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentApplications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{app.name}</td>
                      <td className="py-2 px-4">{app.rollNo}</td>
                      <td className="py-2 px-4">{app.company}</td>
                      <td className="py-2 px-4">{app.role}</td>
                      <td className="py-2 px-4">{app.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Placement Results */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Placement Results</h2>
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Roll No</th>
                    <th className="py-2 px-4 text-left">Company</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Package</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {placementResults.map((res) => (
                    <tr key={res.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{res.name}</td>
                      <td className="py-2 px-4">{res.rollNo}</td>
                      <td className="py-2 px-4">{res.company}</td>
                      <td className="py-2 px-4">{res.role}</td>
                      <td className="py-2 px-4">{res.package}</td>
                      <td className="py-2 px-4">{res.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === "addJob" && <AddJobForm />}
        {activeTab === "manageJobs" && <JobManagement />}
        {activeTab === "applications" && <StudentApplicationList />}
        {activeTab === "results" && <PlacementResults />}
      </main>
    </div>
  );
}

export default PlacementOfficerDashboard;
