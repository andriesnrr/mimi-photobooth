'use client';

import { Button } from '../../components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Download() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  // Mengambil data foto yang diteruskan dari halaman sebelumnya
  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
    const storedTimestamp = localStorage.getItem('timestamp') || '';
    setPhotos(storedPhotos);
    setTimestamp(storedTimestamp);
  }, []);

  const downloadPhoto = (photo: string) => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = 'photobooth_photo.jpg'; // Nama file unduhan
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-extrabold text-pink-500 z-10">Your Photos Are Ready!</h1>

      <p className="text-xl text-accent-foreground z-10 max-w-lg mx-auto mt-4 text-center">
        Your three snapshots are captured—no retakes, just real, fun memories.
        Now, it’s time to save and share your moments.
      </p>

      <div className="mt-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative w-[300px] h-[300px] border-4 border-pink-500 rounded-lg mb-4">
            <Image
              src={photo} // Display captured photo
              alt={`Photobooth Frame ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <p className="mt-4 text-xl text-accent-foreground">Captured on: {timestamp}</p>

      {/* Tombol download */}
      {photos.length > 0 && (
        <Button
          className="mt-8 rounded-full bg-[#FF6F61] text-white py-3 px-10 text-xl font-semibold transition-colors hover:bg-[#D45746] mx-auto z-10"
          onClick={() => downloadPhoto(photos[0])} // Download first photo, adjust if needed
        >
          Download Photo
        </Button>
      )}
    </div>
  );
}
