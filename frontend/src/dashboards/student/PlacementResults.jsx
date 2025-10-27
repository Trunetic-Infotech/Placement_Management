import React, { useState, useEffect } from "react";

function PlacementResults() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Demo job list (simulate current openings)
    const demoJobs = [
      {
        id: 1,
        company: "Trunetic Infotech Pvt. Ltd.",
        title: "Frontend Developer Intern",
      },
      {
        id: 2,
        company: "TechNova Solutions",
        title: "React Developer",
      },
      {
        id: 3,
        company: "InnoByte Systems",
        title: "Full Stack Trainee",
      },
    ];

    const savedApps = JSON.parse(localStorage.getItem("studentApplications")) || [];

    // Keep only applications whose job IDs still exist
    const validApps = savedApps.filter((app) =>
      demoJobs.some((job) => job.id === app.id)
    );

    // Optionally auto-clean invalid ones from localStorage
    localStorage.setItem("studentApplications", JSON.stringify(validApps));

    // Random result assignment for demo
    const updatedApps = validApps.map((app) => {
      if (!app.result) {
        const statuses = ["Selected", "Rejected", "Pending"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return { ...app, result: randomStatus };
      }
      return app;
    });

    setApplications(updatedApps);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Placement Results</h2>

      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-gray-700">
            <thead className="bg-blue-50 border-b text-gray-800">
              <tr>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Result</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{app.company}</td>
                  <td className="px-6 py-3">{app.title}</td>
                  <td className="px-6 py-3">{app.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.result === "Selected"
                          ? "bg-green-100 text-green-700"
                          : app.result === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No valid applications found. The job openings may have been removed.
        </p>
      )}
    </div>
  );
}

export default PlacementResults;
