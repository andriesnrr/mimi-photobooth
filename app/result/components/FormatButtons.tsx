import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FormatButtonsProps {
  currentFormat: 'portrait' | 'landscape';
  onDownload: (format: 'portrait' | 'landscape') => void;
}

export const FormatButtons: React.FC<FormatButtonsProps> = ({
  currentFormat,
  onDownload
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      {['portrait', 'landscape'].map((format) => (
        <motion.div
          key={format}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className={`rounded-full py-3 px-10 text-xl font-semibold transition-colors w-full
              ${currentFormat === format 
                ? 'bg-[#FF6F61] text-white hover:bg-[#D45746]' 
                : 'bg-pink-100 text-pink-500 hover:bg-pink-200'}`}
            onClick={() => onDownload(format as 'portrait' | 'landscape')}
          >
            {format.charAt(0).toUpperCase() + format.slice(1)}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};