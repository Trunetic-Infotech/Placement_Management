import React, { useEffect, useState } from "react";

function StudentApplicationList() {
  const [applications, setApplications] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // For modal

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("studentApplications")) || [];
    const savedProfile =
      JSON.parse(localStorage.getItem("studentProfile")) || null;

    setApplications(savedApplications);
    setStudentProfile(savedProfile);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = applications.map((app) =>
      app.id === id
        ? {
            ...app,
            status: newStatus,
            forwardedBy:
              newStatus === "Forwarded to Recruiter"
                ? "Placement Officer"
                : app.forwardedBy || null,
            forwardedAt:
              newStatus === "Forwarded to Recruiter"
                ? new Date().toISOString()
                : app.forwardedAt || null,
          }
        : app
    );

    setApplications(updated);
    localStorage.setItem("studentApplications", JSON.stringify(updated));

    if (newStatus === "Forwarded to Recruiter") {
      alert(
        `Application for ${app.title} at ${app.company} has been forwarded to the recruiter.`
      );
    }
  };

  const handleViewProfile = () => {
    setSelectedStudent(studentProfile);
  };

  const closeModal = () => setSelectedStudent(null);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Student Applications
      </h2>

      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-gray-700">
            <thead className="bg-blue-50 border-b text-gray-800">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3">
                    {studentProfile ? (
                      <div>
                        <p className="font-semibold text-gray-800">
                          {studentProfile.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Roll No: {studentProfile.rollNo || "N/A"}
                        </p>
                        <button
                          onClick={handleViewProfile}
                          className="text-blue-600 text-sm underline mt-1"
                        >
                          View Profile & Resume
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Profile not found</p>
                    )}
                  </td>

                  <td className="px-6 py-3">{app.title}</td>
                  <td className="px-6 py-3">{app.company}</td>
                  <td className="px-6 py-3">{app.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "Forwarded to Recruiter"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Selected"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <select
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      value={app.status}
                      className="border border-gray-300 rounded-lg px-2 py-1"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Forwarded to Recruiter">
                        Forwarded to Recruiter
                      </option>
                      <option value="Rejected (Not Eligible)">
                        Rejected (Not Eligible)
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No student applications found.
        </p>
      )}

      {/* Profile & Resume Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-2xl relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-6 mb-6">
              {selectedStudent.image ? (
                <img
                  src={selectedStudent.image}
                  alt="Student"
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {selectedStudent.name}
                </h3>
                <p className="text-gray-600">{selectedStudent.course}</p>
                <p className="text-gray-600 text-sm">
                  Roll No: {selectedStudent.rollNo}
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Department:</strong> {selectedStudent.department}
              </p>
              <p>
                <strong>CGPA:</strong> {selectedStudent.cgpa}
              </p>
              <p>
                <strong>Skills:</strong> {selectedStudent.skills}
              </p>
              <p>
                <strong>Phone:</strong> {selectedStudent.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Date of Birth:</strong> {selectedStudent.dob}
              </p>
              <p className="col-span-2">
                <strong>Address:</strong> {selectedStudent.address || "N/A"}
              </p>
            </div>

            {/* Resume Section */}
            <div className="mt-6 text-center">
              {selectedStudent.resumeLink ? (
                <a
                  href={selectedStudent.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View / Download Resume
                </a>
              ) : (
                <p className="text-red-500 italic">
                  No resume uploaded by the student.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentApplicationList;
