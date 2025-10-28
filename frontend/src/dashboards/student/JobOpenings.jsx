import React, { useState, useEffect } from "react";

function JobOpenings() {
  const [jobs, setJobs] = useState([]);
  const [student, setStudent] = useState(null);

 useEffect(() => {
  const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  setJobs(storedJobs);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser || loggedInUser.role !== "student") {
    alert("Student not logged in");
    return;
  }

  // ✅ Set student state from loggedInUser directly
  setStudent(loggedInUser);
}, []);



  const handleApply = (job) => {
    if (!student) {
      alert("Please log in as a student to apply!");
      return;
    }

    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    // Prevent duplicate applications
    const alreadyApplied = applications.some(
      (a) => a.jobId === job.id && a.studentEmail === student.email
    );
    if (alreadyApplied) {
      alert("You’ve already applied for this job!");
      return;
    }

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      recruiterEmail: job.recruiterEmail,
      studentName: student.name,
      studentEmail: student.email,
      studentCourse: student.course,
      appliedOn: new Date().toLocaleDateString("en-IN"),
    };

    const updatedApplications = [...applications, newApplication];
    localStorage.setItem("applications", JSON.stringify(updatedApplications));

    alert("✅ Application submitted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Available Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
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
                <strong>Salary:</strong> {job.salary || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>HR Contact:</strong> {job.recruiterName}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                <strong>Apply Before:</strong>{" "}
                {new Date(job.lastDate).toLocaleDateString("en-IN")}
              </p>

              <button
                onClick={() => handleApply(job)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobOpenings;
