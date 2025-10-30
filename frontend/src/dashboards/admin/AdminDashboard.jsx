import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import ManageStudents from "./ManageStudents";
import ManagePlacementOfficer from "./ManageRecruiters";
import ManageJobs from "./JobsListed";
import axios from "axios";

// Dashboard Home Component - Made responsive
function DashboardHome() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRecruiters: 0,
    totalJobs: 0,
  });

  const [recentStudents, setRecentStudents] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [latestJobs, setLatestJobs] = useState([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/dashboard/stats`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  const fetchRecentStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/latestStudents`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setRecentStudents(res.data.data);
      }
    } catch (error) {
      console.log("Error fetching latest students:", error);
    }
  };

  const fetchLatestRecruiters = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/recruiter/getLatestRecruiter/home`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setRecruiters(res.data.data);
      }
    } catch (error) {
      console.log("Error fetching latest recruiters:", error);
    }
  };

  const fetchLatestJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobPost/latest-jobs`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setLatestJobs(res.data.data);
      }
    } catch (error) {
      console.log("Error fetching latest recruiters:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentStudents();
    fetchLatestRecruiters();
    fetchLatestJobs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">
            Total Students
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">
            {stats.totalStudents}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">
            Total Recruiters
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">
            {stats.totalRecruiters}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow text-center">
          <h2 className="text-sm md:text-lg font-semibold text-gray-700">
            Total Jobs
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">
            {stats.totalJobs}
          </p>
        </div>
      </div>

      {/* Tables Container */}
      <div className="space-y-6 md:space-y-8">
        {/* Recent Students Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Recent Students
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Name
                  </th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Email
                  </th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Roll No
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {student.email}
                    </td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {student.roll_no}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Recruiters Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Recent Recruiters
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Name
                  </th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Email
                  </th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Company
                  </th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((recruiter) => (
                  <tr key={recruiter.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {recruiter.hr_name}
                    </td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {recruiter.company_email}
                    </td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {recruiter.company_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Job Openings Table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Recent Job Openings
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Company
                  </th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Role
                  </th>
                  <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                    Posted On
                  </th>
                </tr>
              </thead>
              <tbody>
                {latestJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {job.company_id}
                    </td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {job.job_title}
                    </td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                      {job.posted_date}
                    </td>
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
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
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
