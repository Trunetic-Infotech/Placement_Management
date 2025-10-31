// StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";

import StudentSidebar from "./StudentSidebar";
import StudentProfileForm from "./StudentProfileForm";
import JobOpenings from "./JobOpenings";
import StudentApplications from "./StudentApplications";
import PlacementResults from "./PlacementResults";
import axios from "axios";
import toast from "react-hot-toast";

function StudentDashboard({ onLogout, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [studentProfile, setStudent] = useState([]);
  const [jobCounts, setJobCounts] = useState([]);

  const fetchStudentsData = async()=>{
    try {
      const token = localStorage.getItem("token");
      
      console.log(`${import.meta.env.VITE_URL}/student/get/student/profile`);
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/student/get/student/profile`,{
        headers: {
          Authorization: `${token}`
        }
      })

      

      if(response.data.success){
        setStudent(response.data.data)
      }else{
        
         toast.error(response.data?.message || "User Not Found!", {
          style: {
            border: "1px solid #DC2626", // red-600
            background: "#FEF2F2", // red-50
            color: "#7F1D1D", // red-900
            padding: "12px 16px",
            borderRadius: "10px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
          },
        });
      }
    } catch (error) {
       console.error(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
        {
          style: {
            border: "1px solid #DC2626", // red-600
            background: "#FEF2F2", // red-50
            color: "#7F1D1D", // red-900
            padding: "12px 16px",
            borderRadius: "10px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
          },
        }
      );
    }
  }

  const fetchStudentsJobCounts = async()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/student/get-job-counts`,{
        headers: {
          Authorization: `${token}`,
        }
      })

      if(response.data.success){
        setJobCounts(response.data.data)
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error while fetching job count data");
    }
  }

  useEffect(()=>{
    fetchStudentsData();
    fetchStudentsJobCounts();
  },[])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);



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
                      src={studentProfile.photo_url}
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
                      { label: "Roll No", value: studentProfile.roll_no },
                      { label: "Phone", value: studentProfile.phoneNumber },
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
                        href={studentProfile.resume_url}
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
                        href={studentProfile.certificate_url}
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
                    <p className="text-3xl font-bold text-blue-600 mt-2">{jobCounts.totalApplications}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Jobs Applied
                    </h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">{jobCounts.totalJobsApplied}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Jobs Shortlisted
                    </h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{jobCounts.totalJobsShortlisted}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Placed
                    </h2>
                    <p className="text-3xl font-bold text-green-800 mt-2">{jobCounts.totalJobsPlaced}</p>
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
