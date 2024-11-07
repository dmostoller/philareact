import EventCalendar from "../../components/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";

const EventsPage = () => {
  return (
    <>
      <EventCalendar />
      <section className="container mx-auto text-center py-8">
        <p className="mb-4">You can also find us on Eventbrite.</p>
        <a
          href="https://www.eventbrite.com/o/philareact-102755209461"
          target="_blank"
          rel="noreferrer"
          className="text-white bg-[#F05537] mt-2 py-3 px-4 rounded-full items-center justify-center hover:bg-[#D9472F] transition"
        >
          <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
          Visit Eventbrite
        </a>
      </section>
    </>
  );
};

export default EventsPage;
