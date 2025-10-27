import React, { useState, useEffect } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    course: "",
    cgpa: "",
    skills: "",
    profileImage: "",
    resume: "",
  });
  const [errors, setErrors] = useState({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, [name]: ev.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
    if (!formData.rollNo.trim()) newErrors.rollNo = "Roll No is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    
    return newErrors;
  };

  const handleAddStudent = () => {
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
      course: formData.course || "Not specified"
    };
    
    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    
    // Reset form and go to last page to show new student
    const newTotalPages = Math.ceil(updated.length / itemsPerPage);
    setCurrentPage(newTotalPages);
    
    setFormData({
      studentId: "",
      rollNo: "",
      name: "",
      email: "",
      phone: "",
      dob: "",
      department: "",
      course: "",
      cgpa: "",
      skills: "",
      profileImage: "",
      resume: "",
    });
    setErrors({});
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updated = students.filter(student => student.id !== id);
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
      
      // Adjust current page if needed
      const newTotalPages = Math.ceil(updated.length / itemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Manage Students</h2>

      {/* Form Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Add New Student</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className={key === "skills" ? "md:col-span-2 lg:col-span-3" : ""}>
              <label className="block text-sm font-medium mb-1 md:mb-2 capitalize">
                {key === "cgpa"
                  ? "CGPA"
                  : key === "dob"
                  ? "Date of Birth"
                  : key.replace(/([A-Z])/g, " $1")}
                {["studentId", "rollNo", "name", "email", "phone"].includes(key) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <input
                type={
                  key === "profileImage" || key === "resume"
                    ? "file"
                    : key === "dob"
                    ? "date"
                    : "text"
                }
                name={key}
                value={key === "profileImage" || key === "resume" ? undefined : formData[key]}
                onChange={handleChange}
                className={`border p-2 md:p-3 rounded w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
              />
              {errors[key] && (
                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={handleAddStudent}
          className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm md:text-base font-medium"
        >
          Add Student
        </button>
      </div>

      {/* Students Table Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg md:text-xl font-semibold">
            All Students ({students.length})
          </h3>
          
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
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
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Student ID</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Roll No</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Name</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Email</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Phone</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden md:table-cell">Date of Birth</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden lg:table-cell">Department</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden lg:table-cell">Course</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden lg:table-cell">CGPA</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm hidden xl:table-cell">Skills</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Profile</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Resume</th>
                    <th className="border px-2 md:px-4 py-2 text-left text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">{s.studentId || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">{s.rollNo || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm font-medium">{s.name || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">{s.email || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">{s.phone || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden md:table-cell">{s.dob || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">{s.department || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">{s.course || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden lg:table-cell">{s.cgpa || "-"}</td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm hidden xl:table-cell">
                        <span className="truncate block max-w-32">{s.skills || "-"}</span>
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.profileImage ? (
                          <img 
                            src={s.profileImage} 
                            alt="Profile" 
                            className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full mx-auto" 
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No image</span>
                        )}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        {s.resume ? (
                          <a 
                            href={s.resume} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline text-xs md:text-sm"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">No resume</span>
                        )}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-xs md:text-sm">
                        <button
                          onClick={() => handleDeleteStudent(s.id)}
                          className="text-red-600 hover:text-red-800 p-1 md:p-2 rounded hover:bg-red-50 transition"
                          title="Delete student"
                        >
                          <Trash2 size={16} className="md:size-18" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-6 gap-3">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, students.length)} of {students.length} students
                </div>
                
                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded border text-sm ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "hover:bg-gray-50 transition"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
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