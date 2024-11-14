'use client';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import AddEventForm from '../components/AddEventForm';
import Tooltip from '../components/Tooltip';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import { toast } from 'sonner';
import { DeleteIcon } from '../components/icons/delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { CalendarCogIcon } from './icons';
import Image from 'next/image';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  userId: string;
}

const EventCalendar: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log("API Response:", data); // Log API response

        // Convert start and end from strings to Date objects
        const parsedEvents = data.map((event: Event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        // console.log("Parsed Events:", parsedEvents); // Log parsed events
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

  const handleEventAdded = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (eventId: number, eventUserId: string) => {
    if (!session?.user) return;

    const isAdmin = session.user.role === 'ADMIN';
    if (session.user.id !== eventUserId && !isAdmin) {
      toast.error('Not authorized to delete this event');
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#454545', // Tailwind Dark Slate-700 for event background
        color: '#d1d1d1', // Tailwind Slate-200 for text color
        borderRadius: '4px',
        padding: '5px',
        border: '1px solid #4f4f4f', // Tailwind Dark Slate-600 for border color
      },
    };
  };

  return (
    <>
      <div className="container mx-auto mt-6 p-6 bg-dark-slate-950 border-2 border-dark-slate-700 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">
          <div className="flex justify-center items-center">
            <CalendarCogIcon />
            Community Events
          </div>
        </h1>
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
          onNavigate={(date) => {
            // console.log(`Navigated to ${view} view on ${date}`);
            setCurrentDate(date);
          }}
          onView={(view) => {
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
                      <strong>Start:</strong> {moment(event.start).format('MMMM Do YYYY, h:mm a')}
                    </p>
                    <p>
                      <strong>End:</strong> {moment(event.end).format('MMMM Do YYYY, h:mm a')}
                    </p>
                  </div>
                }
              >
                <div>
                  <strong>{event.title}</strong>
                  {event.description && ':  ' + event.description}
                </div>
              </Tooltip>
            ),
          }}
        />
      </div>
      {session ? (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center text-center mt-8 px-4 space-y-4 md:space-y-0">
            <a
              href="https://technical.ly/events/"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto order-1 md:order-1"
            >
              <button className="w-full text-white bg-[#37f084] md:mr-4 py-2 px-4 rounded-lg flex items-center justify-center hover:bg-[#2fd99b] transition">
                <Image
                  src="https://philareact.s3.us-east-2.amazonaws.com/technically-logo-icon.svg"
                  alt="Technicaly Logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Visit Technical.ly
              </button>
            </a>
            <a
              href="https://www.eventbrite.com/o/philareact-102755209461"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto order-2 md:order-3"
            >
              <button className="w-full text-white bg-[#F05537] md:ml-4 py-2 px-4 rounded-lg flex items-center justify-center hover:bg-[#D9472F] transition">
                <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
                Visit Eventbrite
              </button>
            </a>
            <div className="w-full md:w-auto order-3 md:order-2 md:ml-4">
              <PrimaryButton onClick={toggleFormVisibility} className="w-full">
                {showForm ? 'Hide Event Form' : 'Create an Event'}
              </PrimaryButton>
            </div>
          </div>
          {showForm && (
            <div className="mx-4 md:max-w-3xl lg:max-w-2xl md:mx-auto p-4 border border-dark-slate-600 bg-dark-slate-900 rounded-lg mt-4">
              <AddEventForm onEventAdded={handleEventAdded} />
            </div>
          )}
          <div className="mt-8 px-4 mb-4 md:max-w-3xl lg:max-w-2xl mx-auto">
            {events.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Upcoming Events</h2>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-4 bg-dark-slate-900 border border-dark-slate-600 rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-dark-slate-300">{event.description}</p>
                        <p className="text-sm text-dark-slate-400">
                          {event.start.toLocaleString()} - {event.end.toLocaleString()}
                        </p>
                      </div>
                      {(session?.user?.id === event.userId || session?.user?.role === 'ADMIN') && (
                        <button
                          onClick={() => handleDelete(event.id, event.userId)}
                          className="text-dark-slate-200 px-4 py-2"
                        >
                          <DeleteIcon />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="container w-full md:w-3/4 lg:w-2/3 mx-auto text-center p-4 border border-dark-slate-500 rounded-lg my-4">
          <p className="text-lg font-semibold">
            <Link href="/api/auth/signin" className="hover:underline ">
              Sign in to add events to the calendar
            </Link>
          </p>
          <div className="flex justify-center items-center text-center mt-8 px-4">
            <a href="https://technical.ly/events/" target="_blank" rel="noreferrer">
              <button className="text-white bg-[#37f084] mr-4  py-2 px-4 rounded-lg flex items-center justify-center hover:bg-[#2fd99b] transition">
                <Image
                  src="/technically-logo-icon.svg"
                  alt="Technicaly Logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Visit Technical.ly
              </button>
            </a>
            <a href="https://www.eventbrite.com/o/philareact-102755209461" target="_blank" rel="noreferrer">
              <button className="text-white bg-[#F05537] ml-4 py-2 px-4 rounded-lg items-center justify-center hover:bg-[#D9472F] transition">
                <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
                Visit Eventbrite
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCalendar;
