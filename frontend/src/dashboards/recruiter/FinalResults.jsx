import React, { useEffect, useState } from "react";

function FinalResults() {
  const [results, setResults] = useState([]);

  // 🟢 Get logged recruiter info
  const recruiter = JSON.parse(localStorage.getItem("loggedRecruiter")) || {};

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(`recruiterDecisions_${recruiter.company}`)
      ) || [];

    // 🟢 Filter results for this recruiter’s company
    const filtered = saved.filter(
      (app) =>
        (app.decision === "Selected" || app.decision === "Rejected") &&
        app.company === recruiter.company
    );

    setResults(filtered);
  }, [recruiter.company]);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Final Results ({recruiter.company || "Unknown Company"})
      </h2>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((app) => (
            <li
              key={app.id}
              className={`border rounded-xl p-4 flex justify-between items-center ${
                app.decision === "Selected" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {app.student?.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {app.title} — {app.company}
                </p>
              </div>
              <span
                className={`font-medium ${
                  app.decision === "Selected"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {app.decision}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          No final results yet for {recruiter.company || "this company"}.
        </p>
      )}
    </div>
  );
}

export default FinalResults;
