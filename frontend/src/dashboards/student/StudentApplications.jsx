import React, { useState } from "react";

function StudentApplications() {
  const [applications] = useState([
    {
      id: 1,
      jobTitle: "Frontend Developer",
      companyName: "Demo Company",
      appliedOn: "2025-10-25",
      status: "Under Review",
      interviewDate: "",
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      companyName: "Demo Company",
      appliedOn: "2025-10-26",
      status: "Call for Interview",
      interviewDate: "2025-11-05",
    },
    {
      id: 3,
      jobTitle: "Data Analyst",
      companyName: "Demo Analytics",
      appliedOn: "2025-10-28",
      status: "Selected",
      interviewDate: "2025-11-10",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-blue-50 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">Job Title</th>
                <th className="px-6 py-3 font-semibold">Company</th>
                <th className="px-6 py-3 font-semibold">Applied On</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Interview Date</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{app.jobTitle}</td>
                  <td className="px-6 py-3">{app.companyName}</td>
                  <td className="px-6 py-3">{app.appliedOn}</td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      app.status === "Selected"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : app.status === "Under Review"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="px-6 py-3">
                    {app.interviewDate || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentApplications;
