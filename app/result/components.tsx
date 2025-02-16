import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FrameColor, StickerOption } from './types';

export const ColorSelector = ({
  colors,
  selectedColor,
  onColorSelect
}: {
  colors: FrameColor[];
  selectedColor: FrameColor;
  onColorSelect: (color: FrameColor) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-50 rounded-xl">
    <p className="w-full text-center text-gray-600 mb-2">Choose Frame Color</p>
    {colors.map((color) => (
      <button
        key={color.name}
        onClick={() => onColorSelect(color)}
        className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
          selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-pink-500 scale-110' : ''
        }`}
        style={{
          background: `linear-gradient(45deg, ${color.primary}, ${color.secondary})`
        }}
        title={color.name}
      />
    ))}
  </div>
);

export const StickerSelector = ({
  stickers,
  onStickerSelect
}: {
  stickers: StickerOption[];
  onStickerSelect: (type: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-50 rounded-xl">
    <p className="w-full text-center text-gray-600 mb-2">Add Stickers</p>
    {stickers.map((sticker) => (
      <button
        key={sticker.type}
        onClick={() => onStickerSelect(sticker.type)}
        className="p-2 hover:bg-pink-50 rounded-full transition-colors"
      >
        {sticker.icon}
      </button>
    ))}
  </div>
);

export const FormatButtons = ({
  currentFormat,
  onDownload
}: {
  currentFormat: 'portrait' | 'landscape';
  onDownload: (format: 'portrait' | 'landscape') => void;
}) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className={`rounded-full py-3 px-10 text-xl font-semibold transition-colors
          ${currentFormat === 'portrait' 
            ? 'bg-[#FF6F61] text-white hover:bg-[#D45746]' 
            : 'bg-pink-100 text-pink-500 hover:bg-pink-200'}`}
        onClick={() => onDownload('portrait')}
      >
        Portrait
      </Button>
    </motion.div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className={`rounded-full py-3 px-10 text-xl font-semibold transition-colors
          ${currentFormat === 'landscape' 
            ? 'bg-[#FF6F61] text-white hover:bg-[#D45746]' 
            : 'bg-pink-100 text-pink-500 hover:bg-pink-200'}`}
        onClick={() => onDownload('landscape')}
      >
        Landscape
      </Button>
    </motion.div>
  </div>
);