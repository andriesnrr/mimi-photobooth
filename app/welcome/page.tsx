'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Camera, Smartphone, Monitor } from 'lucide-react';
import { useState } from 'react';

type Format = 'portrait' | 'landscape';
type StripOption = 1 | 2 | 3 | 4;

interface FormatCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const FormatCard: React.FC<FormatCardProps> = ({ 
  title, 
  description, 
  icon, 
  selected, 
  onClick 
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full p-6 rounded-xl text-left transition-all ${
      selected 
        ? 'bg-pink-500 text-white shadow-lg scale-[1.02]' 
        : 'bg-pink-50 text-gray-800 hover:bg-pink-100'
    }`}
    onClick={onClick}
  >
    <div className="flex items-start gap-4">
      <div className={`rounded-full p-3 ${selected ? 'bg-white/20' : 'bg-pink-200'}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={selected ? 'text-white/90' : 'text-gray-600'}>{description}</p>
      </div>
    </div>
  </motion.button>
);

interface StripCardProps {
  count: StripOption;
  label: string;
  description: string;
  onClick: () => void;
}

const StripCard: React.FC<StripCardProps> = ({ count, label, description, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-pink-50 rounded-xl p-6 text-left hover:bg-pink-100 transition-colors border-2 border-pink-200 group"
    onClick={onClick}
  >
    <div className="flex items-start gap-4">
      <div className="bg-pink-500 rounded-full p-3 group-hover:bg-[#FF6F61] transition-colors">
        <Camera className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-pink-500 mb-2">{label}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </motion.button>
);

export default function Welcome() {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);

  const handleStripSelection = (count: StripOption) => {
    if (selectedFormat) {
      localStorage.setItem('photoCount', count.toString());
      localStorage.setItem('photoFormat', selectedFormat);
      router.push('/canvas');
    }
  };

  const formatOptions = [
    {
      title: 'Portrait Mode',
      description: 'Perfect for Instagram Stories and vertical displays (9:16)',
      icon: <Smartphone className="w-6 h-6" />,
      value: 'portrait' as Format
    },
    {
      title: 'Landscape Mode',
      description: 'Ideal for regular photos and horizontal displays (16:9)',
      icon: <Monitor className="w-6 h-6" />,
      value: 'landscape' as Format
    }
  ];

  const stripOptions: Array<{ count: StripOption; label: string; description: string }> = [
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

  return (
    <div className="min-h-screen w-full px-4 py-8 md:p-8 lg:p-12 bg-white">
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-pink-500 text-center mb-8"
      >
        mianna photobooth
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Format Selection */}
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-center text-gray-700 mb-8"
          >
            Choose your preferred format
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formatOptions.map((format) => (
              <FormatCard
                key={format.value}
                title={format.title}
                description={format.description}
                icon={format.icon}
                selected={selectedFormat === format.value}
                onClick={() => setSelectedFormat(format.value)}
              />
            ))}
          </div>
        </div>

        {/* Strip Selection */}
        {selectedFormat && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl text-center text-gray-700 mb-8">
              How many photos would you like?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stripOptions.map((option) => (
                <StripCard
                  key={option.count}
                  count={option.count}
                  label={option.label}
                  description={option.description}
                  onClick={() => handleStripSelection(option.count)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}