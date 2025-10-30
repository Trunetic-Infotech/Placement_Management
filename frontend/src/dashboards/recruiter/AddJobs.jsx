import React, { useState } from "react";

function AddJobs() {
  // Dummy recruiter info
  const recruiter = {
    hrName: "Rahul Sharma",
    companyName: "TechNova Solutions",
  };

  // Job form data
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    salary: "",
    location: "",
    eligibility: "",
    lastDate: "",
  });

  // Dummy jobs list
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      description: "Develop and maintain UI components using React.js.",
      skillsRequired: "React, Tailwind, JavaScript",
      salary: "₹6 LPA",
      location: "Bangalore",
      eligibility: "B.Tech / MCA",
      lastDate: "2025-11-30",
      recruiterName: recruiter.hrName,
      companyName: recruiter.companyName,
    },
  ]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  // Dummy add handler
  const handleAddJob = (e) => {
    e.preventDefault();

    if (
      !jobData.title ||
      !jobData.description ||
      !jobData.skillsRequired ||
      !jobData.location ||
      !jobData.eligibility ||
      !jobData.lastDate
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const newJob = {
      id: Date.now(),
      ...jobData,
      recruiterName: recruiter.hrName,
      companyName: recruiter.companyName,
    };

    setJobs([...jobs, newJob]);
    setJobData({
      title: "",
      description: "",
      skillsRequired: "",
      salary: "",
      location: "",
      eligibility: "",
      lastDate: "",
    });

    alert("✅ Job added successfully! (dummy)");
  };

  // Dummy delete
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Job</h2>

      <p className="mb-4 text-gray-600">
        <strong>Logged in as:</strong> {recruiter.hrName} ({recruiter.companyName})
      </p>

      {/* Job Form */}
      <form
        onSubmit={handleAddJob}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <label className="font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="font-medium">Skills Required</label>
          <input
            type="text"
            name="skillsRequired"
            value={jobData.skillsRequired}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Salary</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="font-medium">Job Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Eligibility</label>
          <input
            type="text"
            name="eligibility"
            value={jobData.eligibility}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Last Date to Apply</label>
          <input
            type="date"
            name="lastDate"
            value={jobData.lastDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Job
          </button>
        </div>
      </form>

      {/* Job List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">My Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Job Title</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Skills</th>
                  <th className="py-2 px-4 text-left">Location</th>
                  <th className="py-2 px-4 text-left">Salary</th>
                  <th className="py-2 px-4 text-left">Eligibility</th>
                  <th className="py-2 px-4 text-left">Last Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{job.title}</td>
                    <td className="py-2 px-4">{job.description}</td>
                    <td className="py-2 px-4">{job.skillsRequired}</td>
                    <td className="py-2 px-4">{job.location}</td>
                    <td className="py-2 px-4">{job.salary || "N/A"}</td>
                    <td className="py-2 px-4">{job.eligibility}</td>
                    <td className="py-2 px-4">{job.lastDate}</td>
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
    </div>
  );
}

export default AddJobs;
