import { ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mianna Photobooth",
  description: "Your go-to fun photobooth app!",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="w-full flex justify-center items-center sm:px-20 py-5">
          <nav className="flex gap-8 text-lg font-semibold text-primary-foreground">
            <Link href="/" className="hover:text-accent transition-all duration-200">Home</Link>
            <Link href="/about" className="hover:text-accent transition-all duration-200">About</Link>
            <Link href="/privacy-policy" className="hover:text-accent transition-all duration-200">Privacy Policy</Link>
          </nav>
        </header>

        {children} {/* This renders the page content */}
      </body>
    </html>
  );
}
