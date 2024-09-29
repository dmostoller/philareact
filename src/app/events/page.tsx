
const EventsPage = () => {
  return (
      <section className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <p className="text-gray-600">
          Find us on Meetup.com and Eventbrite for the latest events.
        </p>
        <a href="https://www.meetup.com/" className="text-primary block mt-4">
          Visit Meetup.com
        </a>
        <a href="https://www.eventbrite.com/" className="text-primary block mt-2">
          Visit Eventbrite
        </a>
      </section>
  );
};

export default EventsPage;
