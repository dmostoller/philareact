// pages/index.tsx
'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from 'next-auth/react';


import { CalendarIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';


const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
          <section className="py-16 px-4 flex justify-center">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-center md:text-left max-w-4xl">
              
              {/* Right Column: Logo */}
              <div className="col-span-1 ">
                <div className="relative w-96 h-96 mx-auto md:mx-0">
                  <Image
                    src="/philly-react-4.png" // Ensure to replace with your actual logo path
                    alt="PhilaReact Logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>


              {/* Left Column: Text and Buttons */}
                <div className="col-span-1">
                <h1 className="text-4xl md:text-4xl font-bold">
                  <span className="font-semibold font-xl text-dark-slate-200">Welcome to PhilaReact</span>
                </h1>
                <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto md:mx-0">
                  A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.
                </p>
                <div className="mt-6 flex justify-center md:justify-start space-x-4">
                  {session && status !== 'authenticated' && (
                  <button onClick={() => signIn()}
                      className="px-6 py-3 font-semibold bg-gradient-to-b from-deep-sapphire-500 to-deep-sapphire-600 text-white rounded-lg transition transform hover:scale-105 duration-300 hover:from-deep-sapphire-600 hover:to-deep-sapphire-700"      >
                    Join the Community
                  </button>
                  )}
                </div>
              </div>


            </div>
          </section>

          


      {/* About Section */}
      <section className="py-16 px-4 bg-dark-slate-600 animate-fade-in-up">
        <div className="container mx-auto text-center">
          <h2 className="text-lg font-semibold mt-4 max-w-4xl mx-auto">
            PhilaReact is a community where developers meet to discuss and share knowledge on React, 
            Next.js, and JavaScript technologies. We host regular meetups, provide resources, 
            and offer a forum for developers to connect.
          </h2>
        </div>
      </section>

 {/* Featured Content Section */}
 <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Explore PhilaReact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Events */}
            <div className="bg-dark-slate-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-8 w-8 text-deep-sapphire-500 mr-4" />
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
              </div>
              <p className=" mt-2">
                Check out the latest meetups and events we have in store for the React community in Philly.
              </p>
              <Link href="/events">
                <div className="text-deep-sapphire-500 font-semibold mt-4 inline-block hover:underline transition-colors">
                  View Events →
                </div>
              </Link>
            </div>

            {/* Card 2 - Articles */}
            <div className="bg-dark-slate-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-8 w-8 text-deep-sapphire-500 mr-4" />
                <h3 className="text-xl font-semibold">Popular Articles</h3>
              </div>
              <p className=" mt-2">
                Discover some of the most popular articles written by Philly developers on React and Next.js.
              </p>
              <Link href="/articles">
                <div className="text-deep-sapphire-500 mt-4 font-semibold inline-block hover:underline transition-colors">
                  Read Articles →
                </div>
              </Link>
            </div>

            {/* Card 3 - Forum */}
            <div className="bg-dark-slate-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-deep-sapphire-500 mr-4" />
                <h3 className="text-xl font-semibold">Join the Forum</h3>
              </div>
              <p className=" mt-2">
                Connect with fellow developers in our forum. Share your questions, knowledge, and projects.
              </p>
              <Link href="/forum">
                <div className="text-deep-sapphire-500 mt-4 font-semibold inline-block hover:underline transition-colors">
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
