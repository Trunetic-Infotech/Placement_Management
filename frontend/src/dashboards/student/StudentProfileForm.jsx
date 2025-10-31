import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function StudentProfileForm() {
  const [studentProfile, setStudentProfile] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/get/student/profile`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      if (response.data.success) {
        setStudentProfile(response.data.data);
      } else {
        toast.error(response.data?.message || "User Not Found!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch student profile. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  // ✅ Handle changes for editable fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setStudentProfile((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setStudentProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit updated data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Prepare FormData for possible file uploads
      const formData = new FormData();
      const editableFields = [
        "firstName",
        "lastName",
        "phoneNumber",
        "photo_url",
        "skills",
        "resume_url",
        "certificate_url",
      ];

      editableFields.forEach((field) => {
        if (!studentProfile[field]) return; // skip empty

        switch (field) {
          case "photo_url":
            formData.append("photo", studentProfile[field]);
            break;
          case "resume_url":
            formData.append("resume", studentProfile[field]);
            break;
          case "certificate_url":
            formData.append("certificate", studentProfile[field]);
            break;
          default:
            formData.append(field, studentProfile[field]);
        }
      });

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/student/update/profile`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!", {
          style: {
            border: "1px solid #16A34A",
            background: "#F0FDF4",
            color: "#14532D",
            padding: "12px 16px",
            borderRadius: "10px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#16A34A",
            secondary: "#F0FDF4",
          },
        });
        fetchStudentsData(); // Refresh updated data
      } else {
        toast.error(response.data?.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Error updating profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>My Profile</h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Read-only fields */}
        {[
          { label: "Roll No", name: "roll_no" },
          { label: "Email", name: "email" },
          { label: "Department", name: "department" },
          { label: "Course", name: "course" },
          { label: "CGPA", name: "cgpa" },
        ].map((field) => (
          <div key={field.name}>
            <label className='block mb-1 font-medium'>{field.label}</label>
            <input
              type='text'
              name={field.name}
              value={studentProfile[field.name] || ""}
              readOnly
              className='border px-3 py-2 rounded-lg w-full bg-gray-100 cursor-not-allowed'
            />
          </div>
        ))}

        {/* Editable fields */}
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Phone", name: "phoneNumber" },
          { label: "Skills", name: "skills" },
        ].map((field) => (
          <div key={field.name}>
            <label className='block mb-1 font-medium'>{field.label}</label>
            <input
              type='text'
              name={field.name}
              value={studentProfile[field.name] || ""}
              onChange={handleChange}
              className='border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>
        ))}

        {/* Profile Image */}
        <div>
          <label className='block mb-1 font-medium'>Profile Image</label>
          <input
            type='file'
            name='photo_url'
            accept='image/*'
            onChange={handleChange}
            className='border px-3 py-2 rounded-lg w-full'
          />
          {studentProfile.photo_url &&
            typeof studentProfile.photo_url === "string" && (
              <img
                src={studentProfile.photo_url}
                alt='Profile'
                className='mt-2 w-24 h-24 object-cover rounded-full'
              />
            )}
        </div>

        {/* Resume */}
        <div>
          <label className='block mb-1 font-medium'>Resume</label>
          <input
            type='file'
            name='resume_url'
            accept='.pdf,.doc,.docx'
            onChange={handleChange}
            className='border px-3 py-2 rounded-lg w-full'
          />
          {studentProfile.resume_url &&
            typeof studentProfile.resume_url === "string" && (
              <a
                href={studentProfile.resume_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline mt-2 block'>
                View Resume
              </a>
            )}
        </div>

        {/* Certificate */}
        <div>
          <label className='block mb-1 font-medium'>Certificate</label>
          <input
            type='file'
            name='certificate_url'
            accept='.pdf,.jpg,.png'
            onChange={handleChange}
            className='border px-3 py-2 rounded-lg w-full'
          />
          {studentProfile.certificate_url &&
            typeof studentProfile.certificate_url === "string" && (
              <a
                href={studentProfile.certificate_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline mt-2 block'>
                View Certificate
              </a>
            )}
        </div>

        {/* Submit */}
        <div className='md:col-span-2'>
          <button
            type='submit'
            disabled={loading}
            className={`mt-4 px-6 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentProfileForm;
