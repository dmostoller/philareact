// src/components/AddEventForm.tsx

"use client";

import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
}

interface AddEventFormProps {
  onEventAdded: (event: Event) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    const newEvent = { title, start, end, description, userId: session.user.id };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });

      if (!response.ok) {
        throw new Error("Error adding event");
      }

      const savedEvent = await response.json();
      onEventAdded({
        ...savedEvent,
        start: new Date(savedEvent.start),
        end: new Date(savedEvent.end)
      });

      // Reset form fields
      setTitle("");
      setStart("");
      setEnd("");
      setDescription("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold my-2 text-center">Add New Event</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Event Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="start" className="block text-sm font-medium text-gray-300 mb-1">
            Start Date & Time
          </label>
          <input
            id="start"
            type="datetime-local"
            placeholder="Start Date & Time"
            value={start}
            onChange={e => setStart(e.target.value)}
            required
            className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>
        <div>
          <label htmlFor="end" className="block text-sm font-medium text-gray-300 mb-1">
            End Date & Time
          </label>
          <input
            id="end"
            type="datetime-local"
            placeholder="End Date & Time"
            value={end}
            onChange={e => setEnd(e.target.value)}
            required
            className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>
      </div>
      <PrimaryButton type="submit" className="w-full mt-4 px-4 py-2">
        Add Event
      </PrimaryButton>
    </form>
  );
};

export default AddEventForm;
