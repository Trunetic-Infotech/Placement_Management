import React, { useState } from "react";

function RecruiterProfileForm() {
  // Dummy recruiter profile data
  const [formData, setFormData] = useState({
    companyName: "TechNova Solutions",
    companyEmail: "hr@technova.com",
    companyAddress: "Bangalore, India",
    hrName: "Rahul Sharma",
    hrPhoto: "",
    companyLogo: "",
    jobPosting: "Frontend Developer",
    websiteUrl: "https://technova.com",
    contactNumber: "+91 9876543210",
    industryType: "IT Services",
  });

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
    alert("Profile updated successfully! (dummy only)");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Recruiter Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Company Name (readonly) */}
        <div>
          <label className="block font-semibold mb-1">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            readOnly
            className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Company Email (readonly) */}
        <div>
          <label className="block font-semibold mb-1">Company Email</label>
          <input
            type="text"
            value={formData.companyEmail}
            readOnly
            className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* HR Name (readonly) */}
        <div>
          <label className="block font-semibold mb-1">HR Name</label>
          <input
            type="text"
            value={formData.hrName}
            readOnly
            className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Contact Number (readonly) */}
        <div>
          <label className="block font-semibold mb-1">Contact Number</label>
          <input
            type="text"
            value={formData.contactNumber}
            readOnly
            className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Industry Type (readonly) */}
        <div>
          <label className="block font-semibold mb-1">Industry Type</label>
          <input
            type="text"
            value={formData.industryType}
            readOnly
            className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Company Address (readonly) */}
        <div>
          <label className="block font-semibold mb-1">Company Address</label>
          <input
            type="text"
            value={formData.companyAddress}
            readOnly
            className="border px-4 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Job Posting (editable) */}
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

        {/* Website URL (editable) */}
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
