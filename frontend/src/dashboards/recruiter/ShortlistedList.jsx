import React, { useState } from "react";

function ShortlistedList() {
  const [shortlisted] = useState([
    {
      id: 1,
      studentName: "Alice Sharma",
      rollNo: "CS101",
      department: "Computer Science",
      course: "B.Tech",
      cgpa: 8.5,
      skills: "React, Node.js",
      resumeLink: "#",
      interviewDate: "2025-11-05",
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
      interviewDate: "2025-11-07",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shortlisted Candidates 
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-left text-gray-700">
          <thead className="bg-green-50 border-b text-gray-800">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">CGPA</th>
              <th className="px-6 py-3">Skills</th>
              <th className="px-6 py-3">Resume</th>
              <th className="px-6 py-3">Interview Date</th>
            </tr>
          </thead>

          <tbody>
            {shortlisted.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{s.studentName}</td>
                <td className="px-6 py-3">{s.rollNo}</td>
                <td className="px-6 py-3">{s.department}</td>
                <td className="px-6 py-3">{s.course}</td>
                <td className="px-6 py-3">{s.cgpa}</td>
                <td className="px-6 py-3">{s.skills}</td>
                <td className="px-6 py-3 text-center">
                  <a
                    href={s.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-3 text-center">{s.interviewDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShortlistedList;
