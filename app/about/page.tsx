'use client';

import { Button } from '../../components/ui/button';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-left relative">
        <h1 className="text-4xl font-extrabold text-pink-500 z-10">About Photobooth</h1>
        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          I love photobooths, they capture the best candid moments! But since we can&apos;t always find one nearby, I built this app to bring the experience to Mianna! 🎁
        </p>
        
        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          This website is a special gift for Mianna, designed to create fun and memorable photobooth moments. Whether you&apos;re taking solo pictures or goofing off with friends, this app lets you capture those moments without waiting or spending a dime! No more waiting for your pictures—just smile, click, and you&apos;re good to go!
        </p>
        
        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          It&apos;s a fun, personal project that recreates that classic photobooth vibe: stacked photos, a little text overlay, and an easy way to save your snapshots. Whether you&apos;re striking a pose solo, goofing around with friends, or capturing cute couple pics, this app gives you the classic photobooth experience right in your browser. No coins, no waiting, just fun!
        </p>
        
        <Button
          className="mt-8 rounded-full bg-[#FF6F61] text-white py-3 px-10 text-xl font-semibold transition-colors hover:bg-[#D45746] mx-auto z-10"
          onClick={() => alert("Enjoy the Photobooth!")}
        >
          START NOW
        </Button>
      </main>

      <footer className="row-start-3 flex justify-center items-center text-footer-text text-sm sm:text-base z-10">
        <p>made by <a href="https://github.com/andriesnrr" className="text-accent" target="_blank" rel="noopener noreferrer">andriesnrr</a> ❤️</p>
      </footer>
    </div>
  );
}
