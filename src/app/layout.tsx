// layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import ClientSessionProvider from '../components/context/ClientSessionProvider';
import { Toaster } from 'sonner';
import BugButton from '../components/BugButton';
import { cookies } from 'next/headers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'PhilaReact',
  description: 'A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const initialTheme = theme?.value || 'default';

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientSessionProvider>
          <div className="flex flex-col min-h-screen dark">
            <Navbar />
            <main className="dark flex-grow bg-dark-slate-950 md:pt-[72px]">{children}</main>
            <Footer />
          </div>
          <BugButton />
          <Toaster theme="dark" position="bottom-right" />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
