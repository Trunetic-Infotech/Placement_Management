import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

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

  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!newJob.title.trim()) newErrors.title = "Job title is required";
    if (!newJob.company.trim()) newErrors.company = "Company name is required";
    if (!newJob.location.trim()) newErrors.location = "Location is required";
    if (!newJob.package.trim()) newErrors.package = "Package is required";
    return newErrors;
  };

  // Add new job
  const handleAddJob = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setJobs([...jobs, { id: Date.now(), ...newJob }]);
    setNewJob({ title: "", company: "", location: "", package: "" });
    setErrors({});
  };

  // Delete job
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Manage Jobs</h1>

      {/* Add Job Form */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} />
          Add New Job
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleInputChange}
              className={`border px-3 md:px-4 py-2 md:py-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={newJob.company}
              onChange={handleInputChange}
              className={`border px-3 md:px-4 py-2 md:py-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                errors.company ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>
          
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleInputChange}
              className={`border px-3 md:px-4 py-2 md:py-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          
          <div>
            <input
              type="text"
              name="package"
              placeholder="Package (e.g., 6 LPA)"
              value={newJob.package}
              onChange={handleInputChange}
              className={`border px-3 md:px-4 py-2 md:py-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                errors.package ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.package && <p className="text-red-500 text-xs mt-1">{errors.package}</p>}
          </div>
        </div>
        <button
          onClick={handleAddJob}
          className="mt-4 bg-blue-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-blue-700 transition text-sm md:text-base font-medium flex items-center gap-2"
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Job List ({jobs.length})
        </h2>
        
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No jobs added yet. Add your first job above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Title</th>
                  <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Company</th>
                  <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm hidden sm:table-cell">Location</th>
                  <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Package</th>
                  <th className="py-2 px-2 md:px-4 text-left text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-medium">{job.title}</td>
                    <td className="py-2 px-2 md:px-4 text-xs md:text-sm">{job.company}</td>
                    <td className="py-2 px-2 md:px-4 text-xs md:text-sm hidden sm:table-cell">{job.location}</td>
                    <td className="py-2 px-2 md:px-4 text-xs md:text-sm font-semibold text-green-600">{job.package}</td>
                    <td className="py-2 px-2 md:px-4 text-xs md:text-sm">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-800 p-1 md:p-2 rounded hover:bg-red-50 transition flex items-center gap-1"
                        title="Delete job"
                      >
                        <Trash2 size={16} className="md:size-18" />
                        <span className="hidden sm:inline">Delete</span>
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

export default ManageJobs;