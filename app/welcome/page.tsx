'use client';

import { Button } from '../../components/ui/button';
import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Welcome() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3);
  const [currentShot, setCurrentShot] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const webcamRef = useRef<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const startCountdown = () => {
    setIsCapturing(true);
    setCurrentShot(1);
    setPhotos([]);
    setTimeLeft(3);
  };

  const flipCamera = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setFacingMode(prev => prev === "user" ? "environment" : "user");
      setIsFlipping(false);
    }, 500);
  };

  useEffect(() => {
    if (isCapturing) {
      const countdown = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else if (timeLeft === 0 && currentShot <= 3) {
          const imageSrc = webcamRef.current?.getScreenshot();
          if (imageSrc) {
            setPhotos(prev => [...prev, imageSrc]);
          }
          
          if (currentShot < 3) {
            setCurrentShot(currentShot + 1);
            setTimeLeft(3);
          } else {
            setIsCapturing(false);
            clearInterval(countdown);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timeLeft, isCapturing, currentShot]);

  const handleDone = () => {
    if (photos.length === 3) {
      localStorage.setItem('photos', JSON.stringify(photos));
      localStorage.setItem('timestamp', new Date().toLocaleString());
      router.push('/result');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-extrabold text-pink-500 z-10"
      >
        mianna photobooth
      </motion.h1>
      
      <div className="flex flex-row gap-8 w-full max-w-6xl">
        <motion.div 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="flex-1"
        >
          <div className="relative">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{ facingMode }}
              className={`border-4 border-pink-500 rounded-lg ${isFlipping ? 'flip-camera' : ''}`}
            />
            <button 
              onClick={flipCamera}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
            >
              <RefreshCcw className="w-6 h-6 text-pink-500" />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="w-48 flex flex-col gap-4"
        >
          {photos.map((photo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="preview-thumbnail"
            >
              <img
                src={photo}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border-2 border-pink-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {isCapturing && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative mt-8"
        >
          <div className={`text-6xl font-bold text-pink-500 countdown-animation`}>
            {timeLeft}
          </div>
          <p className="text-xl text-accent-foreground mt-4">
            Photo {currentShot} of 3
          </p>
        </motion.div>
      )}

      <div className="flex gap-4">
        {!isCapturing && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="rounded-full bg-[#FF6F61] text-white py-3 px-10 text-xl font-semibold transition-colors hover:bg-[#D45746] mx-auto z-10"
              onClick={startCountdown}
            >
              Start Countdown
            </Button>
          </motion.div>
        )}
        
        {photos.length === 3 && !isCapturing && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="rounded-full bg-[#FF6F61] text-white py-3 px-10 text-xl font-semibold transition-colors hover:bg-[#D45746] mx-auto z-10"
              onClick={handleDone}
            >
              Done
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}