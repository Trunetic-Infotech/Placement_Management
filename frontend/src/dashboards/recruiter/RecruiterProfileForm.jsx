import React, { useState, useEffect } from "react";

function RecruiterProfileForm({ profile }) {
  const [formData, setFormData] = useState({
    hrPhoto: "",
    companyLogo: "",
    jobPosting: "",
    websiteUrl: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        hrPhoto: profile.hrPhoto || "",
        companyLogo: profile.companyLogo || "",
        jobPosting: profile.jobPosting || "",
        websiteUrl: profile.websiteUrl || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if ((name === "hrPhoto" || name === "companyLogo") && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, [name]: ev.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update recruiter in localStorage
    const recruiters = JSON.parse(localStorage.getItem("recruiters")) || [];
    const index = recruiters.findIndex(r => r.companyEmail === profile.companyEmail);
    if (index !== -1) {
      recruiters[index] = { ...recruiters[index], ...formData };
      localStorage.setItem("recruiters", JSON.stringify(recruiters));
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* HR Photo */}
        <div>
          <label className="block font-semibold mb-1">HR Photo</label>
          <input
            type="file"
            name="hrPhoto"
            accept="image/*"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
          />
          {formData.hrPhoto && (
            <img
              src={formData.hrPhoto}
              alt="HR"
              className="w-24 h-24 object-cover rounded-full mt-2"
            />
          )}
        </div>

        {/* Company Logo */}
        <div>
          <label className="block font-semibold mb-1">Company Logo</label>
          <input
            type="file"
            name="companyLogo"
            accept="image/*"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
          />
          {formData.companyLogo && (
            <img
              src={formData.companyLogo}
              alt="Company Logo"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}
        </div>

        {/* Job Posting */}
        <div>
          <label className="block font-semibold mb-1">Job Posting</label>
          <input
            type="text"
            name="jobPosting"
            value={formData.jobPosting}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Website URL */}
        <div>
          <label className="block font-semibold mb-1">Website URL</label>
          <input
            type="text"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecruiterProfileForm;
