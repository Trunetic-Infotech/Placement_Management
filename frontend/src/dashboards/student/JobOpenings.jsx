import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Briefcase,
  MapPin,
  Calendar,
  User,
  Building2,
  X,
} from "lucide-react";

function JobOpenings() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    cover_letter: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
  });

  // ✅ Fetch all jobs
  const fetchJobs = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobPost/jobs/all/students?page=${pageNumber}&limit=6`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.data.success) {
        setJobs(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(response.data.message || "Failed to load jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Error fetching jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  // ✅ Open apply modal
  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // ✅ Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setFormData({
      cover_letter: "",
      linkedin_url: "",
      github_url: "",
      portfolio_url: "",
    });
  };

  // ✅ Apply for job (send data to backend)
  const handleSubmitApplication = async () => {
    try {
      const token = localStorage.getItem("token");
      // const studentId = localStorage.getItem("student_id");

      if (!token ) {
        toast.error("⚠️ Please log in to apply for jobs.");
        return;
      }

      if (!formData.cover_letter) {
        toast.error("Please write a cover letter before applying.");
        return;
      }

      const payload = {
        job_id: selectedJob.job_id,
        ...formData,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jobApply/jobApply`,
        payload,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.data.success) {
        setAppliedJobs((prev) => [...prev, selectedJob.job_id]);
        toast.success("✅ Application submitted successfully!");
        handleCloseModal();
      } else {
        toast.error(response.data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(
        error.response?.data?.message ||
          "❌ Error submitting application. Please try again."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🚀 Available Job Openings
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const alreadyApplied = appliedJobs.includes(job.job_id);

            return (
              <div
                key={job.job_id}
                className="border rounded-2xl p-5 shadow-md hover:shadow-xl transition bg-gradient-to-b from-blue-50 to-white"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {job.job_title}
                </h3>

                <p className="text-gray-700 mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <strong>{job.company_name}</strong>
                </p>

                <div className="text-gray-600 text-sm mt-2 space-y-1">
                  <p>
                    <strong>Type:</strong> {job.job_type} ({job.work_mode})
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {job.job_location}
                  </p>
                  <p>
                    <strong>Experience:</strong> {job.experience_required}
                  </p>
                  <p>
                    <strong>Qualification:</strong> {job.qualification_required}
                  </p>
                  <p>
                    <strong>Skills:</strong> {job.skills_required}
                  </p>
                  <p>
                    <strong>Openings:</strong> {job.openings}
                  </p>
                  <p>
                    <strong>Salary:</strong> {job.salary_range}
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    HR: {job.hr_name}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Apply Before:{" "}
                    {new Date(job.application_deadline).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>
                </div>

                <p className="mt-3 text-gray-700 text-sm italic">
                  “{job.job_description}”
                </p>

                <button
                  onClick={() => handleOpenModal(job)}
                  disabled={alreadyApplied || job.status === "Closed"}
                  className={`mt-4 w-full py-2 rounded-lg transition font-medium ${
                    job.status === "Closed"
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : alreadyApplied
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {job.status === "Closed"
                    ? "Closed"
                    : alreadyApplied
                    ? "Applied"
                    : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Apply for {selectedJob?.job_title}
            </h3>

            <textarea
              className="w-full border rounded-lg p-3 mb-3"
              rows="4"
              placeholder="Write your cover letter..."
              value={formData.cover_letter}
              onChange={(e) =>
                setFormData({ ...formData, cover_letter: e.target.value })
              }
            ></textarea>

            <input
              type="url"
              placeholder="LinkedIn URL"
              value={formData.linkedin_url}
              onChange={(e) =>
                setFormData({ ...formData, linkedin_url: e.target.value })
              }
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={formData.github_url}
              onChange={(e) =>
                setFormData({ ...formData, github_url: e.target.value })
              }
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              type="url"
              placeholder="Portfolio URL"
              value={formData.portfolio_url}
              onChange={(e) =>
                setFormData({ ...formData, portfolio_url: e.target.value })
              }
              className="w-full border rounded-lg p-2 mb-3"
            />

            <button
              onClick={handleSubmitApplication}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobOpenings;
