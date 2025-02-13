'use client';

import { Button } from '../../components/ui/button';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-left relative">
        <h1 className="text-4xl font-extrabold text-pink-500 z-10">Privacy Policy</h1>
        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          At Mianna Photobooth, we value your privacy! This privacy policy explains how we collect, use, and protect your personal information.
        </p>

        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          We may collect certain data (such as browser type, device information, and usage data) to enhance your experience and ensure the functionality of our app. However, we do not collect sensitive personal information such as your name, address, or payment details.
        </p>

        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          Your data will never be shared with third parties unless required by law. We prioritize your privacy and take necessary measures to protect the data we collect.
        </p>

        <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4">
          By using our app, you consent to the collection and use of your information as described in this policy.
        </p>

        {/* Call-to-Action */}
        <Button
          className="mt-8 rounded-full bg-[#FF6F61] text-white py-3 px-10 text-xl font-semibold transition-colors hover:bg-[#D45746] mx-auto z-10"
          onClick={() => alert("Thank you for reading the Privacy Policy!")}
        >
          GOT IT!
        </Button>
      </main>

      <footer className="row-start-3 flex justify-center items-center text-footer-text text-sm sm:text-base z-10">
        <p>made by <a href="https://github.com/andriesnrr" className="text-accent" target="_blank" rel="noopener noreferrer">andriesnrr</a> ❤️</p>
      </footer>
    </div>
  );
}
