import React, { useEffect, useState } from "react";

function JobOpenings() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load jobs from localStorage
  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    setJobs(allJobs);

    // Get already applied jobs by this student
    const loggedStudent =
      JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const allApplications =
      JSON.parse(localStorage.getItem("studentApplications")) || [];

    const applied = allApplications
      .filter((app) => app.student?.email === loggedStudent.email)
      .map((app) => app.jobId);

    setAppliedJobs(applied);
  }, []);

  // ✅ Handle job application
  const handleApply = (job) => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser || loggedUser.role?.toLowerCase() !== "student") {
      alert("Please log in as a student to apply.");
      return;
    }

    // 🧠 Get student profile
    const studentProfile =
      JSON.parse(localStorage.getItem("studentProfile")) || null;

    if (!studentProfile) {
      alert("Please complete your student profile before applying.");
      return;
    }

    // 🧠 Get previous applications
    const allApplications =
      JSON.parse(localStorage.getItem("studentApplications")) || [];

    // 🧠 Prevent duplicate applications
    const alreadyApplied = allApplications.some(
      (app) => app.jobId === job.id && app.student?.email === loggedUser.email
    );
    if (alreadyApplied) {
      alert("You already applied for this job!");
      return;
    }

    // 🧩 Create new application with student details
    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      company: job.company,
      title: job.title,
      date: new Date().toLocaleDateString(),
      status: "Forwarded to Recruiter",
      student: {
        name: studentProfile.name || "N/A",
        rollNo: studentProfile.rollNo || "N/A",
        department: studentProfile.department || "N/A",
        course: studentProfile.course || "N/A",
        cgpa: studentProfile.cgpa || "N/A",
        skills: studentProfile.skills || "N/A",
        resumeLink: studentProfile.resumeLink || "",
        email: studentProfile.email || loggedUser.email,
        phone: studentProfile.phone || "N/A",
        image: studentProfile.image || "",
      },
    };

    allApplications.push(newApplication);
    localStorage.setItem(
      "studentApplications",
      JSON.stringify(allApplications)
    );

    // ✅ Save applied job ID
    const updatedAppliedJobs = [...appliedJobs, job.id];
    setAppliedJobs(updatedAppliedJobs);

    alert(`Application submitted for ${job.title} at ${job.company}`);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Available Job Openings
      </h2>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600">
                <strong>Eligibility:</strong> {job.eligibility}
              </p>
              <p className="text-gray-600">
                <strong>Salary:</strong> {job.salary}
              </p>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                Posted on: {job.date}
              </p>

              <button
                onClick={() => handleApply(job)}
                disabled={appliedJobs.includes(job.id)}
                className={`mt-4 px-4 py-2 rounded ${
                  appliedJobs.includes(job.id)
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No job openings available right now.
        </p>
      )}
    </div>
  );
}

export default JobOpenings;
