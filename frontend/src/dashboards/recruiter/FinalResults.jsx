import React, { useState } from "react";

function FinalResults() {
  const [results] = useState([
    {
      id: 1,
      studentName: "Alice Sharma",
      rollNo: "CS101",
      department: "Computer Science",
      course: "B.Tech",
      cgpa: 8.5,
      skills: "React, Node.js",
      resumeLink: "#",
      finalStatus: "Selected",
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
      finalStatus: "Rejected",
    },
    {
      id: 3,
      studentName: "Neha Patel",
      rollNo: "EC103",
      department: "Electronics",
      course: "B.Tech",
      cgpa: 8.8,
      skills: "Embedded C, IoT",
      resumeLink: "#",
      finalStatus: "Selected",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Final Results 
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-left text-gray-700">
          <thead className="bg-purple-50 border-b text-gray-800">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">CGPA</th>
              <th className="px-6 py-3">Skills</th>
              <th className="px-6 py-3">Resume</th>
              <th className="px-6 py-3 text-center">Final Status</th>
            </tr>
          </thead>

          <tbody>
            {results.map((s) => (
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
                <td
                  className={`px-6 py-3 text-center font-semibold ${
                    s.finalStatus === "Selected"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {s.finalStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinalResults;
