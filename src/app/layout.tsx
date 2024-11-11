// layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Head from 'next/head';
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="PhilaReact" />
        <meta
          property="og:description"
          content="A community for React, Next.js, and JavaScript enthusiasts in Philadelphia."
        />
        <meta property="og:url" content="https://philareact.org" />
        <meta property="og:image" content="https://philareact.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PhilaReact" />
        <meta
          name="twitter:description"
          content="A community for React, Next.js, and JavaScript enthusiasts in Philadelphia."
        />
        <meta name="twitter:image" content="https://philareact.com/PhilaReact-Background-3.png" />
        <meta
          name="twitter:description"
          content="A community for React, Next.js, and JavaScript enthusiasts in Philadelphia."
        />
        <meta name="twitter:image" content="https://philareact.com/og-image.png" />
      </Head>
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
