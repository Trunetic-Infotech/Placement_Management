import React, { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import ManageStudents from "./ManageStudents";
import ManagePlacementOfficer from "./ManagePlacementOfficer";
import ManageJobs from "./ManageJobs";


// Dashboard Home Component - Made responsive
function DashboardHome() {
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

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalJobs = jobs.length;
  const totalPlacements = 5;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">Total Students</h2>
          <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">{totalStudents}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">Total Teachers</h2>
          <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{totalTeachers}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">Total Jobs</h2>
          <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">{totalJobs}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">Total Placements</h2>
          <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2">{totalPlacements}</p>
        </div>
      </div>

      {/* Tables Container */}
      <div className="space-y-6 md:space-y-8">
        {/* Recent Students Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Students</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Name</th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Email</th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Roll No</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{student.name}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{student.email}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{student.rollNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Teachers Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Teachers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Name</th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Email</th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Subject</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{teacher.name}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{teacher.email}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{teacher.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Job Openings Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Job Openings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Company</th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Role</th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Posted On</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{job.company}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{job.role}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{job.postedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar 
        onLogout={onLogout} 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4 sticky top-0 z-40">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="officers" element={<ManagePlacementOfficer />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;