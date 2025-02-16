import { motion } from 'framer-motion';
import { FrameColor } from '../types';

interface ColorSelectorProps {
  colors: FrameColor[];
  selectedColor: FrameColor;
  onColorSelect: (color: FrameColor) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {colors.map((color) => (
        <motion.button
          key={color.name}
          onClick={() => onColorSelect(color)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full transition-all ${
            selectedColor.name === color.name 
              ? 'ring-4 ring-offset-2 ring-pink-500 scale-110' 
              : 'hover:ring-2 hover:ring-pink-200'
          }`}
          style={{
            background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`
          }}
          title={color.name}
        />
      ))}
    </div>
  );
};