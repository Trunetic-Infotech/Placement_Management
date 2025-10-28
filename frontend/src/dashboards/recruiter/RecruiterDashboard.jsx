import React, { useState, useEffect } from "react";

function RecruiterDashboard() {
  const [recruiter, setRecruiter] = useState({
    recruiterId: "",
    companyName: "",
    companyEmail: "",
    password: "",
    companyAddress: "",
    hrName: "",
    hrPhoto: "",
    jobPosting: "",
    companyLogo: "",
    industry: "",
  });

  // 🟢 Load logged recruiter info from localStorage
  useEffect(() => {
    const loggedRecruiter = JSON.parse(localStorage.getItem("loggedRecruiter"));
    if (loggedRecruiter) {
      setRecruiter(loggedRecruiter);
    }
  }, []);

  // 🟢 Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruiter({ ...recruiter, [name]: value });
  };

  // 🟢 Save updates (update both loggedRecruiter and recruiters list)
  const handleUpdate = () => {
    // Update loggedRecruiter data
    localStorage.setItem("loggedRecruiter", JSON.stringify(recruiter));

    // Update the recruiter list seen by admin
    const allRecruiters = JSON.parse(localStorage.getItem("recruiters")) || [];
    const updatedList = allRecruiters.map((r) =>
      r.companyEmail === recruiter.companyEmail ? recruiter : r
    );
    localStorage.setItem("recruiters", JSON.stringify(updatedList));

    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Recruiter Profile</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Recruiter ID</label>
          <input
            type="text"
            name="recruiterId"
            value={recruiter.recruiterId}
            readOnly
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Company Email</label>
          <input
            type="email"
            name="companyEmail"
            value={recruiter.companyEmail}
            readOnly
            className="border p-2 w-full rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={recruiter.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={recruiter.companyName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Company Address</label>
          <input
            type="text"
            name="companyAddress"
            value={recruiter.companyAddress}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">HR Name</label>
          <input
            type="text"
            name="hrName"
            value={recruiter.hrName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">HR Photo URL</label>
          <input
            type="text"
            name="hrPhoto"
            value={recruiter.hrPhoto}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Company Logo URL</label>
          <input
            type="text"
            name="companyLogo"
            value={recruiter.companyLogo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Industry</label>
          <input
            type="text"
            name="industry"
            value={recruiter.industry}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-medium">Job Posting</label>
          <textarea
            name="jobPosting"
            value={recruiter.jobPosting}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows="3"
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>
    </div>
  );
}

export default RecruiterDashboard;
