import Image from 'next/image';


const LandingPage = () => {
  return (
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Philly React
        </h1>
        <p className="text-gray-600 mb-8">
          A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.
        </p>
        {/* <a href="/news" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
          View News Feed
        </a> */}
        <div className="mt-8 flex justify-center">
          <Image src="/philly-react-2.png" alt="React Bell Logo" width={500} height={500} />
        </div>
      </section>
  );
};

export default LandingPage;
