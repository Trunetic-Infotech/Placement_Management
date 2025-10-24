import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import ManageStudents from "./ManageStudents";
import ManagePlacementOfficer from "./ManagePlacementOfficer";
import ManageJobs from "./ManageJobs";
import Reports from "./reports";

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data
  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", rollNo: "CS101" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", rollNo: "CS102" },
    { id: 3, name: "Alice Lee", email: "alice@example.com", rollNo: "CS103" },
  ];

  const teachers = [
    { id: 1, name: "Mr. A", email: "a@school.com", subject: "Math" },
    { id: 2, name: "Ms. B", email: "b@school.com", subject: "Physics" },
  ];

  const jobs = [
    { id: 1, company: "Infosys", role: "Software Engineer", postedOn: "2025-10-10" },
    { id: 2, company: "TCS", role: "Developer", postedOn: "2025-10-12" },
  ];

  // Summary stats
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalJobs = jobs.length;
  const totalPlacements = 5; // Sample number

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Admin Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalStudents}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Total Teachers</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">{totalTeachers}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
                <p className="text-3xl font-bold text-purple-600 mt-2">{totalJobs}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-lg font-semibold text-gray-700">Total Placements</h2>
                <p className="text-3xl font-bold text-red-600 mt-2">{totalPlacements}</p>
              </div>
            </div>

            {/* Recent Students Table */}
            <div className="bg-white p-6 rounded-2xl shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Recent Students</h2>
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{student.name}</td>
                      <td className="py-2 px-4">{student.email}</td>
                      <td className="py-2 px-4">{student.rollNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Teachers Table */}
            <div className="bg-white p-6 rounded-2xl shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Recent Teachers</h2>
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{teacher.name}</td>
                      <td className="py-2 px-4">{teacher.email}</td>
                      <td className="py-2 px-4">{teacher.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Job Openings Table */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Job Openings</h2>
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Company</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Posted On</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{job.company}</td>
                      <td className="py-2 px-4">{job.role}</td>
                      <td className="py-2 px-4">{job.postedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === "students" && <ManageStudents/>}
        {activeTab === "officers" && <ManagePlacementOfficer/>}
        {activeTab === "jobs" && <ManageJobs/>}
        {activeTab === "reports" && <Reports/>}
      </main>
    </div>
  );
}

export default AdminDashboard;
