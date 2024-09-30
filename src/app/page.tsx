// pages/index.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CalendarIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
          <section className="bg-white py-16 px-4 flex justify-center">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-center md:text-left max-w-4xl">
              
              {/* Right Column: Logo */}
              <div className="col-span-1 ">
                <div className="relative w-96 h-96 mx-auto md:mx-0">
                  <Image
                    src="/philly-react3.png" // Ensure to replace with your actual logo path
                    alt="PhilaReact Logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>


              {/* Left Column: Text and Buttons */}
                <div className="col-span-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Welcome to PhilaReact
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-xl mx-auto md:mx-0">
                  A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.
                </p>
                <div className="mt-6 flex justify-center md:justify-start space-x-4">
                  <Link href="/join">
                  <div className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105 duration-300">
                    Join the Community
                  </div>
                  </Link>
                  <Link href="/learn-more">
                  <div className="px-6 py-3 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition transform hover:scale-105 duration-300">
                    Learn More
                  </div>
                  </Link>
                </div>
              </div>


            </div>
          </section>

          


      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50 animate-fade-in-up">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">What is PhilaReact?</h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            PhilaReact is a community where developers meet to discuss and share knowledge on React, 
            Next.js, and JavaScript technologies. We host regular meetups, provide resources, 
            and offer a forum for developers to connect.
          </p>
        </div>
      </section>

 {/* Featured Content Section */}
 <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore PhilaReact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Events */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
              </div>
              <p className="text-gray-700 mt-2">
                Check out the latest meetups and events we have in store for the React community in Philly.
              </p>
              <Link href="/events">
                <div className="text-blue-600 mt-4 inline-block hover:underline transition-colors">
                  View Events →
                </div>
              </Link>
            </div>

            {/* Card 2 - Articles */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Popular Articles</h3>
              </div>
              <p className="text-gray-700 mt-2">
                Discover some of the most popular articles written by Philly developers on React and Next.js.
              </p>
              <Link href="/articles">
                <div className="text-blue-600 mt-4 inline-block hover:underline transition-colors">
                  Read Articles →
                </div>
              </Link>
            </div>

            {/* Card 3 - Forum */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Join the Forum</h3>
              </div>
              <p className="text-gray-700 mt-2">
                Connect with fellow developers in our forum. Share your questions, knowledge, and projects.
              </p>
              <Link href="/forum">
                <div className="text-blue-600 mt-4 inline-block hover:underline transition-colors">
                  Visit Forum →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
