import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import ClientSessionProvider from "../components/context/ClientSessionProvider";
import { ThemeProvider } from "../components/context/ThemeProvider";
import { Toaster } from "sonner";
import FloatingButton from "../components/FloatingButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "PhilaReact",
  description: "A community for React, Next.js, and JavaScript enthusiasts in Philadelphia."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <ClientSessionProvider>
            <div className="flex flex-col min-h-screen dark">
              <Navbar />
              <main className="dark flex-grow bg-dark-slate-950 md:pt-[72px]">{children}</main>
              <Footer />
            </div>
            <FloatingButton />
            <Toaster theme="dark" position="bottom-right" />
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
