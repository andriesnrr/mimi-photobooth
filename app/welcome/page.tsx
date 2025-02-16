'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

interface StripOption {
  count: number;
  label: string;
  description: string;
}

const stripOptions: StripOption[] = [
  {
    count: 1,
    label: "Single Shot",
    description: "Perfect for a quick profile picture"
  },
  {
    count: 2,
    label: "Double Strip",
    description: "Before & after moments"
  },
  {
    count: 3,
    label: "Triple Strip",
    description: "Tell a story in three shots"
  },
  {
    count: 4,
    label: "Quad Strip",
    description: "Capture more memories"
  }
];

export default function Welcome() {
  const router = useRouter();

  const handleStripSelection = (photoCount: number) => {
    localStorage.setItem('photoCount', photoCount.toString());
    router.push('/canvas');
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 md:p-8 lg:p-12 bg-white">
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-pink-500 text-center mb-8"
      >
        mianna photobooth
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl text-center text-gray-700 max-w-2xl mx-auto mb-12"
      >
        Choose how many photos you'd like in your strip
      </motion.p>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {stripOptions.map((option) => (
          <motion.button
            key={option.count}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-pink-50 rounded-xl p-6 text-left hover:bg-pink-100 transition-colors border-2 border-pink-200 group"
            onClick={() => handleStripSelection(option.count)}
          >
            <div className="flex items-start gap-4">
              <div className="bg-pink-500 rounded-full p-3 group-hover:bg-[#FF6F61] transition-colors">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-500 mb-2">{option.label}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}