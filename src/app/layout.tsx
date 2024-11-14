// layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: 'PhilaReact',
  description: 'A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    title: 'PhilaReact',
    description: 'A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.',
    url: 'https://philareact.org',
    images: [{ url: 'https://philareact.s3.us-east-2.amazonaws.com/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhilaReact',
    description: 'A community for React, Next.js, and JavaScript enthusiasts in Philadelphia.',
    images: [
      'https://philareact.s3.us-east-2.amazonaws.com/PhilaReact-Background-3.png',
      'https://philareact.s3.us-east-2.amazonaws.com/og-image.png',
    ],
  },
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
            <main className="dark flex-grow bg-dark-slate-950 pt-[72px]">{children}</main>
            <Footer />
          </div>
          <BugButton />
          <Toaster theme="dark" position="bottom-right" />
        </ClientSessionProvider>
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      </body>
    </html>
  );
}
