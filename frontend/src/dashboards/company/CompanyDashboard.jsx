import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CompanySidebar from "./CompanySidebar";
import CompanyProfileForm from "./CompanyprofileForm";

function CompanyDashboard({ onLogout, user }) { // receive onLogout from App.js
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const companyProfile = {
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
    stats: {
      jobsPosted: 8,
      studentsApplied: 120,
      studentsShortlisted: 45,
      studentsSelected: 18,
      activeOpenings: 3,
      internshipsOffered: 5,
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CompanySidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout} // <-- use onLogout from App.js
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4 sticky top-0 z-40 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <Routes>
          {/* Dashboard Overview */}
          <Route
            path="/"
            element={
              <div className="max-w-5xl mx-auto p-6 space-y-6">
                {/* Company Profile */}
                <div className="bg-white p-6 rounded-2xl shadow">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <img
                      src={companyProfile.companyLogo}
                      alt="Company Logo"
                      className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {companyProfile.companyName}
                      </h2>
                      <p className="text-gray-500">{companyProfile.industryType}</p>
                      <p className="mt-2 text-gray-500">{companyProfile.status}</p>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <p><strong>Email:</strong> {companyProfile.companyEmail}</p>
                        <p><strong>HR Name:</strong> {companyProfile.hrName}</p>
                        <p><strong>Contact:</strong> {companyProfile.contactNumber}</p>
                        <p><strong>Employees:</strong> {companyProfile.numberOfEmployees}</p>
                        <p><strong>Website:</strong> <a href={companyProfile.websiteUrl} className="text-blue-600 underline">{companyProfile.websiteUrl}</a></p>
                        <p><strong>LinkedIn:</strong> <a href={companyProfile.linkedinUrl} className="text-blue-600 underline">{companyProfile.linkedinUrl}</a></p>
                        <p><strong>Address:</strong> {companyProfile.address}</p>
                        <p><strong>Postal Code:</strong> {companyProfile.postalCode}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About Company</h3>
                    <p className="text-gray-700">{companyProfile.aboutCompany}</p>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(companyProfile.stats).map(([key, value]) => (
                    <div key={key} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                      <h4 className="text-gray-700 font-semibold capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </h4>
                      <p className="text-blue-600 text-3xl font-bold mt-2">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          {/* Profile Editing */}
          <Route
            path="profile"
            element={<CompanyProfileForm companyProfile={companyProfile} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default CompanyDashboard;
