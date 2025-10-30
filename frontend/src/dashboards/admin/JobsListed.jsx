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
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete job");
    }
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
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Salary</th>
                <th className="py-2 px-4 text-left">Skills Required</th>
                <th className="py-2 px-4 text-left">Qualified required</th>
                <th className="py-2 px-4 text-left">Job Type</th>
                <th className="py-2 px-4 text-left">Work Mode</th>
                <th className="py-2 px-4 text-left">Openings</th>
                <th className="py-2 px-4 text-left">Last Date</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{job.job_title}</td>
                  <td className="py-2 px-4">{job.job_location}</td>
                  <td className="py-2 px-4">{job.salary_range}</td>
                  <td className="py-2 px-4">{job.skills_required}</td>
                  <td className="py-2 px-4">{job.qualification_required}</td>
                  <td className="py-2 px-4">{job.job_type}</td>
                  <td className="py-2 px-4">{job.work_mode}</td>
                  <td className="py-2 px-4">{job.openings}</td>
                  <td className="py-2 px-4">
                    {new Date(job.application_deadline).toLocaleDateString(
                      "en-IN"
                    )}
                  </td>
                  <td className="py-2 px-4">{job.status}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(job.job_id)}
                      className="text-red-600 hover:text-red-700 font-semibold">
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
