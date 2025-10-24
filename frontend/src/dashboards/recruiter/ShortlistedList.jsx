import React, { useEffect, useState } from "react";

function ShortlistedList() {
  const [shortlisted, setShortlisted] = useState([]);

  // 🟢 Get logged recruiter info
  const recruiter = JSON.parse(localStorage.getItem("loggedRecruiter")) || {};

  useEffect(() => {
    // Load recruiter decisions
    const allDecisions = JSON.parse(localStorage.getItem("recruiterDecisions")) || [];

    // 🟢 Filter only shortlisted applications for this recruiter’s company
    const filtered = allDecisions.filter(
  (app) =>
    app.decision === "Shortlisted" &&
    app.company?.toLowerCase() === recruiter.company?.toLowerCase() &&
    app.student
);


    setShortlisted(filtered);
  }, [recruiter.company]);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shortlisted Candidates ({recruiter.company || "Unknown Company"})
      </h2>

      {shortlisted.length > 0 ? (
        <table className="min-w-full border border-gray-200 text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Roll No</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Course</th>
              <th className="py-2 px-4 border">CGPA</th>
              <th className="py-2 px-4 border">Skills</th>
              <th className="py-2 px-4 border">Job Title</th>
              <th className="py-2 px-4 border">Resume</th>
            </tr>
          </thead>
          <tbody>
            {shortlisted.map((app, index) => (
              <tr key={index} className="text-center hover:bg-gray-50 transition">
                <td className="py-2 px-4 border">{app.student?.name || "N/A"}</td>
                <td className="py-2 px-4 border">{app.student?.rollNo || "N/A"}</td>
                <td className="py-2 px-4 border">{app.student?.department || "N/A"}</td>
                <td className="py-2 px-4 border">{app.student?.course || "N/A"}</td>
                <td className="py-2 px-4 border">{app.student?.cgpa || "N/A"}</td>
                <td className="py-2 px-4 border">{app.student?.skills || "N/A"}</td>
                <td className="py-2 px-4 border">{app.title}</td>
                <td className="py-2 px-4 border">
                  {app.student?.resumeLink ? (
                    <a
                      href={app.student.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">
          No shortlisted candidates for {recruiter.company || "this company"}.
        </p>
      )}
    </div>
  );
}

export default ShortlistedList;
