'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className='flex items-center'>
          <Image src="/philly-react3.png" alt="React Bell Logo" width={64} height={64} className="mr-2 py-0" />
          <span className="text-2xl font-bold text-blue-950">PhilaReact</span>
        </Link>
        <div className="hidden md:flex align-center space-x-8">
          <Link href="/news" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Articles</Link>
          <Link href="/events" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Events</Link>
          <Link href="/forum" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Forum</Link>
          <Link href="/resources" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Resources</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {status === 'authenticated' ? (
            <>
              <span className="mx-2">Hello, {session.user?.name}</span>
              <button onClick={() => signOut()} className="button text-blue-500 border border-blue-500 rounded py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="button text-blue-500 border border-blue-500 rounded py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none mr-4">
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2xl" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 p-4 absolute top-20 left-0 w-full h-[calc(100vh-4rem)] z-50 flex flex-col items-center justify-center">
          <Link href="/news" className="text-gray-700 text-2xl hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4" onClick={toggleMobileMenu}>Articles</Link>
          <Link href="/events" className="text-gray-700 text-2xl hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4" onClick={toggleMobileMenu}>Events</Link>
          <Link href="/forum" className="text-gray-700 text-2xl hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4" onClick={toggleMobileMenu}>Forum</Link>
          <Link href="/resources" className="text-gray-700 text-2xl hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300 mb-4" onClick={toggleMobileMenu}>Resources</Link>
          {status === 'authenticated' ? (
            <>
              <span className="text-gray-700 text-2xl mb-4">Hello, {session.user?.name}</span>
              <button onClick={() => { signOut(); toggleMobileMenu(); }} className="button text-blue-500 border text-2xl border-blue-500 rounded py-3 px-6 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => { signIn(); toggleMobileMenu(); }} className="button text-blue-500 border border-blue-500 rounded py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
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