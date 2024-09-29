import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary flex items-center">
          <Image src="/philly-react3.png" alt="React Bell Logo" width={64} height={64} className="mr-2 py-0" />
          {/* Philly React */}
        </Link>
        <div className="flex space-x-4">
          <Link href="/news" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">News</Link>
          <Link href="/events" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Events</Link>
          <Link href="/forum" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Forum</Link>
          <Link href="/resources" className="mx-2 text-gray-700 hover:bg-gray-200 hover:rounded-full hover:px-4 py-2 transition-all duration-300">Resources</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;