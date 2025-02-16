'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full px-4 py-8 md:p-8 lg:p-12 bg-white">
      <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full max-w-2xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <div className="bg-pink-500 rounded-full p-6 mb-8">
              <Camera className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-pink-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            mianna photobooth
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            You&apos;re the avocado to my toast!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center w-full"
          >
            <Link href="/welcome">
              <Button
                className="rounded-full bg-[#FF6F61] text-white py-3 px-12 text-xl font-semibold transition-colors hover:bg-[#D45746] flex items-center gap-2"
              >
                <span>START</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center text-gray-600 py-4"
      >
        <p>
          made by{' '}
          <a
            href="https://github.com/andriesnrr"
            className="text-pink-500 hover:text-[#FF6F61] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            andriesnrr
          </a>{' '}
          ❤️
        </p>
      </motion.footer>
    </div>
  );
}