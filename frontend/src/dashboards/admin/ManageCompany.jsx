import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

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

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/company/allCompany`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        setCompanies(res.data.data);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch companies ❌"
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setNewCompany({ ...newCompany, [name]: files[0] });
    } else {
      setNewCompany({ ...newCompany, [name]: value });
    }
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("company_name", newCompany.companyName);
      formData.append("company_email", newCompany.companyEmail);
      formData.append("password", newCompany.password);
      formData.append("hr_name", newCompany.hrName);
      formData.append("industry_type", newCompany.industryType);
      formData.append("website_url", newCompany.websiteUrl);
      formData.append("address", newCompany.address);
      formData.append("postal_code", newCompany.postalCode);
      formData.append("contact_number", newCompany.contactNumber);
      formData.append("about_company", newCompany.aboutCompany);
      formData.append("no_of_employees", newCompany.numberOfEmployees);
      formData.append("linkedin_url", newCompany.linkedinUrl);
      formData.append("registered_by", "owner");

      if (newCompany.companyLogo) {
        formData.append("company_logo", newCompany.companyLogo);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/company/register/company`,
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Company Registered Successfully ✅");
        setNewCompany({
          companyName: "",
          companyEmail: "",
          password: "",
          hrName: "",
          companyLogo: null,
          industryType: "",
          websiteUrl: "",
          address: "",
          postalCode: "",
          contactNumber: "",
          aboutCompany: "",
          numberOfEmployees: "",
          linkedinUrl: "",
        });
      }
      fetchCompanies();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to register company ❌"
      );
    }
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
      <div>
        <h1 className="text-2xl font-semibold mb-6">Register Company</h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleAddCompany}>
            {[
              { label: "Company Name", name: "companyName" },
              { label: "Company Email", name: "companyEmail" },
              { label: "Password", name: "password", type: "password" },
              { label: "HR Name", name: "hrName" },
              { label: "Industry Type", name: "industryType" },
              { label: "Website URL", name: "websiteUrl" },
              { label: "Address", name: "address" },
              { label: "Postal Code", name: "postalCode" },
              { label: "Contact Number", name: "contactNumber" },
              { label: "About Company", name: "aboutCompany", textarea: true },
              { label: "No of Employees", name: "numberOfEmployees" },
              { label: "LinkedIn URL", name: "linkedinUrl" },
              { label: "Company Logo", name: "companyLogo", type: "file" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-1">{field.label}</label>

                {field.textarea ? (
                  <textarea
                    name={field.name}
                    value={newCompany[field.name]}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    onChange={handleChange}
                    value={
                      field.type === "file" ? undefined : newCompany[field.name]
                    }
                    className="w-full border p-2 rounded"
                  />
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                Register Company
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-4">All Companies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                  Company Name
                </th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                  Email
                </th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                  HR Name
                </th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                  Industry
                </th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                  Status
                </th>
                <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    {company.company_name}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    {company.company_email}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    {company.hr_name}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    {company.industry_type}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    {company.status}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1">
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
