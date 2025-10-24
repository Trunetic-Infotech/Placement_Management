import React, { useEffect, useState } from "react";

function JobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    setJobs(savedJobs);
  }, []);

  const handleDelete = (id) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
    localStorage.setItem("allJobs", JSON.stringify(updated));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Job Openings</h2>

      {jobs.length > 0 ? (
        <table className="min-w-full border text-left text-gray-700">
          <thead className="bg-blue-50 border-b text-gray-800">
            <tr>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Eligibility</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3">{job.company}</td>
                <td className="px-6 py-3">{job.title}</td>
                <td className="px-6 py-3">{job.location}</td>
                <td className="px-6 py-3">{job.eligibility}</td>
                <td className="px-6 py-3">{job.salary}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No job openings available.</p>
      )}
    </div>
  );
}

export default JobManagement;
