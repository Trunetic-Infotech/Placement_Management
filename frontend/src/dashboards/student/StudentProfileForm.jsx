import React, { useState, useEffect } from "react";

function StudentProfileForm() {
  const [formData, setFormData] = useState({
    rollNo: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    course: "",
    cgpa: "",
    skills: "",
    profileImage: "",
    resume: "",
    certificate: "",
  });

  // Load student profile from localStorage
  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const student = students.find((s) => s.email === loggedInUser.email);
    if (student) setFormData(student);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === "profileImage" || name === "resume" || name === "certificate") && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, [name]: ev.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else if (["skills"].includes(name)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const index = students.findIndex((s) => s.email === formData.email);

    if (index !== -1) {
      students[index] = { ...students[index], ...formData };
      localStorage.setItem("students", JSON.stringify(students));
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {[
          { label: "Roll No", name: "rollNo", editable: false },
          { label: "First Name", name: "firstName", editable: false },
          { label: "Last Name", name: "lastName", editable: false },
          { label: "Email", name: "email", editable: false },
          { label: "Phone", name: "phone", editable: false },
          { label: "Department", name: "department", editable: false },
          { label: "Course", name: "course", editable: false },
          { label: "CGPA", name: "cgpa", editable: false },
          { label: "Skills", name: "skills", editable: true },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`border px-3 py-2 rounded-lg w-full ${
                field.editable ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
              readOnly={!field.editable}
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

        {/* Certificate */}
        <div>
          <label className="block mb-1 font-medium">Certificate</label>
          <input
            type="file"
            name="certificate"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full"
          />
          {formData.certificate && (
            <a
              href={formData.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              View Certificate
            </a>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfileForm;
