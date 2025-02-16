import { useState, useEffect, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Sticker } from '../types';
import { availableStickers } from '../constants';

interface DraggableStickerProps {
  sticker: Sticker;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  onPositionUpdate: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  onRotate?: (id: string, rotation: number) => void;
  onScale?: (id: string, scale: number) => void;
}

export const DraggableSticker: React.FC<DraggableStickerProps> = ({
  sticker,
  containerRef,
  onPositionUpdate,
  onDelete,
  onRotate,
  onScale
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: sticker.x, y: sticker.y });
  const [rotation, setRotation] = useState(sticker.rotation);
  const [scale, setScale] = useState(sticker.scale);
  const [startGestureDistance, setStartGestureDistance] = useState<number | null>(null);

  const stickerInfo = availableStickers.find(s => s.type === sticker.type);

  useEffect(() => {
    setPosition({ x: sticker.x, y: sticker.y });
    setRotation(sticker.rotation);
    setScale(sticker.scale);
  }, [sticker]);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (info.point.x - rect.left) / rect.width;
    const y = (info.point.y - rect.top) / rect.height;
    
    const padding = 0.1;
    const boundedX = Math.max(padding, Math.min(1 - padding, x));
    const boundedY = Math.max(padding, Math.min(1 - padding, y));
    
    setPosition({ x: boundedX, y: boundedY });
    onPositionUpdate(sticker.id, boundedX, boundedY);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && startGestureDistance !== null) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const newDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      const scaleDiff = newDistance / startGestureDistance;
      const newScale = Math.max(0.5, Math.min(2, sticker.scale * scaleDiff));
      
      setScale(newScale);
      onScale?.(sticker.id, newScale);
      setStartGestureDistance(newDistance);
    }
  }, [startGestureDistance, sticker.scale, sticker.id, onScale]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setStartGestureDistance(distance);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setStartGestureDistance(null);
  }, []);

  const handleRotate = () => {
    const newRotation = (rotation + 45) % 360;
    setRotation(newRotation);
    onRotate?.(sticker.id, newRotation);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, handleTouchMove, handleTouchStart, handleTouchEnd]);

  if (!stickerInfo) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={handleDrag}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        position: 'absolute',
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 100 : 10,
      }}
      initial={false}
      className="touch-none select-none"
    >
      <div 
        className={`relative group ${isDragging ? 'opacity-80' : 'opacity-100'}`}
        onDoubleClick={() => onDelete(sticker.id)}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:flex gap-1">
          <button
            onClick={handleRotate}
            className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(sticker.id)}
            className="p-1 bg-white rounded-full shadow-md hover:bg-red-100"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div 
          className="w-12 h-12 flex items-center justify-center"
          style={{ color: stickerInfo.color }}
        >
          {stickerInfo.icon}
        </div>
      </div>
    </motion.div>
  );
};