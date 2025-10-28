import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentProfileForm from "./StudentProfileForm";
import JobOpenings from "./JobOpenings";
import StudentApplications from "./StudentApplications";
import PlacementResults from "./PlacementResults";

function StudentDashboard({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeStudentTab") || "dashboard"
  );
  const [studentProfile, setStudentProfile] = useState(null);

  // Protect route and load profile
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.role !== "student") {
      navigate("/login");
      return;
    }

    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const profile = allStudents.find((s) => s.email === loggedInUser.email);
    setStudentProfile(profile || null);
  }, [navigate]);

  // Save tab selection
  useEffect(() => {
    localStorage.setItem("activeStudentTab", activeTab);
  }, [activeTab]);

  // Keep profile updated if edited elsewhere
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser || loggedInUser.role !== "student") return;

      const allStudents = JSON.parse(localStorage.getItem("students")) || [];
      const profile = allStudents.find((s) => s.email === loggedInUser.email);
      setStudentProfile(profile || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Dashboard Overview
            </h1>

            {studentProfile ? (
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl shadow-md p-8 max-w-5xl mb-10 transition-transform transform hover:scale-[1.01] hover:shadow-lg">
                {/* Name & Email */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full text-blue-600 text-2xl font-bold uppercase shadow-inner">
                    {studentProfile.firstName
                      ? studentProfile.firstName[0]
                      : "A"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                      {studentProfile.firstName} {studentProfile.lastName}
                    </h2>
                    <p className="text-gray-500">{studentProfile.email}</p>
                  </div>
                </div>

                {/* All Profile Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  {[
                    { label: "Roll No", value: studentProfile.rollNo },
                    {
                      label: "Full Name",
                      value: `${studentProfile.firstName} ${studentProfile.lastName}`,
                    },
                    { label: "Email", value: studentProfile.email },
                    { label: "Phone Number", value: studentProfile.phone },
                    { label: "Department", value: studentProfile.department },
                    { label: "Course", value: studentProfile.course },
                    { label: "CGPA", value: studentProfile.cgpa },
                    { label: "Skills", value: studentProfile.skills },
                  ].map((field, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <p className="text-sm text-gray-500">{field.label}</p>
                      <p className="font-medium">{field.value || "N/A"}</p>
                    </div>
                  ))}

                  {/* Profile Image */}
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Profile Image</p>
                    {studentProfile.profileImage ? (
                      <img
                        src={studentProfile.profileImage}
                        alt="Profile"
                        className="mt-2 w-20 h-20 object-cover rounded-full"
                      />
                    ) : (
                      <p className="text-gray-400">N/A</p>
                    )}
                  </div>

                  {/* Resume */}
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Resume</p>
                    {studentProfile.resume ? (
                      <a
                        href={studentProfile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-400">N/A</p>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Certificate</p>
                    {studentProfile.certificate ? (
                      <a
                        href={studentProfile.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Certificate
                      </a>
                    ) : (
                      <p className="text-gray-400">N/A</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10 bg-white rounded-xl shadow-sm py-6">
                No profile found. Please contact admin or fill your profile in{" "}
                <span className="font-semibold text-blue-600">
                  “My Profile”
                </span>{" "}
                section.
              </p>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <StudentProfileForm studentProfile={studentProfile} />
        )}
        {activeTab === "jobs" && <JobOpenings />}
        {activeTab === "applications" && <StudentApplications />}
        {activeTab === "results" && <PlacementResults />}
      </main>
    </div>
  );
}

export default StudentDashboard;
