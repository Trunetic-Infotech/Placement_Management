import React from "react";

function Reports() {
  // Sample data
  const totalJobs = 15;
  const totalApplications = 120;
  const placedStudents = 80;
  const notPlaced = 40;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Applications</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Placed Students</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">{placedStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700">Not Placed</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">{notPlaced}</p>
        </div>
      </div>

      {/* Placeholder for Charts or Detailed Reports */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Detailed Reports</h2>
        <p className="text-gray-500">Here you can add charts, tables, or other visual reports.</p>
      </div>
    </div>
  );
}

export default Reports;
