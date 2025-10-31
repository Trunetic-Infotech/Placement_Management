import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

function AddJobs() {
  const [jobData, setJobData] = useState({
    recruiter_id: "",
    company_id: "",
    job_title: "",
    job_type: "",
    work_mode: "",
    job_location: "",
    salary_range: "",
    experience_required: "",
    skills_required: "",
    qualification_required: "",
    job_description: "",
    openings: "",
    application_deadline: "",
    status: "Active",
  });

  const [jobTemplate, setJobTemplate] = useState(null);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getAllJobs`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setJobData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleFileChange = (e) => {
    setJobTemplate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(jobData).forEach((key) => {
      formData.append(key, jobData[key]);
    });

    if (jobTemplate) {
      formData.append("job_template_photo", jobTemplate);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/jobPost/jobPost`,
        formData
      );

      if (res.data.success) {
        toast.success("✅ Job added successfully!");
        setJobData({
          recruiter_id: "",
          company_id: "",
          job_title: "",
          job_type: "",
          work_mode: "",
          job_location: "",
          salary_range: "",
          experience_required: "",
          skills_required: "",
          qualification_required: "",
          job_description: "",
          openings: "",
          application_deadline: "",
          status: "",
        });
        setJobTemplate(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Post New Job</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            name="recruiter_id"
            placeholder="Recruiter ID"
            value={jobData.recruiter_id}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="company_id"
            placeholder="Company ID"
            value={jobData.company_id}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="job_title"
            placeholder="Job Title"
            value={jobData.job_title}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="job_type"
            placeholder="Job Type (FullTime, PartTime...)"
            value={jobData.job_type}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="work_mode"
            placeholder="Work Mode (OnSite, Remote...)"
            value={jobData.work_mode}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="job_location"
            placeholder="Job Location"
            value={jobData.job_location}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="salary_range"
            placeholder="Salary Range"
            value={jobData.salary_range}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="experience_required"
            placeholder="Experience Required"
            value={jobData.experience_required}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="skills_required"
            placeholder="Skills Required"
            value={jobData.skills_required}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="qualification_required"
            placeholder="Qualification Required"
            value={jobData.qualification_required}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 rounded"
            name="openings"
            placeholder="Openings"
            value={jobData.openings}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            className="border p-2 rounded"
            name="application_deadline"
            value={jobData.application_deadline}
            onChange={handleChange}
            required
          />

          <textarea
            className="border p-2 rounded md:col-span-2"
            name="job_description"
            placeholder="Job Description"
            rows={4}
            value={jobData.job_description}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            className="border p-2 rounded"
            value={jobData.status}
            onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="md:col-span-2">
            <label className="font-medium">Job Template Photo</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Add Job
            </button>
          </div>
        </form>
      </div>

      {/* Job List
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">My Posted Jobs</h2>

  {jobData.length === 0 ? (
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
            <th className="py-2 px-4 text-left">Qualification</th>
            <th className="py-2 px-4 text-left">Deadline</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobData.map((job) => (
            <tr key={job.job_id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{job.job_title}</td>
              <td className="py-2 px-4 truncate max-w-60">
                {job.job_description}
              </td>
              <td className="py-2 px-4">{job.skills_required}</td>
              <td className="py-2 px-4">{job.job_location}</td>
              <td className="py-2 px-4">{job.salary_range || "N/A"}</td>
              <td className="py-2 px-4">{job.qualification_required}</td>
              <td className="py-2 px-4">
                {new Date(job.application_deadline).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    job.status === "Open" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {job.status}
                </span>
              </td>

              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(job.job_id)}
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
</div> */}
    </div>
  );
}

export default AddJobs;
