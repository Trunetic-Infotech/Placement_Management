import React, { useState } from "react";

function ReceivedApplications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: "Alice Sharma",
      rollNo: "CS101",
      department: "Computer Science",
      course: "B.Tech",
      cgpa: 8.5,
      skills: "React, Node.js",
      resumeLink: "#",
      decision: "Under Review",
      interviewDate: "",
    },
    {
      id: 2,
      studentName: "Rahul Singh",
      rollNo: "IT102",
      department: "Information Technology",
      course: "B.Tech",
      cgpa: 9.0,
      skills: "Python, SQL",
      resumeLink: "#",
      decision: "Call for Interview",
      interviewDate: "2025-11-05",
    },
  ]);

  const handleDecisionChange = (id, newDecision) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, decision: newDecision } : app
      )
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Received Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-gray-700">
          <thead className="bg-blue-50 border-b text-gray-800">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">CGPA</th>
              <th className="px-6 py-3">Skills</th>
              <th className="px-6 py-3">Resume</th>
              <th className="px-6 py-3">Interview Date</th>
              <th className="px-6 py-3 text-center">Decision</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-3 font-medium">{app.studentName}</td>
                <td className="px-6 py-3">{app.rollNo}</td>
                <td className="px-6 py-3">{app.department}</td>
                <td className="px-6 py-3">{app.course}</td>
                <td className="px-6 py-3">{app.cgpa}</td>
                <td className="px-6 py-3">{app.skills}</td>
                <td className="px-6 py-3">
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-3">
                  {app.interviewDate ? app.interviewDate : "—"}
                </td>
                <td className="px-6 py-3 text-center">
                  <select
                    value={app.decision}
                    onChange={(e) =>
                      handleDecisionChange(app.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option>Under Review</option>
                    <option>Call for Interview</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceivedApplications;
