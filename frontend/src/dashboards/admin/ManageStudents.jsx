import React, { useState } from "react";

function ManageStudents() {
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", rollNo: "CS101" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", rollNo: "CS102" },
    { id: 3, name: "Alice Lee", email: "alice@example.com", rollNo: "CS103" },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    rollNo: "",
  });

  // Add new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.rollNo) return;
    setStudents([
      ...students,
      { id: Date.now(), ...newStudent },
    ]);
    setNewStudent({ name: "", email: "", rollNo: "" });
  };

  // Delete student
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Students
      </h1>

      {/* Add Student Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Roll No"
            value={newStudent.rollNo}
            onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddStudent}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Roll No</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">{student.rollNo}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
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

export default ManageStudents;
