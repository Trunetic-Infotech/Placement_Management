import React, { useEffect, useState } from "react";

function JobsListed() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    // Get all jobs from localStorage (Recruiter uploads)
    const storedJobs = JSON.parse(localStorage.getItem("recruiterJobs")) || [];
    setJobs(storedJobs);
  }, []);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Jobs Listed by Recruiters
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs have been posted yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Job ID</th>
                  <th className="px-4 py-2 border text-left">Job Title</th>
                  <th className="px-4 py-2 border text-left">Recruiter</th>
                  <th className="px-4 py-2 border text-left">Company</th>
                  <th className="px-4 py-2 border text-left">Industry</th>
                  <th className="px-4 py-2 border text-left">Posted Date</th>
                  <th className="px-4 py-2 border text-left">Applications</th>
                  <th className="px-4 py-2 border text-left">Selected</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{job.jobId || `#${index + 1}`}</td>
                    <td className="px-4 py-2 border">{job.title}</td>
                    <td className="px-4 py-2 border">{job.recruiterName}</td>
                    <td className="px-4 py-2 border">{job.companyName}</td>
                    <td className="px-4 py-2 border">{job.industryType || "—"}</td>
                    <td className="px-4 py-2 border">{job.postedDate || "—"}</td>
                    <td className="px-4 py-2 border text-center">{job.totalApplications || 0}</td>
                    <td className="px-4 py-2 border text-center">{job.selectedCount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default JobsListed;
