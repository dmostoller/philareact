import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-slate-900 py-6 text-center">
      <p className="text-sm text-dark-slate-300">© {currentYear} Phila React. All rights reserved.</p>
      <p className="text-sm text-dark-slate-300">
        <Link href="/privacy-policy">
          <span className="text-dark-slate-300 hover:text-dark-slate-50">Privacy Policy</span>
        </Link>
        {" | "}
        <Link href="/terms-of-service">
          <span className="text-dark-slate-300 hover:text-dark-slate-50">Terms of Service</span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
