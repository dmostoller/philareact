const DecorativeElements = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto">
      <svg
        className="svg-decorative absolute top-10 left-6 w-24 h-24 opacity-50 z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle cx="10" cy="10" r="2" fill="#ffffff" />
        <circle cx="30" cy="30" r="3" fill="#ffffff" />
        <circle cx="50" cy="50" r="4" fill="#ffffff" />
        <circle cx="70" cy="70" r="2" fill="#ffffff" />
        <circle cx="90" cy="90" r="3" fill="#ffffff" />
      </svg>
      <svg
        className="floating-dots absolute top-24 left-1/2 w-16 h-16 opacity-30 z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle cx="10" cy="40" r="4" fill="#ffffff" />
        <circle cx="30" cy="20" r="6" fill="#ffffff" />
        <circle cx="40" cy="10" r="3" fill="#ffffff" />
      </svg>
      <svg
        className="floating-stars absolute top-16 right-6 w-16 h-16 opacity-60 z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle cx="20" cy="20" r="1" fill="#ffffff" />
        <circle cx="40" cy="40" r="1.5" fill="#ffffff" />
        <circle cx="60" cy="10" r="1" fill="#ffffff" />
        <circle cx="80" cy="30" r="1.2" fill="#ffffff" />
        <circle cx="90" cy="70" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
};

export default DecorativeElements;
