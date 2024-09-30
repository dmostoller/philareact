import EventCalendar from "../components/Calendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeetup,  } from '@fortawesome/free-brands-svg-icons';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const EventsPage = () => {
  return (
    <>
      <EventCalendar />
      <section className="container mx-auto text-center py-8">
        <p className="text-gray-600 mb-4">
          Find us on Meetup.com and Eventbrite for the latest events.
        </p>
        <a href="https://www.meetup.com/" className="mr-4 text-white bg-[#ED1C40] mt-4 py-3 px-4 rounded-full items-center justify-center hover:bg-[#D01738] transition">
          <FontAwesomeIcon icon={faMeetup} className="mr-2" />
          Visit Meetup.com
        </a>
        <a href="https://www.eventbrite.com/" className="text-white bg-[#F05537] mt-2 py-3 px-4 rounded-full items-center justify-center hover:bg-[#D9472F] transition">
          <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
          Visit Eventbrite
        </a>
      </section>
      </>

  );
};

export default EventsPage;
