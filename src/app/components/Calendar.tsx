'use client';

import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
}

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Log API response

        // Convert start and end from strings to Date objects
        const parsedEvents = data.map((event: Event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        console.log('Parsed Events:', parsedEvents); // Log parsed events
        setEvents(parsedEvents);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#6366F1', // Tailwind Indigo-600 for event background
        color: '#FFF',
        borderRadius: '4px',
        padding: '5px',
      },
    };
  };

  return (
    <div className="container mx-auto mt-4 p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Community Events</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default EventCalendar;