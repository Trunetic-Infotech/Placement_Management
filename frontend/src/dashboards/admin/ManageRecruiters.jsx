import React, { useState, useEffect } from "react";

function ManageRecruiters() {
  // Load recruiters from localStorage initially
  const [recruiters, setRecruiters] = useState(() => {
    return JSON.parse(localStorage.getItem("recruiters")) || [];
  });

  const [newRecruiter, setNewRecruiter] = useState({
    
    companyName: "",
    companyEmail: "",
    password: "",
    hrName: "",
    hrPhoto: "",
    jobPosting: "",
    companyLogo: "",
    industryType: "",
    websiteUrl: "",
  });

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewRecruiter({ ...newRecruiter, [field]: imageURL });
    }
  };

  const handleAddRecruiter = () => {
    const requiredFields = [
      
      "companyName",
      "companyEmail",
      "password",
      "hrName",
      "jobPosting",
      "industryType",
      "websiteUrl",
    ];

    for (let field of requiredFields) {
      if (!newRecruiter[field]) {
        alert("Please fill all required fields.");
        return;
      }
    }

    const updated = [...recruiters, { id: Date.now(), ...newRecruiter }];
    setRecruiters(updated);
    localStorage.setItem("recruiters", JSON.stringify(updated));

    setNewRecruiter({
      
      companyName: "",
      companyEmail: "",
      password: "",
      hrName: "",
      hrPhoto: "",
      jobPosting: "",
      companyLogo: "",
      industryType: "",
      websiteUrl: "",
    });

    alert("Recruiter added successfully!");
  };

  const handleDelete = (id) => {
    const updated = recruiters.filter((recruiter) => recruiter.id !== id);
    setRecruiters(updated);
    localStorage.setItem("recruiters", JSON.stringify(updated));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Recruiters
      </h1>

      {/* Add Recruiter Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Recruiter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         

          <input
            type="text"
            placeholder="Company Name"
            value={newRecruiter.companyName}
            onChange={(e) =>
              setNewRecruiter({ ...newRecruiter, companyName: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="email"
            placeholder="Company Email"
            value={newRecruiter.companyEmail}
            onChange={(e) =>
              setNewRecruiter({ ...newRecruiter, companyEmail: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={newRecruiter.password}
            onChange={(e) =>
              setNewRecruiter({ ...newRecruiter, password: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          

          <input
            type="text"
            placeholder="HR Name"
            value={newRecruiter.hrName}
            onChange={(e) =>
              setNewRecruiter({ ...newRecruiter, hrName: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          {/* HR Photo */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">HR Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "hrPhoto")}
              className="border px-4 py-2 rounded-lg w-full"
            />
            {newRecruiter.hrPhoto && (
              <img
                src={newRecruiter.hrPhoto}
                alt="HR"
                className="w-16 h-16 mt-2 rounded-full object-cover"
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Job Posting"
            value={newRecruiter.jobPosting}
            onChange={(e) =>
              setNewRecruiter({ ...newRecruiter, jobPosting: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />

          {/* Company Logo */}
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
            {newRecruiter.companyLogo && (
              <img
                src={newRecruiter.companyLogo}
                alt="Logo"
                className="w-16 h-16 mt-2 object-cover rounded"
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Industry Type"
            value={newRecruiter.industryType}
            onChange={(e) =>
              setNewRecruiter({
                ...newRecruiter,
                industryType: e.target.value,
              })
            }
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="url"
            placeholder="Website URL"
            value={newRecruiter.websiteUrl}
            onChange={(e) =>
              setNewRecruiter({ ...newRecruiter, websiteUrl: e.target.value })
            }
            className="border px-4 py-2 rounded-lg"
          />
        </div>

        <button
          onClick={handleAddRecruiter}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Recruiter
        </button>
      </div>

      {/* Recruiter List Table */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recruiter List</h2>
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
            {recruiters.map((recruiter) => (
              <tr key={recruiter.id} className="border-b hover:bg-gray-50">
                
                <td className="py-2 px-4">{recruiter.companyName}</td>
                <td className="py-2 px-4">{recruiter.hrName}</td>
                <td className="py-2 px-4">{recruiter.jobPosting}</td>
                <td className="py-2 px-4">{recruiter.industryType}</td>
                <td className="py-2 px-4">
                  {recruiter.companyLogo && (
                    <img
                      src={recruiter.companyLogo}
                      alt="Logo"
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(recruiter.id)}
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

export default ManageRecruiters;
