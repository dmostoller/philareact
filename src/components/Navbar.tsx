'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HomeIcon } from './icons/home';
import { usePathname } from 'next/navigation';
import { UserIcon } from './icons/user';
import { LogoutIcon } from './icons/logout';
import { MenuIcon } from './icons/menu';
import { GripIcon } from './icons/grip';
import ThemePopup from './ThemePopup';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isThemePopupOpen, setIsThemePopupOpen] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Get theme from cookie
    const cookieTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1];

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (theme: string) => {
      document.documentElement.setAttribute('data-theme', theme);
      setCurrentTheme(theme);
      document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    };

    const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (!cookieTheme) {
        const systemTheme = e.matches ? 'default' : 'light';
        applyTheme(systemTheme);
      }
    };

    if (cookieTheme) {
      applyTheme(cookieTheme);
    } else {
      handleSystemThemeChange(mediaQuery);
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Show navbar if scrolling up or at top of page
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    setCurrentTheme(theme);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const linkClasses = (href: string) =>
    `mx-2 text-dark-slate-100 hover:border-b-2 hover:border-dark-slate-50 hover:text-dark-slate-50 hover:px-4 py-1 transition-all duration-300 font-semibold ${
      isActive(href) ? 'border-b-2 border-dark-slate-50 px-4 text-dark-slate-50' : ''
    }`;

  const mobileLinkClasses = (href: string) => `${linkClasses(href)} text-3xl my-4 block`;

  return (
    <nav
      className={`p-4 shadow bg-dark-slate-900 transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 md:w-full z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto w-full flex justify-between items-center">
        <div className="flex items-start">
          <Link href="/" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
            <HomeIcon />
          </Link>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setIsThemePopupOpen(true)}
              className="transition-colors"
              aria-label="Open theme selector"
            >
              <GripIcon />
            </button>
            <ThemePopup
              isOpen={isThemePopupOpen}
              onClose={() => setIsThemePopupOpen(false)}
              onSelectTheme={handleThemeChange}
              currentTheme={currentTheme}
            />
          </div>
        </div>
        <div className="hidden md:flex align-center space-x-8">
          <Link href="/news" className={linkClasses('/news')}>
            Articles
          </Link>
          <Link href="/events" className={linkClasses('/events')}>
            Events
          </Link>
          <Link href="/forum" className={linkClasses('/forum')}>
            Forum
          </Link>
          <Link href="/resources" className={linkClasses('/resources')}>
            Resources
          </Link>
          <Link href="/contribute" className={linkClasses('/contribute')}>
            Contribute
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {session ? (
            <>
              <Link href="/dashboard">
                <UserIcon />
              </Link>
              <div onClick={handleSignOut} className="cursor-pointer">
                <LogoutIcon />
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-2 button
                text-dark-slate-100
                hover:border-b-2
                hover:border-dark-slate-50
                hover:text-dark-slate-50
                hover:px-4
                transition-all duration-300
                py-1
                font-semibold
                flex
                items-center"
            >
              <LogIn className="mr-2" />
              Login
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-slate-900 p-4 absolute top-18 left-0 w-full h-[calc(100vh-2rem)] z-50 flex flex-col items-center pt-12">
          <Link href="/news" className={mobileLinkClasses('/news')} onClick={toggleMobileMenu}>
            Articles
          </Link>
          <Link href="/events" className={mobileLinkClasses('/events')} onClick={toggleMobileMenu}>
            Events
          </Link>
          <Link href="/forum" className={mobileLinkClasses('/forum')} onClick={toggleMobileMenu}>
            Forum
          </Link>
          <Link href="/resources" className={mobileLinkClasses('/resources')} onClick={toggleMobileMenu}>
            Resources
          </Link>
          <Link href="/contribute" className={mobileLinkClasses('/contribute')} onClick={toggleMobileMenu}>
            Contribute
          </Link>
          {status === 'authenticated' ? (
            <div className="flex flex-row items-center space-x-4 mt-8">
              <Link href="/dashboard" onClick={toggleMobileMenu}>
                <UserIcon />
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
                handleSignOut();
                toggleMobileMenu();
              }}
              className="mt-8 px-2 button text-dark-slate-100 hover:border-b-2 hover:border-foreground hover:text-foreground hover:px-4 flex
                items-center transition-all duration-300 py-1 text-3xl font-semibold"
            >
              <LogIn className="mr-2 w-8 h-8" />
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
