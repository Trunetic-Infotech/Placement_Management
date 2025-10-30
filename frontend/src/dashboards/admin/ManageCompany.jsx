import React, { useState } from "react";
import { Trash2 } from "lucide-react";

function ManageCompany() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    hrName: "",
    companyLogo: "",
    industryType: "",
    websiteUrl: "",
    address: "",
    postalCode: "",
    contactNumber: "",
    aboutCompany: "",
    numberOfEmployees: "",
    linkedinUrl: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    setCompanies([...companies, { ...newCompany, id: Date.now() }]);
    setNewCompany({
      companyName: "",
      companyEmail: "",
      password: "",
      hrName: "",
      companyLogo: "",
      industryType: "",
      websiteUrl: "",
      address: "",
      postalCode: "",
      contactNumber: "",
      aboutCompany: "",
      numberOfEmployees: "",
      linkedinUrl: "",
      status: "Active",
    });
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Manage Companies
      </h1>

      {/* Add Company Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Add New Company</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddCompany}>
          {[
            { label: "Company Name", name: "companyName" },
            { label: "Company Email", name: "companyEmail" },
            { label: "Password", name: "password", type: "password" },
            { label: "HR Name", name: "hrName" },
            { label: "Company Logo URL", name: "companyLogo" },
            { label: "Industry Type", name: "industryType" },
            { label: "Website URL", name: "websiteUrl" },
            { label: "Address", name: "address" },
            { label: "Postal Code", name: "postalCode" },
            { label: "Contact Number", name: "contactNumber" },
            { label: "About Company", name: "aboutCompany" },
            { label: "No of Employees", name: "numberOfEmployees" },
            { label: "LinkedIn URL", name: "linkedinUrl" },
            { label: "Status", name: "status" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 mb-2 text-sm md:text-base">
                {field.label}
              </label>
              {field.name === "aboutCompany" ? (
                <textarea
                  name={field.name}
                  value={newCompany[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  rows={3}
                />
              ) : field.name === "status" ? (
                <select
                  name={field.name}
                  value={newCompany[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={newCompany[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base font-medium"
            >
              Add Company
            </button>
          </div>
        </form>
      </div>

      {/* Companies Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-4">All Companies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Company Name</th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Email</th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">HR Name</th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Industry</th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Status</th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">{company.companyName}</td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">{company.companyEmail}</td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">{company.hrName}</td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">{company.industryType}</td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">{company.status}</td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No companies added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageCompany;
