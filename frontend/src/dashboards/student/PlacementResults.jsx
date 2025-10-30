import React, { useState } from "react";

function PlacementResults() {
  const [results] = useState([
    {
      id: 1,
      jobTitle: "Frontend Developer",
      companyName: "Demo Company",
      status: "Selected",
      package: "6 LPA",
      joiningDate: "2026-01-15",
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      companyName: "Demo Company",
      status: "Rejected",
      package: "N/A",
      joiningDate: "",
    },
    {
      id: 3,
      jobTitle: "Data Analyst",
      companyName: "Demo Analytics",
      status: "Selected",
      package: "5.5 LPA",
      joiningDate: "2026-02-01",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Placement Results
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No placement results available yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-purple-50 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">Job Title</th>
                <th className="px-6 py-3 font-semibold">Company</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Package</th>
                <th className="px-6 py-3 font-semibold">Joining Date</th>
              </tr>
            </thead>

            <tbody>
              {results.map((res) => (
                <tr
                  key={res.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{res.jobTitle}</td>
                  <td className="px-6 py-3">{res.companyName}</td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      res.status === "Selected"
                        ? "text-green-600"
                        : res.status === "Rejected"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    {res.status}
                  </td>
                  <td className="px-6 py-3">{res.package}</td>
                  <td className="px-6 py-3">
                    {res.joiningDate || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PlacementResults;
