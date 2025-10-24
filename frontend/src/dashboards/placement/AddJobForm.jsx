import React, { useState } from "react";

function AddJobForm() {
  const [jobData, setJobData] = useState({
    company: "",
    title: "",
    location: "",
    eligibility: "",
    salary: "",
    description: "",
    date: new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing jobs or empty array
    const existingJobs = JSON.parse(localStorage.getItem("allJobs")) || [];

    // Create new job entry
    const newJob = {
      id: Date.now(),
      ...jobData,
    };

    // Save updated list
    localStorage.setItem("allJobs", JSON.stringify([...existingJobs, newJob]));

    alert("Job added successfully!");
    setJobData({
      company: "",
      title: "",
      location: "",
      eligibility: "",
      salary: "",
      description: "",
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={jobData.company}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobData.location}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="eligibility"
          placeholder="Eligibility"
          value={jobData.eligibility}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}

export default AddJobForm;
