import React, { useState, useEffect } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentProfileForm from "./StudentProfileForm";
import JobOpenings from "./JobOpenings";
import StudentApplications from "./StudentApplications";
import PlacementResults from "./PlacementResults";

function StudentDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeStudentTab") || "dashboard"
  );
  const [studentProfile, setStudentProfile] = useState(null);

  // Save tab selection
  useEffect(() => {
    localStorage.setItem("activeStudentTab", activeTab);
  }, [activeTab]);

  // Load student profile
  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");
    if (savedProfile) setStudentProfile(JSON.parse(savedProfile));
  }, []);

  // Keep profile updated if edited elsewhere
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedProfile = localStorage.getItem("studentProfile");
      if (updatedProfile) setStudentProfile(JSON.parse(updatedProfile));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const sampleApplications = [
    { id: 1, company: "TechNova", title: "Frontend Developer", appliedOn: "2025-10-12", status: "Shortlisted" },
    { id: 2, company: "InnoSoft", title: "Backend Developer", appliedOn: "2025-10-10", status: "Pending" },
  ];

  const sampleResults = [
    { id: 1, company: "TechNova", title: "Frontend Developer", package: "6 LPA", status: "Offer Received", date: "2025-10-15" },
  ];

  const formatDate = (iso) => {
    try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="flex-1 p-8">
        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>

            {studentProfile ? (
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl shadow-md p-8 max-w-4xl mb-10 transition-transform transform hover:scale-[1.01] hover:shadow-lg">

                {/* Name & Email */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full text-blue-600 text-2xl font-bold uppercase shadow-inner">
                    {studentProfile.name ? studentProfile.name[0] : "A"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">{studentProfile.name || "No Name"}</h2>
                    <p className="text-gray-500">{studentProfile.email}</p>
                  </div>
                </div>

                {/* All 12 Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{studentProfile.studentId || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Roll No</p>
                    <p className="font-medium">{studentProfile.rollNo || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{studentProfile.name || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{studentProfile.email || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{studentProfile.phone || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{studentProfile.dob || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{studentProfile.department || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">{studentProfile.course || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">CGPA</p>
                    <p className="font-medium text-blue-600">{studentProfile.cgpa || "N/A"}</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Skills</p>
                    <p className="font-medium">{studentProfile.skills || "N/A"}</p>
                  </div>

                  {/* Profile Image */}
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Profile Image</p>
                    {studentProfile.image ? (
                      <img src={studentProfile.image} alt="Profile" className="mt-2 w-20 h-20 object-cover rounded-full" />
                    ) : (
                      <p className="text-gray-400">N/A</p>
                    )}
                  </div>

                  {/* Resume */}
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Resume</p>
                    {studentProfile.resumeLink ? (
                      <a href={studentProfile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-400">N/A</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10 bg-white rounded-xl shadow-sm py-6">
                No profile found. Please fill your profile in <span className="font-semibold text-blue-600">“My Profile”</span> section.
              </p>
            )}

            {/* Your existing Quick Stats and Recent Job Applications / Results remain unchanged */}
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === "profile" && <StudentProfileForm />}
        {activeTab === "jobs" && <JobOpenings />}
        {activeTab === "applications" && <StudentApplications />}
        {activeTab === "results" && <PlacementResults />}
      </main>
    </div>
  );
}

export default StudentDashboard;
