import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ExternalLink, FileText, Github, Linkedin, Globe } from "lucide-react";

function StudentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);

  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobApply/student`,
        { headers: { Authorization: `${token}` } }
      );

      if (response.data.success) {
        setApplications(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🎯 My Job Applications
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center text-lg">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-blue-50 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">Job Title</th>
                <th className="px-6 py-3 font-semibold">Company</th>
                <th className="px-6 py-3 font-semibold">Applied On</th>
                <th className="px-6 py-3 font-semibold">Resume</th>
                <th className="px-6 py-3 font-semibold">Links</th>
                <th className="px-6 py-3 font-semibold">Cover Letter</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.application_id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-blue-700">
                    {app.job_title || "—"}
                  </td>

                  <td className="px-6 py-3">{app.company_name || "—"}</td>

                  <td className="px-6 py-3">
                    {app.applied_date
                      ? new Date(app.applied_date).toLocaleDateString("en-IN")
                      : "—"}
                  </td>

                  <td className="px-6 py-3">
                    {app.resume_url ? (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" /> View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-6 py-3 flex items-center gap-3">
                    {app.linkedin_url && (
                      <a
                        href={app.linkedin_url.startsWith("http") ? app.linkedin_url : `https://${app.linkedin_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                      </a>
                    )}
                    {app.github_url && (
                      <a
                        href={app.github_url.startsWith("http") ? app.github_url : `https://${app.github_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5 text-gray-800 hover:text-black" />
                      </a>
                    )}
                    {app.portfolio_url && (
                      <a
                        href={app.portfolio_url.startsWith("http") ? app.portfolio_url : `https://${app.portfolio_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-5 h-5 text-purple-600 hover:text-purple-800" />
                      </a>
                    )}
                  </td>

                  <td className="px-6 py-3">
                    {app.cover_letter ? (
                      <button
                        onClick={() => setSelectedCoverLetter(app.cover_letter)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td
                    className={`px-6 py-3 font-semibold ${
                      app.status === "Selected"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : app.status === "Pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {app.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Cover Letter */}
      {selectedCoverLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📄 Cover Letter
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
              {selectedCoverLetter}
            </pre>
            <button
              onClick={() => setSelectedCoverLetter(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentApplications;
