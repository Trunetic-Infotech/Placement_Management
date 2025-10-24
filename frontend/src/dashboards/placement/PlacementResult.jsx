import React, { useState } from "react";

function PlacementResults() {
  const [results] = useState([
    {
      id: 1,
      studentName: "Aarav Mehta",
      rollNo: "CS101",
      company: "TechNova",
      jobTitle: "Frontend Developer",
      status: "Selected",
    },
    {
      id: 2,
      studentName: "Priya Sharma",
      rollNo: "CS102",
      company: "InnoSoft",
      jobTitle: "Backend Developer",
      status: "Rejected",
    },
    {
      id: 3,
      studentName: "Rohan Singh",
      rollNo: "CS103",
      company: "DataMind",
      jobTitle: "Data Analyst",
      status: "Pending",
    },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Placement Results
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="p-3 border-b">Student Name</th>
            <th className="p-3 border-b">Roll No</th>
            <th className="p-3 border-b">Company</th>
            <th className="p-3 border-b">Job Title</th>
            <th className="p-3 border-b">Result Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{result.studentName}</td>
              <td className="p-3 border-b">{result.rollNo}</td>
              <td className="p-3 border-b">{result.company}</td>
              <td className="p-3 border-b">{result.jobTitle}</td>
              <td
                className={`p-3 border-b font-medium ${
                  result.status === "Selected"
                    ? "text-green-600"
                    : result.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {result.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacementResults;
