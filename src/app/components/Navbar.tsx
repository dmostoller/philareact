'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HomeIcon } from './icons/home';


const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="p-4 shadow bg-dark-slate-900">
      <div className="mx-auto w-full flex justify-between items-center">
        <Link href="/" className='flex items-center'>
          {/* <Image src="/philly-react3.png" alt="React Bell Logo" width={64} height={64} className="mr-2 py-0" /> */}
          <HomeIcon />
          <span className="text-2xl font-bold">PhilaReact</span>
        </Link>
        <div className="hidden md:flex align-center space-x-8">
          <Link href="/news" className="mx-2 text-gray-300 dark:text-gray-300 hover:bg-dark-slate-500 dark:hover:bg-dark-slate-700 hover:rounded-full hover:px-4 py-2 transition-all duration-300 font-semibold">Articles</Link>
          <Link href="/events" className="mx-2 text-gray-300 dark:text-gray-300 hover:bg-dark-slate-500 dark:hover:bg-dark-slate-700 hover:rounded-full hover:px-4 py-2 transition-all duration-300 font-semibold">Events</Link>
          <Link href="/forum" className="mx-2 text-gray-300 dark:text-gray-300 hover:bg-dark-slate-500 dark:hover:bg-dark-slate-700 hover:rounded-full hover:px-4 py-2 transition-all duration-300 font-semibold">Forum</Link>
          <Link href="/resources" className="mx-2 text-gray-300 dark:text-gray-300 hover:bg-dark-slate-500 dark:hover:bg-dark-slate-700 hover:rounded-full hover:px-4 py-2 transition-all duration-300 font-semibold">Resources</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {status === 'authenticated' ? (
            <>
              <button onClick={() => signOut()} 
              className="button flex items-center  text-gray-300 dark:text-gray-300 hover:bg-dark-slate-500 dark:hover:bg-dark-slate-700 hover:rounded-full hover:px-4 py-2 transition-all duration-300 font-semibold"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Logout
              </button>
              {/* <SettingsGearIcon /> */}
            </>
          ) : (
            <button onClick={() => signIn()} 
              className="button flex items-center  text-gray-300 dark:text-gray-300 hover:bg-dark-slate-500 dark:hover:bg-dark-slate-700 hover:rounded-full hover:px-4 py-2 transition-all duration-300 font-semibold"
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
          <Link href="/news" className="text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold" onClick={toggleMobileMenu}>Articles</Link>
          <Link href="/events" className="text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold" onClick={toggleMobileMenu}>Events</Link>
          <Link href="/forum" className="text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold" onClick={toggleMobileMenu}>Forum</Link>
          <Link href="/resources" className="text-dark-slate-100 text-2xl hover:bg-dark-slate-500 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4 font-semibold" onClick={toggleMobileMenu}>Resources</Link>
          {status === 'authenticated' ? (
            <>
              <span className="text-dark-slate-100 text-2xl font-semibold mb-4">Hello, {session.user?.name}</span>
              <button onClick={() => { signOut(); toggleMobileMenu(); }} className="button font-semibold text-blue-500 border-2 text-2xl border-blue-500 rounded-full py-3 px-6 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => { signIn(); toggleMobileMenu(); }} className="button font-semibold text-blue-500 border-2 border-blue-500 rounded-full py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
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