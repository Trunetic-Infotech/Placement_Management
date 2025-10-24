import React, { useState } from "react";

function ManageJobs() {
  // Sample jobs data
  const [jobs, setJobs] = useState([
    { id: 1, title: "Software Engineer", company: "Infosys", location: "Bangalore", package: "6 LPA" },
    { id: 2, title: "Frontend Developer", company: "TCS", location: "Pune", package: "5 LPA" },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    package: "",
  });

  // Add new job
  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location || !newJob.package) return;
    setJobs([...jobs, { id: Date.now(), ...newJob }]);
    setNewJob({ title: "", company: "", location: "", package: "" });
  };

  // Delete job
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Jobs</h1>

      {/* Add Job Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Package"
            value={newJob.package}
            onChange={(e) => setNewJob({ ...newJob, package: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddJob}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Job List</h2>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Company</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Package</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{job.title}</td>
                <td className="py-2 px-4">{job.company}</td>
                <td className="py-2 px-4">{job.location}</td>
                <td className="py-2 px-4">{job.package}</td>
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
    </div>
  );
}

export default ManageJobs;
