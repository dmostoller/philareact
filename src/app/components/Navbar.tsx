'use client'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useSession, signIn, signOut } from 'next-auth/react';


const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src="/philly-react3.png" alt="React Bell Logo" width={64} height={64} className="mr-2 py-0" />
        </Link>
        <div className="flex align-center space-x-8">
          <Link href="/news" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Articles</Link>
          <Link href="/events" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Events</Link>
          <Link href="/forum" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Forum</Link>
          <Link href="/resources" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Resources</Link>
        </div>
        <div className="flex items-center space-x-4">
        {status === 'authenticated' ? (
          <>
          <span className="mx-2">Hello, {session.user?.name}</span>
          <button onClick={() => signOut()} className="button text-blue-500 border border-blue-500 rounded-full py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Logout
          </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="button text-blue-500 border border-blue-500 rounded-full py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </button>
        )}
       
        {/* <Link href="/register" className="button text-blue-500 border border-blue-500 rounded-full py-2 px-4 transition-all duration-300 flex items-center hover:bg-blue-500 hover:text-white">
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Register
        </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;