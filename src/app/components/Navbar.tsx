"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon } from "./icons/home";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const linkClasses = (href: string) =>
    `mx-2 text-gray-300 hover:border-b-2 hover:border-white hover:text-white hover:px-4 py-1 transition-all duration-300 font-semibold ${
      isActive(href) ? "border-b-2 border-white px-4 text-white" : ""
    }`;
  return (
    <nav className="p-4 shadow bg-dark-slate-900">
      <div className="mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <HomeIcon />
        </Link>
        <div className="hidden md:flex align-center space-x-8">
          <Link href="/news" className={linkClasses("/news")}>
            Articles
          </Link>
          <Link href="/events" className={linkClasses("/events")}>
            Events
          </Link>
          <Link href="/forum" className={linkClasses("/forum")}>
            Forum
          </Link>
          <Link href="/resources" className={linkClasses("/resources")}>
            Resources
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {status === "authenticated" ? (
            <>
              <button
                onClick={() => signOut()}
                className="px-2 button
                text-gray-300
                hover:border-b-2
                hover:border-white
                hover:text-white
                py-1
                font-semibold"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-2 button
                text-gray-300
                hover:border-b-2
                hover:border-white
                hover:text-white
                py-1
                font-semibold"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-dark-slate-100 focus:outline-none mr-4">
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2xl" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-slate-900 p-4 absolute top-20 left-0 w-full h-[calc(100vh-4rem)] z-50 flex flex-col items-center justify-center">
          <Link
            href="/news"
            className={`text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold ${
              isActive("/news") ? "bg-dark-slate-500 rounded-full px-4" : ""
            }`}
            onClick={toggleMobileMenu}
          >
            Articles
          </Link>
          <Link
            href="/events"
            className={`text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold ${
              isActive("/events") ? "bg-dark-slate-500 rounded-full px-4" : ""
            }`}
            onClick={toggleMobileMenu}
          >
            Events
          </Link>
          <Link
            href="/forum"
            className={`text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold ${
              isActive("/forum") ? "bg-dark-slate-500 rounded-full px-4" : ""
            }`}
            onClick={toggleMobileMenu}
          >
            Forum
          </Link>
          <Link
            href="/resources"
            className={`text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold ${
              isActive("/resources") ? "bg-dark-slate-500 rounded-full px-4" : ""
            }`}
            onClick={toggleMobileMenu}
          >
            Resources
          </Link>
          {status === "authenticated" ? (
            <>
              <span className="text-dark-slate-100 text-2xl font-semibold mb-4">
                Hello, {session.user?.name}
              </span>
              <button
                onClick={() => {
                  signOut();
                  toggleMobileMenu();
                }}
                className="button font-semibold text-blue-500 border-2 text-2xl border-blue-500 rounded-full py-3 px-6 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                signIn();
                toggleMobileMenu();
              }}
              className="button font-semibold text-blue-500 border-2 border-blue-500 rounded-full py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
