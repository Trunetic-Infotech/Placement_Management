import React, { useEffect, useState } from "react";

function ReceivedApplications() {
  const [applications, setApplications] = useState([]);

  // 🟢 Get logged recruiter info
  const recruiter = JSON.parse(localStorage.getItem("loggedRecruiter")) || {};

  // 🟢 Load applications and merge recruiter decisions
  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("studentApplications")) || [];

    // Filter applications for this recruiter's company and status
    const forwarded = savedApplications.filter(
      (app) =>
        (app.status === "Forwarded to Recruiter" ||
          app.status === "Reviewed by Recruiter") &&
        app.company === recruiter.company
    );

    // Merge recruiter decisions (company-specific)
    const savedDecisions =
      JSON.parse(
        localStorage.getItem(`recruiterDecisions_${recruiter.company}`)
      ) || [];

    const merged = forwarded.map((app) => {
      const existing = savedDecisions.find((a) => a.id === app.id);
      return existing
        ? {
            ...app,
            decision: existing.decision,
            interviewDate: existing.interviewDate,
          }
        : { ...app, decision: "Under Review", interviewDate: "" };
    });

    setApplications(merged);
  }, [recruiter.company]);

  // Handle recruiter decision
  const handleDecision = (id, decision) => {
  const updated = applications.map((app) =>
    app.id === id ? { ...app, decision, status: "Reviewed by Recruiter" } : app
  );
  setApplications(updated);

  // Update global studentApplications for student view
  const allApps = JSON.parse(localStorage.getItem("studentApplications")) || [];
  const newAllApps = allApps.map((app) =>
    app.id === id ? { ...app, decision, status: "Reviewed by Recruiter" } : app
  );
  localStorage.setItem("studentApplications", JSON.stringify(newAllApps));

  // ✅ Save in recruiterDecisions_{company} for persistence
  localStorage.setItem(
    `recruiterDecisions_${recruiter.company}`,
    JSON.stringify(updated)
  );
};


  // Handle interview date
  const handleInterviewDate = (id, date) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, interviewDate: date } : app
    );
    setApplications(updated);

    // Update global studentApplications
    const allApps =
      JSON.parse(localStorage.getItem("studentApplications")) || [];
    const newAllApps = allApps.map((app) =>
      app.id === id ? { ...app, interviewDate: date } : app
    );
    localStorage.setItem("studentApplications", JSON.stringify(newAllApps));

    // ✅ Save in recruiterDecisions_{company} for persistence
    localStorage.setItem(
      `recruiterDecisions_${recruiter.company}`,
      JSON.stringify(updated)
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Received Applications ({recruiter.company || "Unknown Company"})
      </h2>

      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-gray-700">
            <thead className="bg-blue-50 border-b text-gray-800">
              <tr>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Roll No</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">CGPA</th>
                <th className="px-6 py-3">Skills</th>
                <th className="px-6 py-3">Resume</th>
                <th className="px-6 py-3 text-center">Decision</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{app.student?.name || "N/A"}</td>
                  <td className="px-6 py-3">{app.student?.rollNo || "N/A"}</td>
                  <td className="px-6 py-3">
                    {app.student?.department || "N/A"}
                  </td>
                  <td className="px-6 py-3">{app.student?.course || "N/A"}</td>
                  <td className="px-6 py-3">{app.student?.cgpa || "N/A"}</td>
                  <td className="px-6 py-3">{app.student?.skills || "N/A"}</td>
                  <td className="px-6 py-3 text-center">
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
                      <span className="text-gray-500">No Resume</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center flex flex-col items-center gap-2">
                    {/* Decision dropdown */}
                    <select
                      onChange={(e) => handleDecision(app.id, e.target.value)}
                      value={app.decision || "Under Review"}
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Call for Interview">
                        Call for Interview
                      </option>
                    </select>

                    {app.decision === "Call for Interview" && (
                      <input
                        type="date"
                        value={app.interviewDate || ""}
                        onChange={(e) =>
                          handleInterviewDate(app.id, e.target.value)
                        }
                        className="ml-2 border rounded px-2 py-1"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No applications for {recruiter.company || "this company"} yet.
        </p>
      )}
    </div>
  );
}

export default ReceivedApplications;
