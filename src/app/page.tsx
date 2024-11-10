'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import PrimaryButton from './../components/PrimaryButton';

import { CalendarIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import DecorativeElements from '@/components/DecorativeElements';

const Home = () => {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen">
      <DecorativeElements />
      <section className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="mx-auto max-w-screen-2xl absolute inset-0 w-full h-full mt-4">
          <Image
            src="/PhilaReact-Background-3.png"
            alt="PhilaReact Background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay for better text clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-16 lg:px-32 py-36 md:py-72 flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {status === 'authenticated' && (
              <div className="fade-in-up fade-in-up-delay-1 text-white text-2xl font-semibold mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
                Welcome back, {session.user?.name}!
              </div>
            )}
            <span className="fade-in-up fade-in-up-delay-2 font-semibold font-xl text-white [text-shadow:_0_4px_6px_rgb(0_0_0_/_50%)]">
              Welcome to PhilaReact
            </span>
          </h1>
          <p className="fade-in-up fade-in-up-delay-2 text-md mt-2 text-white opacity-75 [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
            Philadelphia | React Community
          </p>
          <p className="fade-in-up fade-in-up-delay-2 text-lg md:text-xl mx-2 md:mx-0 mt-6 max-w-xl text-white text-center md:text-left font-medium [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
            A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.
          </p>
          <div className="fade-in-up fade-in-up-delay-2 mt-8 space-x-4">
            {session ? (
              <Link href="/forum">
                <PrimaryButton className="transition transform hover:scale-105 duration-300">
                  Join the Discussion
                </PrimaryButton>
              </Link>
            ) : (
              <PrimaryButton
                onClick={() => signIn()}
                className="transition transform hover:scale-105 duration-300"
              >
                Join the Community
              </PrimaryButton>
            )}
          </div>
          {!session && (
            <p className="fade-in-up fade-in-up-delay-2 text-sm mt-6 text-white opacity-75 text-center md:text-left">
              Join Philly&apos;s top React developers.
            </p>
          )}
        </div>
      </section>

      <section className="py-10 px-2">
        <div className="container mx-auto">
          <div className="w-full lg:max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Who We Are</h2>
            <h2 className="text-lg font-semibold mt-4 mb-4 text-center">
              PhilaReact is a community where developers meet to discuss and share knowledge on React,
              Next.js, and JavaScript technologies.
            </h2>
            <ul className="list-disc list-inside text-lg mb-4 px-4 text-center">
              <li>Join and participate in community meetups</li>
              <li>Access and share resources on React, Next.js, and JavaScript</li>
              <li>Engage in discussions and ask questions in the forum</li>
              <li>Stay updated with the latest news and articles</li>
              <li>Develop the website and build the community space together</li>
            </ul>
            <p className="text-lg px-4 text-center">
              Ready to connect with fellow React developers in Philadelphia? Join our growing community today!
            </p>
          </div>
        </div>
      </section>

      <section className="py-4 px-2">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore PhilaReact</h2>
          <div className="grid md:grid-cols-3 gap-8 w-full lg:max-w-6xl mx-auto">
            <div className="bg-dark-slate-800 border border-dark-slate-600 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-8 w-8 mr-4" />
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
              </div>
              <p className=" mt-2">
                Check out the latest meetups and events we have in store for the React community in Philly.
              </p>
              <Link href="/events">
                <div className="font-semibold mt-4 inline-block hover:underline transition-colors">
                  View Events →
                </div>
              </Link>
            </div>
            <div className="bg-dark-slate-800 border border-dark-slate-600 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-8 w-8 mr-4" />
                <h3 className="text-xl font-semibold">Popular Articles</h3>
              </div>
              <p className=" mt-2">
                Discover some of the most popular articles written by developers on React and Next.js.
              </p>
              <Link href="/news">
                <div className=" mt-4 font-semibold inline-block hover:underline transition-colors">
                  Read Articles →
                </div>
              </Link>
            </div>
            <div className="bg-dark-slate-800 border border-dark-slate-600 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftEllipsisIcon className="h-8 w-8 mr-4" />
                <h3 className="text-xl font-semibold">Join the Forum</h3>
              </div>
              <p className=" mt-2">
                Connect with fellow developers in our forum. Share your questions, knowledge, and projects.
              </p>
              <Link href="/forum">
                <div className=" mt-4 font-semibold inline-block hover:underline transition-colors">
                  Visit Forum →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-xl font-bold mb-4 text-center">Privacy Policy</h2>
            <p className="text-md mb-4">
              We value your privacy and are committed to protecting your personal information.
              <br></br>Please review our{' '}
              <Link href="/privacy-policy">
                <span className="underline">Privacy Policy</span>
              </Link>{' '}
              for more details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
