const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <footer className=" bg-dark-slate-900 py-6 text-center">
        <p className="text-sm text-gray-300">© {currentYear} Phila React. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  