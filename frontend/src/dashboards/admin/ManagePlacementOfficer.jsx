import React, { useState } from "react";

function ManagePlacementOfficer() {
  // Sample placement officer data
  const [officers, setOfficers] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@example.com" },
    { id: 2, name: "Anita Sharma", email: "anita@example.com" },
  ]);

  const [newOfficer, setNewOfficer] = useState({
    name: "",
    email: "",
  });

  // Add new officer
  const handleAddOfficer = () => {
    if (!newOfficer.name || !newOfficer.email) return;
    setOfficers([...officers, { id: Date.now(), ...newOfficer }]);
    setNewOfficer({ name: "", email: "" });
  };

  // Delete officer
  const handleDelete = (id) => {
    setOfficers(officers.filter((officer) => officer.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Manage Placement Officers
      </h1>

      {/* Add Officer Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Officer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newOfficer.name}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, name: e.target.value })
            }
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newOfficer.email}
            onChange={(e) =>
              setNewOfficer({ ...newOfficer, email: e.target.value })
            }
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddOfficer}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Officer
        </button>
      </div>

      {/* Officers Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Placement Officer List</h2>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{officer.name}</td>
                <td className="py-2 px-4">{officer.email}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(officer.id)}
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

export default ManagePlacementOfficer;
