'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Camera, RotateCcw, FlipHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CameraComponentProps {
  onPhotoCapture: (photo: string) => void;
  isCapturing: boolean;
  currentShot: number;
  timeLeft: number;
  onFlip: () => void;
  onMirror: () => void;
  onRotate: () => void;
  isMirrored: boolean;
  rotation: number;
  facingMode: "user" | "environment";
}

const CameraComponent: React.FC<CameraComponentProps> = ({ 
  onPhotoCapture, 
  isCapturing, 
  timeLeft,
  isMirrored,
  rotation,
  facingMode 
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mounted = true;
    let currentStream: MediaStream | null = null;

    const initCamera = async () => {
      try {
        if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
          return;
        }

        if (currentStream) {
          currentStream.getTracks().forEach(track => track.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false
        });

        currentStream = stream;

        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const getScreenshot = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      if (isMirrored) ctx.scale(-1, 1);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(video, 0, 0);
      ctx.restore();
      
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  useEffect(() => {
    if (isCapturing && timeLeft === 0) {
      const photo = getScreenshot();
      if (photo) {
        onPhotoCapture(photo);
      }
    }
  }, [isCapturing, timeLeft, onPhotoCapture]);

  return (
    <div className="relative h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover border-4 border-pink-500 rounded-lg"
        style={{
          transform: `rotate(${rotation}deg) scaleX(${isMirrored ? -1 : 1})`,
          transition: 'transform 0.3s ease'
        }}
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

const DynamicCamera = dynamic(() => Promise.resolve(CameraComponent), {
  ssr: false
});

export default function Canvas() {
  const router = useRouter();
  const [photoCount, setPhotoCount] = useState(3);
  const [timeLeft, setTimeLeft] = useState(3);
  const [currentShot, setCurrentShot] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [isMirrored, setIsMirrored] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem('photoCount');
    if (savedCount) {
      setPhotoCount(parseInt(savedCount));
    } else {
      router.push('/welcome');
    }
  }, [router]);

  const handlePhotoCapture = (photo: string) => {
    setPhotos(prev => [...prev, photo]);
    if (currentShot < photoCount) {
      setCurrentShot(prev => prev + 1);
      setTimeLeft(3);
    } else {
      setIsCapturing(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isCapturing && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isCapturing, timeLeft]);

  const startCountdown = () => {
    setIsCapturing(true);
    setCurrentShot(1);
    setPhotos([]);
    setTimeLeft(3);
  };

  const flipCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const toggleMirror = () => {
    setIsMirrored(prev => !prev);
  };

  const rotateCamera = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDone = () => {
    if (photos.length === photoCount && typeof window !== 'undefined') {
      try {
        localStorage.setItem('photos', JSON.stringify(photos));
        localStorage.setItem('timestamp', new Date().toLocaleString());
        router.push('/result');
      } catch (error) {
        console.error('Error saving photos:', error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 md:p-8 lg:p-12 bg-white">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-pink-500 text-center mb-8">
        mianna photobooth
      </h1>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="flex-1 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            <DynamicCamera
              onPhotoCapture={handlePhotoCapture}
              isCapturing={isCapturing}
              currentShot={currentShot}
              timeLeft={timeLeft}
              onFlip={flipCamera}
              onMirror={toggleMirror}
              onRotate={rotateCamera}
              isMirrored={isMirrored}
              rotation={rotation}
              facingMode={facingMode}
            />
          </div>
          
          <div className="w-full lg:w-48">
            <div className="flex lg:flex-col gap-2 justify-center lg:justify-start overflow-x-auto lg:overflow-x-visible py-2">
              {photos.map((photo, index) => (
                <div key={index} className="w-24 h-24 md:w-32 md:h-32 lg:w-full lg:h-32 flex-shrink-0">
                  <img
                    src={photo}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border-2 border-pink-500"
                  />
                </div>
              ))}
              {[...Array(photoCount - photos.length)].map((_, index) => (
                <div 
                  key={`placeholder-${index}`}
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-full lg:h-32 flex-shrink-0 border-2 border-dashed border-pink-300 rounded-lg bg-pink-50"
                />
              ))}
            </div>
          </div>
        </div>

        {isCapturing && (
          <div className="text-center mt-6">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-500 animate-pulse">
              {timeLeft}
            </div>
            <p className="text-lg md:text-xl text-gray-700 mt-2">
              Photo {currentShot} of {photoCount}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4">
          {!isCapturing && (
            <>
              <button
                className="rounded-full bg-[#FF6F61] text-white py-2 px-6 md:py-3 md:px-10 text-base md:text-xl font-semibold transition-colors hover:bg-[#D45746] flex items-center gap-2"
                onClick={startCountdown}
              >
                <Camera className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden sm:inline">Start Countdown</span>
              </button>

              <button
                className="rounded-full bg-[#FF6F61] text-white p-2 md:p-3 transition-colors hover:bg-[#D45746]"
                onClick={flipCamera}
                title="Flip Camera"
              >
                <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                className="rounded-full bg-[#FF6F61] text-white p-2 md:p-3 transition-colors hover:bg-[#D45746]"
                onClick={toggleMirror}
                title="Mirror Camera"
              >
                <FlipHorizontal className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                className="rounded-full bg-[#FF6F61] text-white p-2 md:p-3 transition-colors hover:bg-[#D45746]"
                onClick={rotateCamera}
                title="Rotate Camera"
              >
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
          
          {photos.length === photoCount && !isCapturing && (
            <button
              className="rounded-full bg-[#FF6F61] text-white py-2 px-6 md:py-3 md:px-10 text-base md:text-xl font-semibold transition-colors hover:bg-[#D45746]"
              onClick={handleDone}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}