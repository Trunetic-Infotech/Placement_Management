import React, { useState, useEffect } from "react";

function JobsListed() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleDelete = (id) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Manage All Posted Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Company</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Salary</th>
                <th className="py-2 px-4 text-left">Skills</th>
                <th className="py-2 px-4 text-left">HR</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Eligibility</th>
                <th className="py-2 px-4 text-left">Last Date</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{job.title}</td>
                  <td className="py-2 px-4">{job.companyName}</td>
                  <td className="py-2 px-4">{job.description}</td>
                  <td className="py-2 px-4">{job.salary}</td>
                  <td className="py-2 px-4">{job.skillsRequired}</td>
                  <td className="py-2 px-4">{job.recruiterName}</td>
                  <td className="py-2 px-4">{job.recruiterEmail}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td className="py-2 px-4">{job.eligibility}</td>
                  <td className="py-2 px-4">
                    {new Date(job.lastDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
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

export default JobsListed;
