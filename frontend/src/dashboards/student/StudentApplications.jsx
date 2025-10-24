import React, { useState, useEffect } from "react";

function StudentApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApps =
      JSON.parse(localStorage.getItem("studentApplications")) || [];

    // Map recruiter decisions into student view
    const appsWithStatus = storedApps.map((app) => ({
      ...app,
      status: app.decision || app.status || "Under Review", // show recruiter decision if exists
      interviewDate: app.interviewDate || "", // include interview date if assigned
    }));

    setApplications(appsWithStatus);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>

      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-gray-700">
            <thead className="bg-blue-50 border-b text-gray-800">
              <tr>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status / Interview</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3">{app.company}</td>
                  <td className="px-6 py-3">{app.title}</td>
                  <td className="px-6 py-3">{app.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "Forwarded to Recruiter"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Shortlisted"
                          ? "bg-purple-100 text-purple-700"
                          : app.status === "Selected"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Call for Interview"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                      {app.status === "Call for Interview" && app.interviewDate
                        ? ` on ${app.interviewDate}`
                        : ""}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          You haven’t applied to any jobs yet.
        </p>
      )}
    </div>
  );
}

export default StudentApplications;
