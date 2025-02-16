import { FrameColor, Sticker } from '../types';
import { drawDiagonalStripes, drawSticker, loadImage } from './canvas';

export const generatePortraitCanvas = async (
  photoArray: string[], 
  count: number, 
  time: string,
  selectedColor: FrameColor,
  stickers: Sticker[]
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Instagram Story aspect ratio (9:16)
  const baseWidth = 1080;
  const baseHeight = 1920;
  const spacing = 40;
  const padding = 60;

  // Calculate dimensions while maintaining aspect ratio
  const targetPhotoAspectRatio = 3/4; // Standard photo aspect ratio
  let photoWidth: number;
  let photoHeight: number;

  if (count === 1) {
    // For single photo, use larger size while maintaining aspect ratio
    photoHeight = baseHeight - (padding * 2);
    photoWidth = photoHeight * targetPhotoAspectRatio;
    
    // If photo is too wide, adjust based on width
    if (photoWidth > baseWidth - (padding * 2)) {
      photoWidth = baseWidth - (padding * 2);
      photoHeight = photoWidth / targetPhotoAspectRatio;
    }
  } else {
    // For multiple photos, calculate height first
    photoHeight = (baseHeight - (padding * 2) - (spacing * (count - 1))) / count;
    photoWidth = photoHeight * targetPhotoAspectRatio;

    // If photos are too wide, adjust based on width
    if (photoWidth > baseWidth - (padding * 2)) {
      photoWidth = baseWidth - (padding * 2);
      photoHeight = photoWidth / targetPhotoAspectRatio;
    }
  }

  const horizontalPadding = (baseWidth - photoWidth) / 2;

  canvas.width = baseWidth;
  canvas.height = baseHeight;

  // Draw background
  ctx.fillStyle = selectedColor.primary;
  ctx.fillRect(0, 0, baseWidth, baseHeight);
  drawDiagonalStripes(ctx, baseWidth, baseHeight, selectedColor.secondary);

  const loadedImages = await Promise.all(photoArray.map(loadImage));

  // Draw photos
  loadedImages.forEach((img, index) => {
    const yPos = padding + (index * (photoHeight + spacing));

    // Calculate source dimensions to maintain aspect ratio
    const imgAspectRatio = img.width / img.height;
    let sourceWidth = img.width;
    let sourceHeight = img.height;
    let sourceX = 0;
    let sourceY = 0;

    if (imgAspectRatio > targetPhotoAspectRatio) {
      // Image is wider than target, crop width
      sourceWidth = img.height * targetPhotoAspectRatio;
      sourceX = (img.width - sourceWidth) / 2;
    } else if (imgAspectRatio < targetPhotoAspectRatio) {
      // Image is taller than target, crop height
      sourceHeight = img.width / targetPhotoAspectRatio;
      sourceY = (img.height - sourceHeight) / 2;
    }

    // Draw frame
    ctx.fillStyle = selectedColor.primary;
    ctx.beginPath();
    ctx.roundRect(
      horizontalPadding - 8,
      yPos - 8,
      photoWidth + 16,
      photoHeight + 16,
      12
    );
    ctx.fill();

    // Draw white border
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(
      horizontalPadding - 4,
      yPos - 4,
      photoWidth + 8,
      photoHeight + 8,
      8
    );
    ctx.fill();

    // Draw photo with proper cropping
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      horizontalPadding,
      yPos,
      photoWidth,
      photoHeight
    );
  });

  // Draw stickers
  stickers.forEach(sticker => {
    drawSticker(ctx, sticker, baseWidth, baseHeight);
  });

  // Add branding
  const brandingY = baseHeight - padding;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(baseWidth / 2, brandingY - 30, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 28px Montserrat';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('mianna photobooth', baseWidth / 2, brandingY);

  ctx.font = '16px Montserrat';
  ctx.fillText(time, baseWidth / 2, brandingY + 30);

  return canvas.toDataURL('image/jpeg', 0.95); // Increased quality
};

export const generateLandscapeCanvas = async (
  photoArray: string[], 
  count: number, 
  time: string,
  selectedColor: FrameColor,
  stickers: Sticker[]
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 16:9 aspect ratio
  const baseWidth = 1920;
  const baseHeight = 1080;
  const spacing = 40;
  const padding = 60;

  // Calculate dimensions while maintaining aspect ratio
  const targetPhotoAspectRatio = 3/4; // Standard photo aspect ratio
  let photoWidth: number;
  let photoHeight: number;

  if (count === 1) {
    photoHeight = baseHeight - (padding * 2);
    photoWidth = photoHeight * targetPhotoAspectRatio;
  } else {
    photoWidth = (baseWidth - (padding * 2) - (spacing * (count - 1))) / count;
    photoHeight = photoWidth / targetPhotoAspectRatio;

    // If photos are too tall, adjust based on height
    if (photoHeight > baseHeight - (padding * 2)) {
      photoHeight = baseHeight - (padding * 2);
      photoWidth = photoHeight * targetPhotoAspectRatio;
    }
  }

  const verticalPadding = (baseHeight - photoHeight) / 2;

  canvas.width = baseWidth;
  canvas.height = baseHeight;

  // Draw background
  ctx.fillStyle = selectedColor.primary;
  ctx.fillRect(0, 0, baseWidth, baseHeight);
  drawDiagonalStripes(ctx, baseWidth, baseHeight, selectedColor.secondary);

  const loadedImages = await Promise.all(photoArray.map(loadImage));

  // Draw photos
  loadedImages.forEach((img, index) => {
    const xPos = padding + (index * (photoWidth + spacing));

    // Calculate source dimensions to maintain aspect ratio
    const imgAspectRatio = img.width / img.height;
    let sourceWidth = img.width;
    let sourceHeight = img.height;
    let sourceX = 0;
    let sourceY = 0;

    if (imgAspectRatio > targetPhotoAspectRatio) {
      sourceWidth = img.height * targetPhotoAspectRatio;
      sourceX = (img.width - sourceWidth) / 2;
    } else if (imgAspectRatio < targetPhotoAspectRatio) {
      sourceHeight = img.width / targetPhotoAspectRatio;
      sourceY = (img.height - sourceHeight) / 2;
    }

    // Draw frame
    ctx.fillStyle = selectedColor.primary;
    ctx.beginPath();
    ctx.roundRect(
      xPos - 8,
      verticalPadding - 8,
      photoWidth + 16,
      photoHeight + 16,
      12
    );
    ctx.fill();

    // Draw white border
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(
      xPos - 4,
      verticalPadding - 4,
      photoWidth + 8,
      photoHeight + 8,
      8
    );
    ctx.fill();

    // Draw photo with proper cropping
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      xPos,
      verticalPadding,
      photoWidth,
      photoHeight
    );
  });

  // Draw stickers
  stickers.forEach(sticker => {
    drawSticker(ctx, sticker, baseWidth, baseHeight);
  });

  // Add branding
  const brandingY = baseHeight - padding;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(baseWidth / 2, brandingY - 30, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 28px Montserrat';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('mianna photobooth', baseWidth / 2, brandingY);

  ctx.font = '16px Montserrat';
  ctx.fillText(time, baseWidth / 2, brandingY + 30);

  return canvas.toDataURL('image/jpeg', 0.95); // Increased quality
};