// app/dashboard/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { BugReport } from '@prisma/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { UserIcon } from '@/components/icons/user';
import UserAvatar from '../../components/UserAvatar';

interface UserStats {
  posts: number;
  comments: number;
  upvotes: number;
  downvotes: number;
}

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [reports, setReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [showAllReports, setShowAllReports] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      const [reportsRes, statsRes] = await Promise.all([
        fetch(`/api/report-bug${!showAllReports ? `?userEmail=${session.user.email}` : ''}`),
        fetch(`/api/user-stats?userId=${session.user.id}`),
      ]);

      if (statsRes?.ok) {
        const statsData = await statsRes.json();
        // console.log('Received stats:', statsData);
        setStats(statsData);
      }
      if (reportsRes.ok) {
        const reportsData = await reportsRes.json();
        // console.log('Received reports:', reportsData);
        setReports(reportsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [session, showAllReports, setLoading, setStats, setReports]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session, showAllReports, fetchData]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/report-bug/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedReport = await res.json();
        setReports((prevReports) => prevReports.map((report) => (report.id === id ? updatedReport : report)));
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        <div className="flex justify-center items-center">
          <UserIcon />
          User Dashboard
        </div>
      </h1>
      {/* Profile Section */}
      {session?.user && (
        <div className="mb-8 bg-dark-slate-700 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <UserAvatar name={session?.user.name || 'Unknown User'} size={75} />

            <div>
              <h2 className="text-xl font-bold">{session.user.name}</h2>
              <p className="text-dark-slate-300">{session.user.email}</p>
              <p className="text-dark-slate-400">Role: {session.user.role}</p>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-dark-slate-800 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{stats.posts}</div>
                <div className="text-dark-slate-400">Posts</div>
              </div>
              <div className="bg-dark-slate-800 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{stats.comments}</div>
                <div className="text-dark-slate-400">Comments</div>
              </div>
              <div className="bg-dark-slate-800 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-500">{stats.upvotes}</div>
                <div className="text-dark-slate-400">Upvotes</div>
              </div>
              <div className="bg-dark-slate-800 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-500">{stats.downvotes}</div>
                <div className="text-dark-slate-400">Downvotes</div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-end mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showAllReports}
            onChange={(e) => setShowAllReports(e.target.checked)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-dark-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-dark-slate-300">
            {showAllReports ? 'Show Your Reports' : 'Show All Reports'}
          </span>
        </label>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        {showAllReports ? 'All Bug Reports' : 'Your Bug Reports'}
      </h2>

      {/* Hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-dark-slate-500">ID</th>
              <th className="py-2 px-4 border-b border-dark-slate-500">Reporter</th>
              <th className="py-2 px-4 border-b border-dark-slate-500">Details</th>
              <th className="py-2 px-4 border-b border-dark-slate-500">Severity</th>
              <th className="py-2 px-4 border-b border-dark-slate-500">Status</th>
              <th className="py-2 px-4 border-b border-dark-slate-500">Date Created</th>
              <th className="py-2 px-4 border-b border-dark-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="py-2 px-4 border-b border-dark-slate-500">{report.id}</td>
                <td className="py-2 px-4 border-b border-dark-slate-500">
                  <div>{report.name}</div>
                  <div className="text-sm text-dark-slate-400">{report.email}</div>
                </td>
                <td className="py-2 px-4 border-b border-dark-slate-500">
                  <div className="space-y-1">
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
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-dark-slate-500">{report.severity}</td>
                <td className="py-2 px-4 border-b border-dark-slate-500">{report.status}</td>
                <td className="py-2 px-4 border-b border-dark-slate-500">
                  {new Date(report.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="py-2 px-4 border-b border-dark-slate-500">
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
                    className="p-1 bg-dark-slate-800 border border-dark-slate-500 rounded"
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

      {/* Visible on mobile, hidden on desktop */}
      <div className="md:hidden space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-dark-slate-700 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-dark-slate-300">ID: {report.id}</span>
                <h3 className="font-medium">{report.name}</h3>
                <p className="text-sm text-dark-slate-300">{report.email}</p>
                <p className="text-sm text-dark-slate-300">
                  {new Date(report.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">{report.severity}</div>
                <div className="text-sm">{report.status}</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <strong>Error:</strong> {report.error}
              </div>
              <div>
                <strong>Description:</strong> {report.description}
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <strong>Browser:</strong> {report.browser}
                </div>
                <div>
                  <strong>OS:</strong> {report.os}
                </div>
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
            </div>

            <div className="pt-2">
              <select
                value={report.status}
                onChange={(e) => handleStatusChange(report.id, e.target.value)}
                className="w-full p-2 bg-dark-slate-950 border border-dark-slate-700 rounded"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
