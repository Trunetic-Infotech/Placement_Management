import React, { useState } from "react";

function StudentProfileForm() {
  const [formData, setFormData] = useState({
    rollNo: "CS101",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    department: "Computer Science",
    course: "B.Tech",
    cgpa: "9.2",
    skills: "React, Node.js",
    profileImage: "",
    resume: "",
    certificate: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (
      (name === "profileImage" ||
        name === "resume" ||
        name === "certificate") &&
      files &&
      files[0]
    ) {
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
    alert("This is a UI-only form. Changes are not saved.");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          { label: "Roll No", name: "rollNo" },
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Department", name: "department" },
          { label: "Course", name: "course" },
          { label: "CGPA", name: "cgpa" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              readOnly
              className="border px-3 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
        ))}

        {/* Editable: Skills */}
        <div>
          <label className="block mb-1 font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Editable: Profile Image */}
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

        {/* Editable: Resume */}
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

        {/* Editable: Certificate */}
        <div>
          <label className="block mb-1 font-medium">Certificate</label>
          <input
            type="file"
            name="certificate"
            accept=".pdf,.jpg,.png"
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

        {/* Submit Button */}
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
