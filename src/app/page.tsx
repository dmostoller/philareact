"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import PrimaryButton from "./../components/PrimaryButton";

import { CalendarIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className="min-h-screen">
      <section className="py-16 px-4 flex justify-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-center md:text-left max-w-4xl">
          <div className="col-span-1 ">
            <div className="relative w-96 h-96 mx-auto md:mx-0">
              <Image
                src="/philly-react-4.png"
                alt="PhilaReact Logo"
                width={400}
                height={400}
                objectFit="contain"
                className="rounded-full"
              />
            </div>
          </div>

          <div className="col-span-1">
            <h1 className="text-4xl md:text-4xl font-bold">
              {status === "authenticated" && (
                <div className="text-dark-slate-100 text-2xl font-semibold mb-4">
                  Hello, {session.user?.name}
                </div>
              )}
              <span className="font-semibold font-xl text-dark-slate-200">Welcome to PhilaReact</span>
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto md:mx-0">
              A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.
            </p>
            <div className="mt-6 flex justify-center md:justify-start space-x-4">
              {session ? (
                <Link href="/dashboard">
                  <PrimaryButton className="transition transform hover:scale-105 duration-300">
                    Go to Dashboard
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
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-dark-slate-700">
        <div className="container mx-auto">
          <div className="mx-auto p-6 border border-dark-slate-500 shadow-lg rounded-2xl bg-dark-slate-600">
            <h2 className="text-2xl font-bold mb-4 text-center">How PhilaReact Works</h2>
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
              We request your Google account information to personalize your experience and allow you to
              participate in community activities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Explore PhilaReact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-slate-600 border border-dark-slate-500 p-6 rounded-lg shadow-lg">
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
            <div className="bg-dark-slate-600 border border-dark-slate-500 p-6 rounded-lg shadow-lg">
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
            <div className="bg-dark-slate-600 border border-dark-slate-500 p-6 rounded-lg shadow-lg">
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
              <br></br>Please review our
              <Link href="/privacy-policy">
                <span className="underline"> Privacy Policy </span>
              </Link>
              for more details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
