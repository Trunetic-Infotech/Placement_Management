import React, { useState, useEffect } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    roll_no: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    course: "",
    cgpa: "",
    skills: "",
    photo: "",
    resume: "",
    certificate: "",
  });
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const formFields = [
    "roll_no",
    "firstName",
    "lastName",
    "email",
    "password",
    "phone",
    "department",
    "course",
    "cgpa",
    "skills",
    "photo",
    "resume",
    "certificate",
  ];
  const fetchStudents = async () => {
    console.log("hello");

    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getAllStudents`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Something went wrong while fetching students");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  console.log(import.meta.env.VITE_API_URL);

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      // ✅ Directly store the File object, not base64
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.roll_no.trim()) newErrors.roll_no = "Roll No is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleAddStudent = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newStudent = {
      ...formData,
      id: Date.now(),
      skills: formData.skills || "Not specified",
      cgpa: formData.cgpa || "Not specified",
      department: formData.department || "Not specified",
      course: formData.course || "Not specified",
    };

    const updated = [...students, newStudent];
    // setStudents(updated);
    // localStorage.setItem("students", JSON.stringify(updated));

    const newTotalPages = Math.ceil(updated.length / itemsPerPage);
    setCurrentPage(newTotalPages);

    setErrors({});

    try {
      // ✅ Create real FormData for file upload
      const data = new FormData();
      data.append("roll_no", formData.roll_no);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phone", formData.phone);
      data.append("department", formData.department);
      data.append("course", formData.course);
      data.append("cgpa", formData.cgpa);
      data.append("skills", formData.skills);

      // ✅ Append files properly
      if (formData.photo) data.append("photo", formData.photo);
      if (formData.resume) data.append("resume", formData.resume);
      if (formData.certificate)
        data.append("certificate", formData.certificate);

      // ✅ Send as multipart/form-data
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/student/register/student`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Account created!", {
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
      }

      await fetchStudents();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/student/studentDelete/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Student deleted!");

        const updated = students.filter((student) => student.student_id !== id);
        setStudents(updated);

        await fetchStudents();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete student");
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        Manage Students
      </h2>

      {/* Form Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Add New Student
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {formFields.map((key) => (
            <div
              key={key}
              className={key === "skills" ? "md:col-span-2 lg:col-span-3" : ""}>
              <label className="block text-sm font-medium mb-1 md:mb-2 capitalize">
                {key === "cgpa" ? "CGPA" : key.replace(/([A-Z])/g, " $1")}
                {[
                  "roll_no",
                  "firstName",
                  "lastName",
                  "email",
                  "phone",
                ].includes(key) && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={
                  key === "photo" || key === "resume" || key === "certificate"
                    ? "file"
                    : key === "password"
                    ? "password"
                    : "text"
                }
                name={key}
                value={
                  key === "photo" || key === "resume" || key === "certificate"
                    ? undefined
                    : formData[key]
                }
                onChange={handleChange}
                className={`border p-2 md:p-3 rounded w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={`Enter ${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
              />
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddStudent}
          className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm md:text-base font-medium">
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg md:text-xl font-semibold">
            All Students ({students.length})
          </h3>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No students added yet. Add your first student above.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border table-auto min-w-max">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Roll No
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Name
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Email
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Phone
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden lg:table-cell">
                      Department
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden lg:table-cell">
                      Course
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden lg:table-cell">
                      CGPA
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden xl:table-cell">
                      Skills
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Profile
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Resume
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Certificate
                    </th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.roll_no || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm font-medium">
                        {s.firstName} {s.lastName}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.email || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.phoneNumber || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">
                        {s.department || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">
                        {s.course || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">
                        {s.cgpa || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden xl:table-cell">
                        {s.skills || "-"}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.photo_url ? (
                          <img
                            src={s.photo_url}
                            alt="Profile"
                            className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full mx-auto"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No image
                          </span>
                        )}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.resume_url ? (
                          <a
                            href={s.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-xs md:text-sm">
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No resume
                          </span>
                        )}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.certificate_url ? (
                          <a
                            href={s.certificate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-xs md:text-sm">
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No certificate
                          </span>
                        )}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        <button
                          onClick={() => handleDeleteStudent(s.student_id)}
                          className="text-red-600 hover:text-red-800 p-1 md:p-2 rounded hover:bg-red-50 transition"
                          title="Delete student">
                          <Trash2 size={16} className="md:size-18" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-6 gap-3">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, students.length)} of {students.length}{" "}
                  students
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                    <ChevronLeft size={16} />
                  </button>
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded border text-sm ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:bg-gray-50 transition"
                      }`}>
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ManageStudents;
