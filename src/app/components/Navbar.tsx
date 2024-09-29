import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-primary flex items-center">
      <Image src="/react-bell.jpg" alt="React Bell Logo" width={32} height={32} className="mr-2" />
      Philly React
        </Link>
        <div>
          <Link href="/news" className="mx-2 text-gray-700">News</Link>
          <Link href="/events" className="mx-2 text-gray-700">Events</Link>
          <Link href="/forum" className="mx-2 text-gray-700">Forum</Link>
          <Link href="/resources" className="mx-2 text-gray-700">Resources</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
