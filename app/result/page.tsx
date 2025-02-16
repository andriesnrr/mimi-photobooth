'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { frameColors, availableStickers } from './constants';
import { ColorSelector, StickerSelector, FormatButtons } from './components';
import { DraggableSticker } from './components/DraggableSticker';
import { generatePortraitCanvas, generateLandscapeCanvas } from './utils/generator';
import type { FrameColor, Sticker } from './types';
import { Trash2 } from 'lucide-react';

export default function ResultPage() {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentFormat, setCurrentFormat] = useState<'portrait' | 'landscape'>(
    localStorage.getItem('photoFormat') as 'portrait' | 'landscape' || 'portrait'
  );
  const [selectedColor, setSelectedColor] = useState<FrameColor>(frameColors[0]);
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const regenerateCanvas = useCallback(async () => {
    const generateCanvas = currentFormat === 'landscape' ? generateLandscapeCanvas : generatePortraitCanvas;
    const url = await generateCanvas(photos, photoCount, timestamp, selectedColor, stickers);
    if (url) setPreviewUrl(url);
  }, [currentFormat, photos, photoCount, timestamp, selectedColor, stickers]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
        const savedTimestamp = localStorage.getItem('timestamp');
        const savedCount = parseInt(localStorage.getItem('photoCount') || '0');
        const savedFormat = localStorage.getItem('photoFormat') as 'portrait' | 'landscape';

        if (savedPhotos.length > 0 && savedCount > 0) {
          setPhotos(savedPhotos);
          setPhotoCount(savedCount);
          setCurrentFormat(savedFormat || 'portrait');
          setTimestamp(savedTimestamp || new Date().toLocaleString());
          setIsReady(true);
          await regenerateCanvas();
        } else {
          await router.push('/');
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        await router.push('/');
      }
    };

    void loadInitialData();
  }, [router, regenerateCanvas]);

  useEffect(() => {
    if (isReady) {
      void regenerateCanvas();
    }
  }, [isReady, regenerateCanvas]);

  const addSticker = useCallback((type: string) => {
    const newSticker: Sticker = {
      id: Math.random().toString(),
      type,
      x: 0.5,
      y: 0.5,
      scale: 1,
      rotation: 0
    };
    setStickers(prev => [...prev, newSticker]);
  }, []);

  const updateStickerPosition = useCallback((id: string, x: number, y: number) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === id ? { ...sticker, x, y } : sticker
    ));
  }, []);

  const updateStickerRotation = useCallback((id: string, rotation: number) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === id ? { ...sticker, rotation } : sticker
    ));
  }, []);

  const updateStickerScale = useCallback((id: string, scale: number) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === id ? { ...sticker, scale } : sticker
    ));
  }, []);

  const deleteSticker = useCallback((id: string) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  }, []);

  const clearAllStickers = useCallback(() => {
    setStickers([]);
  }, []);

  const downloadImage = useCallback(async (format: 'portrait' | 'landscape') => {
    try {
      setCurrentFormat(format);
      const generateCanvas = format === 'landscape' ? generateLandscapeCanvas : generatePortraitCanvas;
      const dataUrl = await generateCanvas(photos, photoCount, timestamp, selectedColor, stickers);
      
      if (dataUrl) {
        setPreviewUrl(dataUrl);
        
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `mianna_photobooth_${format}_${Date.now()}.png`;
        link.click();
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }, [photos, photoCount, timestamp, selectedColor, stickers]);

  const handleNewPhotos = useCallback(async () => {
    try {
      localStorage.removeItem('photos');
      localStorage.removeItem('timestamp');
      localStorage.removeItem('photoCount');
      localStorage.removeItem('photoFormat');
      await router.push('/welcome');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }, [router]);

  if (!isReady) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-extrabold text-pink-500 z-10"
      >
        Your Photos Are Ready!
      </motion.h1>
      
      <motion.p 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-xl text-gray-600 max-w-lg mx-auto mt-4 text-center"
      >
        Your {photoCount} {photoCount === 1 ? 'snapshot is' : 'snapshots are'} captured—no retakes, 
        just real, fun memories. Now, customize your design and save your moments!
      </motion.p>

      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col items-center gap-8">
          <div 
            className="relative"
            ref={previewRef}
          >
            <motion.div 
              layoutId="preview"
              className="relative max-w-[90vw] border-4 border-pink-500 rounded-lg overflow-hidden shadow-lg"
            >
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Generated photobooth result"
                  width={1080}
                  height={1920}
                  className="w-full h-auto"
                  priority
                  unoptimized
                />
              )}
              {stickers.map(sticker => (
                <DraggableSticker
                  key={sticker.id}
                  sticker={sticker}
                  containerRef={previewRef}
                  onPositionUpdate={updateStickerPosition}
                  onDelete={deleteSticker}
                  onRotate={updateStickerRotation}
                  onScale={updateStickerScale}
                />
              ))}
            </motion.div>
          </div>

          <div className="w-full max-w-3xl space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Frame Color</h3>
              <ColorSelector 
                colors={frameColors}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Stickers</h3>
                {stickers.length > 0 && (
                  <Button
                    onClick={clearAllStickers}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                    variant="ghost"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </Button>
                )}
              </div>
              <StickerSelector 
                stickers={availableStickers}
                onStickerSelect={addSticker}
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: Double-click a sticker to remove it, or drag to reposition. 
                Use two fingers to pinch and zoom on mobile.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Options</h3>
              <FormatButtons 
                currentFormat={currentFormat}
                onDownload={downloadImage}
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              className="mt-4 rounded-full bg-transparent text-pink-500 border-2 border-pink-500 py-2 px-8 text-lg font-semibold transition-colors hover:bg-pink-50"
              onClick={handleNewPhotos}
            >
              Take New Photos
            </Button>
          </motion.div>
        </div>
      </motion.div>

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
    </motion.div>
  );
}