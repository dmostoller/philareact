// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { BugReport } from "@prisma/client";
import LoadingSpinner from "../../components/LoadingSpinner";

const Dashboard: React.FC = () => {
  const [reports, setReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const res = await fetch("/api/report-bug");
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        } else {
          console.error("Failed to fetch bug reports");
        }
      } catch (error) {
        console.error("Error fetching bug reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugReports();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/report-bug/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const updatedReport = await res.json();
        setReports(prevReports => prevReports.map(report => (report.id === id ? updatedReport : report)));
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Bug Reports</h2>
      <table className="min-w-full bg-dark-slate-700 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-dark-slate-500">ID</th>
            <th className="py-2 px-4 border-b border-dark-slate-500">Reporter</th>
            <th className="py-2 px-4 border-b border-dark-slate-500">Details</th>
            <th className="py-2 px-4 border-b border-dark-slate-500">Severity</th>
            <th className="py-2 px-4 border-b border-dark-slate-500">Status</th>
            <th className="py-2 px-4 border-b border-dark-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td className="py-2 px-4 border-b border-dark-slate-500">{report.id}</td>
              <td className="py-2 px-4 border-b border-dark-slate-500">
                <div>{report.name}</div>
                <div className="text-sm text-gray-400">{report.email}</div>
              </td>
              <td className="py-2 px-4 border-b border-dark-slate-500">
                <div>
                  <strong>Error:</strong> {report.error}
                </div>
                <div>
                  <strong>Description:</strong> {report.description}
                </div>
                <div>
                  <strong>Browser:</strong> {report.browser}
                </div>
                <div>
                  <strong>OS:</strong> {report.os}
                </div>
                <div>
                  <strong>Steps:</strong> {report.steps}
                </div>
                <div>
                  <strong>Expected:</strong> {report.expected}
                </div>
                <div>
                  <strong>Actual:</strong> {report.actual}
                </div>
              </td>
              <td className="py-2 px-4 border-b border-dark-slate-500">{report.severity}</td>
              <td className="py-2 px-4 border-b border-dark-slate-500">{report.status}</td>
              <td className="py-2 px-4 border-b border-dark-slate-500">
                <select
                  value={report.status}
                  onChange={e => handleStatusChange(report.id, e.target.value)}
                  className="p-1 bg-dark-slate-600 border border-dark-slate-500 rounded"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
