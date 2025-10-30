import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

  const fetchRecruiters = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/recruiter/allRecruiter`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data) {
        setRecruiters(response.data);
      } else {
        toast.error("Failed to fetch students");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch recruiters");
    }
  };
  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setNewRecruiter({
        ...newRecruiter,
        [field]: file,
        [`${field}Preview`]: URL.createObjectURL(file), // for preview
      });
    }
  };

  const handleAddRecruiter = async () => {
    try {
      const required = [
        "companyName",
        "companyEmail",
        "password",
        "hrName",
        "jobPosting",
        "industryType",
        "websiteUrl",
      ];

      for (let f of required) {
        if (!newRecruiter[f]) {
          toast.error("Please fill all required fields.");
          return;
        }
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("company_name", newRecruiter.companyName);
      formData.append("company_email", newRecruiter.companyEmail);
      formData.append("password", newRecruiter.password);
      formData.append("hr_name", newRecruiter.hrName);
      formData.append("job_posting", newRecruiter.jobPosting);
      formData.append("industry_type", newRecruiter.industryType);
      formData.append("website_url", newRecruiter.websiteUrl);

      if (newRecruiter.companyLogo) {
        formData.append("company_logo", newRecruiter.companyLogo);
      }
      if (newRecruiter.hrPhoto) {
        formData.append("hr_photo", newRecruiter.hrPhoto);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/recruiter/register/recruiter`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.recruiter_id) {
        toast.success("Recruiter Account created!", {
          style: {
            border: "1px solid #4F46E5",
            padding: "10px",
            color: "#333",
          },
          iconTheme: {
            primary: "#4F46E5",
            secondary: "#fff",
          },
        });

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
        fetchRecruiters();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register recruiter");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this recruiter?"))
        return;

      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/recruiter/deleteRecruiter/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Recruiter deleted!");

      // ✅ Remove from UI
      const updated = recruiters.filter((r) => r.recruiter_id !== id);
      setRecruiters(updated);

      await fetchRecruiters();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete recruiter");
    }
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
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
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
              <th className="py-2 px-4 text-left">Company Name</th>
              <th className="py-2 px-4 text-left">Company Email</th>
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
                <td className="py-2 px-4">{recruiter.recruiter_id}</td>
                <td className="py-2 px-4">{recruiter.company_name}</td>
                <td className="py-2 px-4">{recruiter.company_email}</td>
                <td className="py-2 px-4">{recruiter.hr_name}</td>
                <td className="py-2 px-4">{recruiter.job_posting}</td>
                <td className="py-2 px-4">{recruiter.industry_type}</td>
                <td className="py-2 px-4">
                  {recruiter.company_logo && (
                    <img
                      src={recruiter.company_logo}
                      alt="Logo"
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  {recruiter.hrPhoto && (
                    <img
                      src={recruiter.hrPhoto}
                      alt="Photo"
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(recruiter.recruiter_id)}
                    className="text-red-600 hover:text-red-700 font-semibold">
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
