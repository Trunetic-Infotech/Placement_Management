import React, { useState } from "react";

function CompanyProfileForm() {
  const [company, setCompany] = useState({
    companyName: "Trunetic Infotech",
    companyEmail: "info@trunetic.com",
    hrName: "Priya Sharma",
    companyLogo: "https://via.placeholder.com/100",
    industryType: "Information Technology",
    websiteUrl: "https://www.trunetic.com",
    address: "Bandra West, Mumbai, Maharashtra",
    postalCode: "400050",
    contactNumber: "+91 9876543210",
    aboutCompany:
      "Trunetic Infotech is a leading tech company specializing in web and mobile app development, digital transformation, and innovative software solutions.",
    numberOfEmployees: "150+",
    linkedinUrl: "https://www.linkedin.com/company/trunetic",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompany({
        ...company,
        companyLogo: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log("Updated Company Info:", company);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Edit Company Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ===== Company Logo Upload ===== */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={company.companyLogo}
            alt="Company Logo"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
          />
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Change Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block text-gray-600"
            />
          </div>
        </div>

        {/* ===== Company Info Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={company.companyName}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Company Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Company Email
            </label>
            <input
              type="email"
              name="companyEmail"
              value={company.companyEmail}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* HR Name (Editable) */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              HR Name
            </label>
            <input
              type="text"
              name="hrName"
              value={company.hrName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Industry Type */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Industry Type
            </label>
            <input
              type="text"
              name="industryType"
              value={company.industryType}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Website URL
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={company.websiteUrl}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={company.contactNumber}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        {/* ===== About Company (Read Only) ===== */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            About Company
          </label>
          <textarea
            name="aboutCompany"
            value={company.aboutCompany}
            disabled
            rows={4}
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 resize-none"
          />
        </div>

        {/* ===== Submit Button ===== */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyProfileForm;
