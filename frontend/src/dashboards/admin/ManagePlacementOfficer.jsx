import React, { useState } from "react";

function ManagePlacementOfficer() {
  const [officers, setOfficers] = useState([]);

  const [newOfficer, setNewOfficer] = useState({
    recruiterId: "",
    companyName: "",
    companyEmail: "",
    password: "",
    companyAddress: "",
    hrName: "",
    hrPhoto: "",
    jobPosting: "",
    companyLogo: "",
    industryType: "",
    websiteUrl: "",
  });

  // Handle image upload for HR photo and company logo
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewOfficer({ ...newOfficer, [field]: imageURL });
    }
  };

  // Add new officer
  const handleAddOfficer = () => {
    const requiredFields = [
      "recruiterId",
      "companyName",
      "companyEmail",
      "password",
      "companyAddress",
      "hrName",
      "jobPosting",
      "industryType",
      "websiteUrl",
    ];
    for (let field of requiredFields) {
      if (!newOfficer[field]) {
        alert("Please fill all required fields.");
        return;
      }
    }

    setOfficers([...officers, { id: Date.now(), ...newOfficer }]);
    setNewOfficer({
      recruiterId: "",
      companyName: "",
      companyEmail: "",
      password: "",
      companyAddress: "",
      hrName: "",
      hrPhoto: "",
      jobPosting: "",
      companyLogo: "",
      industryType: "",
      websiteUrl: "",
    });
  };

  // Delete officer
  const handleDelete = (id) => {
    setOfficers(officers.filter((officer) => officer.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Placement Officers
      </h1>

      {/* Add Officer Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Placement Officer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Recruiter ID"
            value={newOfficer.recruiterId}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, recruiterId: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Company Name"
            value={newOfficer.companyName}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, companyName: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="email"
            placeholder="Company Email"
            value={newOfficer.companyEmail}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, companyEmail: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={newOfficer.password}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, password: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Company Address"
            value={newOfficer.companyAddress}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, companyAddress: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="HR Name"
            value={newOfficer.hrName}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, hrName: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          {/* HR Photo Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              HR Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "hrPhoto")}
              className="border px-4 py-2 rounded-lg w-full"
            />
            {newOfficer.hrPhoto && (
              <img
                src={newOfficer.hrPhoto}
                alt="HR"
                className="w-16 h-16 mt-2 rounded-full object-cover"
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Job Posting"
            value={newOfficer.jobPosting}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, jobPosting: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          {/* Company Logo Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "companyLogo")}
              className="border px-4 py-2 rounded-lg w-full"
            />
            {newOfficer.companyLogo && (
              <img
                src={newOfficer.companyLogo}
                alt="Logo"
                className="w-16 h-16 mt-2 object-cover rounded"
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Industry Type"
            value={newOfficer.industryType}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, industryType: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="url"
            placeholder="Website URL"
            value={newOfficer.websiteUrl}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, websiteUrl: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />
        </div>

        <button
          onClick={handleAddOfficer}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Officer
        </button>
      </div>

      {/* Officers Table */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Placement Officer List</h2>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Recruiter ID</th>
              <th className="py-2 px-4 text-left">Company</th>
              <th className="py-2 px-4 text-left">HR Name</th>
              <th className="py-2 px-4 text-left">Job Posting</th>
              <th className="py-2 px-4 text-left">Industry</th>
              <th className="py-2 px-4 text-left">Logo</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{officer.recruiterId}</td>
                <td className="py-2 px-4">{officer.companyName}</td>
                <td className="py-2 px-4">{officer.hrName}</td>
                <td className="py-2 px-4">{officer.jobPosting}</td>
                <td className="py-2 px-4">{officer.industryType}</td>
                <td className="py-2 px-4">
                  {officer.companyLogo && (
                    <img
                      src={officer.companyLogo}
                      alt="Logo"
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(officer.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePlacementOfficer;
