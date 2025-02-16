import { motion } from 'framer-motion';
import { StickerOption } from '../types';

interface StickerSelectorProps {
  stickers: StickerOption[];
  onStickerSelect: (type: string) => void;
}

export const StickerSelector: React.FC<StickerSelectorProps> = ({
  stickers,
  onStickerSelect
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {stickers.map((sticker) => (
        <motion.button
          key={sticker.type}
          onClick={() => onStickerSelect(sticker.type)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full hover:bg-pink-50 transition-colors"
          style={{ color: sticker.color }}
        >
          {sticker.icon}
        </motion.button>
      ))}
    </div>
  );
};