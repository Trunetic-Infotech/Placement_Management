import React, { useState, useEffect } from "react";

function StudentProfileForm() {
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

  // Load student profile from localStorage on mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setFormData({ ...formData, ...savedProfile });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === "profileImage" || name === "resume") && files && files[0]) {
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

    // Save updated profile for student
    localStorage.setItem("studentProfile", JSON.stringify(formData));

    // Update the student in admin’s list
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const index = students.findIndex(s => s.rollNo === formData.rollNo || s.studentId === formData.studentId);
    if (index !== -1) {
      students[index] = { ...students[index], ...formData };
      localStorage.setItem("students", JSON.stringify(students));
    }

    alert("Profile saved successfully!");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Student ID", name: "studentId", type: "text" },
          { label: "Roll No", name: "rollNo", type: "text" },
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phone", type: "text" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Department", name: "department", type: "text" },
          { label: "Course", name: "course", type: "text" },
          { label: "CGPA", name: "cgpa", type: "number", step: "0.01" },
          { label: "Skills", name: "skills", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg w-full"
              step={field.step || undefined}
            />
          </div>
        ))}

        {/* Profile Image */}
        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>

        {/* Resume */}
        <div>
          <label className="block mb-1 font-medium">Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
          />
          {formData.resume && (
            <a
              href={formData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              View Resume
            </a>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfileForm;
