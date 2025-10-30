import React, { useState } from "react";

function JobOpenings() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      companyName: "TechNova Pvt. Ltd.",
      location: "Mumbai",
      eligibility: "B.Tech / B.E. in Computer Science",
      skillsRequired: "React, JavaScript, Tailwind CSS",
      salary: "₹6 LPA",
      recruiterName: "Riya Sharma (HR)",
      lastDate: "2025-11-10",
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      companyName: "DataVision Analytics",
      location: "Pune",
      eligibility: "Any Graduate",
      skillsRequired: "Excel, SQL, Python",
      salary: "₹20,000 / month",
      recruiterName: "Amit Kumar (HR)",
      lastDate: "2025-11-15",
    },
  ]);

  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert("✅ Application submitted successfully!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => {
            const alreadyApplied = appliedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                className="border rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Company:</strong> {job.companyName}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Eligibility:</strong> {job.eligibility}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Skills:</strong> {job.skillsRequired}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Salary:</strong> {job.salary}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>HR Contact:</strong> {job.recruiterName}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  <strong>Apply Before:</strong>{" "}
                  {new Date(job.lastDate).toLocaleDateString("en-IN")}
                </p>

                <button
                  onClick={() => handleApply(job.id)}
                  disabled={alreadyApplied}
                  className={`px-4 py-2 rounded-lg transition ${
                    alreadyApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {alreadyApplied ? "Applied" : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobOpenings;
