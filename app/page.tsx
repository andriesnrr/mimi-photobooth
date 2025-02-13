'use client';

import { Button } from '../components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-background p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center text-center sm:text-left relative">
        <motion.h1
          className="text-6xl font-extrabold text-pink-500 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          mianna photobooth
        </motion.h1>

        <p className="text-xl text-accent-foreground z-10 mt-8 text-center max-w-md mx-auto">
          You&apos;re the avocado to my toast!
        </p>

        <Link href="/welcome">
          <Button
            className="mt-8 rounded-full bg-[#FF6F61] text-white py-3 px-10 text-xl font-semibold transition-colors hover:bg-[#D45746] mx-auto z-10"
          >
            START
          </Button>
        </Link>
      </main>

      <footer className="row-start-3 flex justify-center items-center text-footer-text text-sm sm:text-base z-10">
        <p>made by <a href="https://github.com/andriesnrr" className="text-accent" target="_blank" rel="noopener noreferrer">andriesnrr</a> ❤️</p>
      </footer>
    </div>
  );
}