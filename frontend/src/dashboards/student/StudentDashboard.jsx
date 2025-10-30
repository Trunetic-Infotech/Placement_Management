// StudentDashboard.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";

import StudentSidebar from "./StudentSidebar";
import StudentProfileForm from "./StudentProfileForm";
import JobOpenings from "./JobOpenings";
import StudentApplications from "./StudentApplications";
import PlacementResults from "./PlacementResults";

function StudentDashboard({ onLogout, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Dummy student data
  const studentProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    rollNo: "CS101",
    phone: "9876543210",
    department: "Computer Science",
    course: "B.Tech",
    cgpa: "9.2",
    skills: "React, Node.js",
    profileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    resume:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    certificate:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout} // Pass the prop
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

        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-4xl mx-auto p-4 space-y-6">
                {/* Profile Section */}
                <div className="bg-white p-6 rounded-2xl shadow">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Dashboard Overview
                  </h1>
                  <div className="flex items-center gap-6 mb-6">
                    <img
                      src={studentProfile.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border shadow-sm object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {studentProfile.firstName} {studentProfile.lastName}
                      </h2>
                      <p className="text-gray-500">{studentProfile.course}</p>
                      <p className="text-gray-500">
                        {studentProfile.department}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Email", value: studentProfile.email },
                      { label: "Roll No", value: studentProfile.rollNo },
                      { label: "Phone", value: studentProfile.phone },
                      { label: "CGPA", value: studentProfile.cgpa },
                      { label: "Skills", value: studentProfile.skills },
                    ].map((field, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                      >
                        <p className="text-sm text-gray-500">{field.label}</p>
                        <p className="font-medium text-gray-800">
                          {field.value || "N/A"}
                        </p>
                      </div>
                    ))}

                    {/* Resume */}
                    <div className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Resume</p>
                        <p className="font-medium text-gray-800">Available</p>
                      </div>
                      <a
                        href={studentProfile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </div>

                    {/* Certificate */}
                    <div className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Certificate</p>
                        <p className="font-medium text-gray-800">Available</p>
                      </div>
                      <a
                        href={studentProfile.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:underline"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>

                {/* Summary/Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Total Applications
                    </h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Jobs Applied
                    </h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">8</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Jobs Shortlisted
                    </h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">3</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Placed
                    </h2>
                    <p className="text-3xl font-bold text-green-800 mt-2">1</p>
                  </div>
                </div>
              </div>
            }
          />

          <Route
            path="profile"
            element={<StudentProfileForm studentProfile={studentProfile} />}
          />
          <Route path="jobs" element={<JobOpenings />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="results" element={<PlacementResults />} />
        </Routes>
      </main>
    </div>
  );
}

export default StudentDashboard;
