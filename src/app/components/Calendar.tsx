"use client";

import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useSession } from "next-auth/react";
import AddEventForm from "../components/AddEventForm";
import Tooltip from "../components/Tooltip";
import LoadingSpinner from "./LoadingSpinner";

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
}

const EventCalendar: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Log API response

        // Convert start and end from strings to Date objects
        const parsedEvents = data.map((event: Event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));

        console.log("Parsed Events:", parsedEvents); // Log parsed events
        setEvents(parsedEvents);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleEventAdded = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#4f4f4f", // Tailwind Dark Slate-700 for event background
        color: "#d1d1d1", // Tailwind Slate-200 for text color
        borderRadius: "4px",
        padding: "5px",
        border: "1px solid #5d5d5d" // Tailwind Dark Slate-600 for border color
      }
    };
  };

  return (
    <>
      <div className="container mx-auto mt-4 p-6 bg-dark-slate-600 border border-dark-slate-500 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Community Events</h1>
        <Calendar
          localizer={localizer}
          events={events}
          date={currentDate}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          eventPropGetter={eventStyleGetter}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={Views.MONTH}
          view={currentView}
          step={60}
          showMultiDayTimes
          defaultDate={currentDate}
          onNavigate={date => {
            // console.log(`Navigated to ${view} view on ${date}`);
            setCurrentDate(date);
          }}
          onView={view => {
            // console.log(`Changed to ${view} view`);
            setCurrentView(view);
          }}
          components={{
            event: ({ event }) => (
              <Tooltip
                content={
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.description}</p>
                    <p>
                      <strong>Start:</strong> {moment(event.start).format("MMMM Do YYYY, h:mm a")}
                    </p>
                    <p>
                      <strong>End:</strong> {moment(event.end).format("MMMM Do YYYY, h:mm a")}
                    </p>
                  </div>
                }
              >
                <div>
                  <strong>{event.title}</strong>
                  {event.description && ":  " + event.description}
                </div>
              </Tooltip>
            )
          }}
        />
      </div>
      <div className="container w-full md:w-3/4 lg:w-2/3 mx-auto p-4 border border-dark-slate-500 rounded-lg mt-4">
        {session && <AddEventForm onEventAdded={handleEventAdded} />}
      </div>
    </>
  );
};

export default EventCalendar;
