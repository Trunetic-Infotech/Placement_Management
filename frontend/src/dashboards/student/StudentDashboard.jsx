import React, { useState, useEffect } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentProfileForm from "./StudentProfileForm";
import JobOpenings from "./JobOpenings";
import StudentApplications from "./StudentApplications";
import PlacementResults from "./PlacementResults";

function StudentDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeStudentTab") || "dashboard";
  });

  const [studentProfile, setStudentProfile] = useState(null);

  // ✅ Save tab selection persistently
  useEffect(() => {
    localStorage.setItem("activeStudentTab", activeTab);
  }, [activeTab]);

  // ✅ Load student profile when dashboard opens
  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");
    if (savedProfile) {
      setStudentProfile(JSON.parse(savedProfile));
    }
  }, []);

  // ✅ Keep profile updated if user edits it in another tab
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedProfile = localStorage.getItem("studentProfile");
      if (updatedProfile) {
        setStudentProfile(JSON.parse(updatedProfile));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ If user refreshes, ensure login stays consistent
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser && loggedUser.role === "student") {
      localStorage.setItem("loggedStudent", JSON.stringify(loggedUser));
    }
  }, []);

  // Sample demo stats (optional placeholders)
  const sampleApplications = [
    {
      id: 1,
      company: "TechNova",
      title: "Frontend Developer",
      appliedOn: "2025-10-12",
      status: "Shortlisted",
    },
    {
      id: 2,
      company: "InnoSoft",
      title: "Backend Developer",
      appliedOn: "2025-10-10",
      status: "Pending",
    },
  ];

  const sampleResults = [
    {
      id: 1,
      company: "TechNova",
      title: "Frontend Developer",
      package: "6 LPA",
      status: "Offer Received",
      date: "2025-10-15",
    },
  ];

  const appliedJobsCount = sampleApplications.length;
  const interviewsScheduled = 2;
  const offersReceived = sampleResults.filter((r) =>
    r.status.toLowerCase().includes("offer")
  ).length;
  const pendingResultsCount = sampleApplications.filter(
    (a) => a.status.toLowerCase() === "pending"
  ).length;

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 p-8">
        {/* ================= Dashboard Overview ================= */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Dashboard Overview
            </h1>

            {studentProfile ? (
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl shadow-md p-8 max-w-3xl mb-10 transition-transform transform hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full text-blue-600 text-2xl font-bold uppercase shadow-inner">
                    {studentProfile.name ? studentProfile.name[0] : "A"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                      {studentProfile.name || "No Name"}
                    </h2>
                    <p className="text-gray-500">{studentProfile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-medium">
                      {studentProfile.rollNo || "N/A"}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">
                      {studentProfile.department || "N/A"}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">
                      {studentProfile.course || "N/A"}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">CGPA</p>
                    <p className="font-medium text-blue-600">
                      {studentProfile.cgpa || "N/A"}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 sm:col-span-2">
                    <p className="text-sm text-gray-500">Skills</p>
                    <p className="font-medium">
                      {studentProfile.skills || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10 bg-white rounded-xl shadow-sm py-6">
                No profile found. Please fill your profile in the{" "}
                <span className="font-semibold text-blue-600">“My Profile”</span>{" "}
                section.
              </p>
            )}

            {/* ===== Quick Stats ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-gray-500 text-sm uppercase font-semibold">
                  Applied Jobs
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {appliedJobsCount}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-gray-500 text-sm uppercase font-semibold">
                  Interviews Scheduled
                </h3>
                <p className="text-3xl font-bold text-orange-500 mt-2">
                  {interviewsScheduled}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-gray-500 text-sm uppercase font-semibold">
                  Offers Received
                </h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {offersReceived}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-gray-500 text-sm uppercase font-semibold">
                  Pending Results
                </h3>
                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  {pendingResultsCount}
                </p>
              </div>
            </div>

            {/* ===== Recent Job Applications ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Recent Job Applications
                </h2>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                      <th className="p-3 border-b">Company</th>
                      <th className="p-3 border-b">Job Title</th>
                      <th className="p-3 border-b">Applied On</th>
                      <th className="p-3 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{app.company}</td>
                        <td className="p-3 border-b">{app.title}</td>
                        <td className="p-3 border-b">
                          {formatDate(app.appliedOn)}
                        </td>
                        <td
                          className={`p-3 border-b font-medium ${
                            app.status.toLowerCase() === "shortlisted"
                              ? "text-green-600"
                              : app.status.toLowerCase() === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {app.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ===== Recent Results ===== */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Recent Placement Results
                </h2>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                      <th className="p-3 border-b">Company</th>
                      <th className="p-3 border-b">Job Title</th>
                      <th className="p-3 border-b">Package</th>
                      <th className="p-3 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleResults.map((res) => (
                      <tr key={res.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{res.company}</td>
                        <td className="p-3 border-b">{res.title}</td>
                        <td className="p-3 border-b">{res.package}</td>
                        <td
                          className={`p-3 border-b font-medium ${
                            res.status.toLowerCase().includes("offer")
                              ? "text-green-600"
                              : res.status.toLowerCase().includes("not")
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {res.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => setActiveTab("results")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View All Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= Other Tabs ================= */}
        {activeTab === "profile" && <StudentProfileForm />}
        {activeTab === "jobs" && <JobOpenings />}
        {activeTab === "applications" && <StudentApplications />}
        {activeTab === "results" && <PlacementResults />}
      </main>
    </div>
  );
}

export default StudentDashboard;
