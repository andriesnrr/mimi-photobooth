'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);
  const [timestamp, setTimestamp] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentFormat, setCurrentFormat] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
    const savedTimestamp = localStorage.getItem('timestamp');

    if (savedPhotos.length > 0) {
      setPhotos(savedPhotos);
      setTimestamp(savedTimestamp || '');
      setIsReady(true);
      generatePortraitCanvas(savedPhotos, savedTimestamp || '').then(url => {
        if (url) setPreviewUrl(url);
      });
    } else {
      router.push('/');
    }
  }, [router]);

  const generatePortraitCanvas = async (photoArray: string[], time: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const baseWidth = 800;
    const baseHeight = 1600;
    const photoWidth = baseWidth - 80;
    const photoHeight = Math.floor(photoWidth * (9/16));
    const horizontalPadding = 40;
    const verticalPadding = 40;
    const spacing = 40;
    const footerHeight = 120;

    canvas.width = baseWidth;
    canvas.height = baseHeight;

    // Fill pastel pink background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, baseHeight);
    gradient.addColorStop(0, '#FFE4E9');
    gradient.addColorStop(1, '#FFD1D9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    const loadImage = (src: string) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    };

    const loadedImages = await Promise.all(photoArray.map(loadImage));
    
    loadedImages.forEach((img, index) => {
      const yPos = verticalPadding + (index * (photoHeight + spacing));
      
      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      
      // Draw pink border with rounded corners
      ctx.fillStyle = '#FF6F61';
      ctx.beginPath();
      ctx.roundRect(
        horizontalPadding - 4,
        yPos - 4,
        photoWidth + 8,
        photoHeight + 8,
        8
      );
      ctx.fill();
      
      // Reset shadow for image
      ctx.shadowColor = 'transparent';
      
      // Draw image
      ctx.drawImage(img, horizontalPadding, yPos, photoWidth, photoHeight);
    });

    // Calculate center position for text
    const lastPhotoBottom = verticalPadding + (2 * (photoHeight + spacing)) + photoHeight;
    const remainingSpace = baseHeight - lastPhotoBottom;
    const textY = lastPhotoBottom + (remainingSpace / 2);
    
    // Add decorative elements
    ctx.fillStyle = '#FF6F61';
    ctx.beginPath();
    ctx.arc(baseWidth / 2, textY - 50, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw text with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.font = 'bold 28px Montserrat';
    ctx.fillStyle = '#FF6F61';
    ctx.textAlign = 'center';
    ctx.fillText('mianna photobooth', baseWidth / 2, textY);

    ctx.font = '16px Montserrat';
    ctx.fillStyle = '#666666';
    ctx.fillText(time, baseWidth / 2, textY + 30);

    return canvas.toDataURL('image/png');
  };

  const generateLandscapeCanvas = async (photoArray: string[], time: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const baseWidth = 1600;
    const baseHeight = 800;
    const photoWidth = Math.floor((baseWidth - 160) / 3);
    const photoHeight = Math.floor(photoWidth * (9/16));
    const horizontalPadding = 40;
    const verticalPadding = 80;
    const spacing = 40;

    canvas.width = baseWidth;
    canvas.height = baseHeight;

    // Fill background with gradient
    const gradient = ctx.createLinearGradient(0, 0, baseWidth, 0);
    gradient.addColorStop(0, '#FFE4E9');
    gradient.addColorStop(1, '#FFD1D9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    const loadImage = (src: string) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    };

    const loadedImages = await Promise.all(photoArray.map(loadImage));
    
    loadedImages.forEach((img, index) => {
      const xPos = horizontalPadding + (index * (photoWidth + spacing));
      
      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
      
      // Draw pink border with rounded corners
      ctx.fillStyle = '#FF6F61';
      ctx.beginPath();
      ctx.roundRect(
        xPos - 4,
        verticalPadding - 4,
        photoWidth + 8,
        photoHeight + 8,
        8
      );
      ctx.fill();
      
      // Reset shadow for image
      ctx.shadowColor = 'transparent';
      
      // Draw image
      ctx.drawImage(img, xPos, verticalPadding, photoWidth, photoHeight);
    });

    const photosBottom = verticalPadding + photoHeight;
    const remainingSpace = baseHeight - photosBottom;
    const textY = photosBottom + (remainingSpace / 2);
    
    // Add decorative elements
    ctx.fillStyle = '#FF6F61';
    ctx.beginPath();
    ctx.arc(baseWidth / 2, textY - 50, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw text with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.font = 'bold 28px Montserrat';
    ctx.fillStyle = '#FF6F61';
    ctx.textAlign = 'center';
    ctx.fillText('mianna photobooth', baseWidth / 2, textY);

    ctx.font = '16px Montserrat';
    ctx.fillStyle = '#666666';
    ctx.fillText(time, baseWidth / 2, textY + 30);

    return canvas.toDataURL('image/png');
  };

  const downloadImage = async (format: 'portrait' | 'landscape') => {
    setCurrentFormat(format);
    const dataUrl = await (format === 'portrait' 
      ? generatePortraitCanvas(photos, timestamp)
      : generateLandscapeCanvas(photos, timestamp)
    );
    
    if (dataUrl) {
      setPreviewUrl(dataUrl);
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `mianna_photobooth_${format}.png`;
      link.click();
    }
  };

  const handleNewPhotos = () => {
    localStorage.removeItem('photos');
    localStorage.removeItem('timestamp');
    router.push('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
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
        className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4 text-center"
      >
        Your three snapshots are captured—no retakes, just real, fun memories. Now, it's time to save and share your moments.
      </motion.p>

      {isReady && (
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mt-8 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div 
              layoutId="preview"
              className="relative max-w-[90vw] border-4 border-pink-500 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={previewUrl}
                alt="Generated photobooth result"
                className="w-full h-auto"
              />
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className={`rounded-full py-3 px-10 text-xl font-semibold transition-colors
                    ${currentFormat === 'portrait' 
                      ? 'bg-[#FF6F61] text-white hover:bg-[#D45746]' 
                      : 'bg-pink-100 text-pink-500 hover:bg-pink-200'}`}
                  onClick={() => downloadImage('portrait')}
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
                  onClick={() => downloadImage('landscape')}
                >
                  Landscape
                </Button>
              </motion.div>
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
      )}
    </motion.div>
  );
}