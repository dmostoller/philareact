"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon } from "./icons/home";
import { usePathname } from "next/navigation";
import { SettingsGearIcon } from "./icons";
import { LogoutIcon } from "./icons/logout";
import { MenuIcon } from "./icons/menu";
// import { SunIcon } from "./icons/sun";
// import { useTheme } from "../components/context/ThemeProvider";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // const { theme, toggleTheme } = useTheme();

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

  const mobileLinkClasses = (href: string) => `${linkClasses(href)} text-3xl my-4 block`;

  return (
    <nav className="p-4 shadow bg-dark-slate-900 transition-all duration-300 ease-in-out md:fixed md:top-0 md:left-0 md:right-0 md:w-full md:z-50">
      <div className="container mx-auto w-full flex justify-between items-center">
        <div className="flex items-start">
          <Link href="/">
            <HomeIcon />
          </Link>
          {/* <button onClick={toggleTheme} title={`Theme: ${theme}`}>
            <SunIcon />
          </button> */}
        </div>
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
          <Link href="/contribute" className={linkClasses("/contribute")}>
            Contribute
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {session ? (
            <>
              <Link href="/dashboard">
                <SettingsGearIcon />
              </Link>
              <div onClick={() => signOut()} className="cursor-pointer">
                <LogoutIcon />
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-2 button
                text-gray-300
                hover:border-b-2
                hover:border-white
                hover:text-white
                hover:px-4
                transition-all duration-300
                py-1
                font-semibold"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-dark-slate-100 focus:outline-none">
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-slate-900 p-4 absolute top-18 left-0 w-full h-[calc(100vh-2rem)] z-50 flex flex-col items-center justify-center">
          <Link href="/news" className={mobileLinkClasses("/news")} onClick={toggleMobileMenu}>
            Articles
          </Link>
          <Link href="/events" className={mobileLinkClasses("/events")} onClick={toggleMobileMenu}>
            Events
          </Link>
          <Link href="/forum" className={mobileLinkClasses("/forum")} onClick={toggleMobileMenu}>
            Forum
          </Link>
          <Link href="/resources" className={mobileLinkClasses("/resources")} onClick={toggleMobileMenu}>
            Resources
          </Link>
          <Link href="/contribute" className={mobileLinkClasses("/contribute")} onClick={toggleMobileMenu}>
            Contribute
          </Link>
          {status === "authenticated" ? (
            <div className="flex flex-row items-center space-x-4 mt-8">
              <Link href="/dashboard" onClick={toggleMobileMenu}>
                <SettingsGearIcon />
              </Link>
              <div
                onClick={() => {
                  signOut();
                  toggleMobileMenu();
                }}
                className="cursor-pointer"
              >
                <LogoutIcon />
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                signIn();
                toggleMobileMenu();
              }}
              className="mt-8 px-2 button
                text-gray-300
                hover:border-b-2
                hover:border-white
                hover:text-white
                hover:px-4
                flex
                items-center
                transition-all duration-300
                py-1
                text-3xl
                font-semibold"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2 w-8 h-8" />
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
