import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-slate-900 py-6 text-center">
      <p className="text-sm text-gray-300">© {currentYear} Phila React. All rights reserved.</p>
      <p className="text-sm text-gray-300">
        <Link href="/privacy-policy">
          <span className="text-gray-300 hover:text-gray-100">Privacy Policy</span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
