// components/BugReportForm.tsx
"use client";

import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "sonner";

interface BugReportFormProps {
  onSubmitSuccess: () => void;
}

const BugReportForm: React.FC<BugReportFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    error: "",
    description: "",
    browser: "",
    os: "",
    steps: "",
    expected: "",
    actual: "",
    severity: "minor"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/report-bug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Bug report submitted successfully!");
        setFormData({
          name: "",
          email: "",
          error: "",
          description: "",
          browser: "",
          os: "",
          steps: "",
          expected: "",
          actual: "",
          severity: "minor"
        });
        onSubmitSuccess();
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Browser and Version</label>
        <input
          type="text"
          name="browser"
          value={formData.browser}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Operating System</label>
        <input
          type="text"
          name="os"
          value={formData.os}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Steps to Reproduce</label>
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Expected Behavior</label>
        <textarea
          name="expected"
          value={formData.expected}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Actual Behavior</label>
        <textarea
          name="actual"
          value={formData.actual}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Severity</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        >
          <option value="blocker">Blocker</option>
          <option value="critical">Critical</option>
          <option value="major">Major</option>
          <option value="minor">Minor</option>
          <option value="trivial">Trivial</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Error Message</label>
        <textarea
          name="error"
          value={formData.error}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          required
        />
      </div>
      <PrimaryButton type="submit" className="w-full" loading={loading}>
        Submit Bug Report
      </PrimaryButton>
    </form>
  );
};

export default BugReportForm;