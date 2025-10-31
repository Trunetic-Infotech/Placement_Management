import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function JobsListed() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobpost/jobs/all`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ DELETE function
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = axios.delete(
        `${import.meta.env.VITE_API_URL}/jobPost/delete/jobPost/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Job deleted successfully!");
        // alert("Job deleted successfully!");

        setJobs(jobs.filter((job) => job.job_id !== id));
        fetchJobs();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage All Posted Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.job_id}
              className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {job.job_title}
              </h3>

              <p className="text-sm text-gray-600 mb-1">
                📍 <strong>Location:</strong> {job.job_location}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                💰 <strong>Salary:</strong> {job.salary_range}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                🎯 <strong>Skills:</strong> {job.skills_required}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                🎓 <strong>Qualification:</strong> {job.qualification_required}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                🏢 <strong>Job Type:</strong> {job.job_type}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                💼 <strong>Work Mode:</strong> {job.work_mode}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                👥 <strong>Openings:</strong> {job.openings}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                📅 <strong>Deadline:</strong>{" "}
                {new Date(job.application_deadline).toLocaleDateString("en-IN")}
              </p>

              <p className="text-sm text-gray-600 mb-3">
                ✅ <strong>Status:</strong> {job.status}
              </p>

              <button
                onClick={() => handleDelete(job.job_id)}
                className="w-full bg-red-100 text-red-600 hover:bg-red-200 transition font-semibold py-2 rounded-md">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsListed;
