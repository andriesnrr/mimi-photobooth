import { FrameColor, Sticker } from "../types";
import { drawDiagonalStripes, drawSticker, loadImage } from "./canvas";

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
    const baseWidth = 1080;  // Standard Instagram Story width
    const baseHeight = 1920; // Standard Instagram Story height
    const padding = 60;
    const spacing = 40;
  
    // Calculate photo dimensions based on count
    let photoHeight: number;
    let photoWidth: number;
  
    if (count === 1) {
      // Single photo takes up most of the space with padding
      photoHeight = baseHeight - (padding * 2) - 100; // Extra 100px for branding
      photoWidth = (photoHeight * 9) / 16; // Maintain 9:16 aspect ratio
    } else {
      // Multiple photos
      const totalSpacing = (count - 1) * spacing;
      const availableHeight = baseHeight - (padding * 2) - totalSpacing - 100;
      photoHeight = availableHeight / count;
      photoWidth = (photoHeight * 9) / 16;
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
  
      // Calculate source dimensions to maintain aspect ratio
      const imgAspectRatio = img.width / img.height;
      let sourceWidth = img.width;
      let sourceHeight = img.height;
      let sourceX = 0;
      let sourceY = 0;
  
      if (imgAspectRatio > 9/16) {
        // Image is wider than target ratio
        sourceWidth = sourceHeight * (9/16);
        sourceX = (img.width - sourceWidth) / 2;
      } else if (imgAspectRatio < 9/16) {
        // Image is taller than target ratio
        sourceHeight = sourceWidth * (16/9);
        sourceY = (img.height - sourceHeight) / 2;
      }
  
      // Draw photo
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        horizontalPadding, yPos, photoWidth, photoHeight
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
  
    return canvas.toDataURL('image/jpeg', 1.0);
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
    const baseWidth = 1920;  // Standard 1080p width
    const baseHeight = 1080; // Standard 1080p height
    const padding = 60;
    const spacing = 40;
  
    // Calculate photo dimensions based on count
    let photoWidth: number;
    let photoHeight: number;
  
    if (count === 1) {
      // Single photo takes up most of the space with padding
      photoWidth = baseWidth - (padding * 2);
      photoHeight = (photoWidth * 9) / 16; // Maintain 16:9 aspect ratio
    } else {
      // Multiple photos
      const totalSpacing = (count - 1) * spacing;
      const availableWidth = baseWidth - (padding * 2) - totalSpacing;
      photoWidth = availableWidth / count;
      photoHeight = (photoWidth * 9) / 16;
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
  
      // Calculate source dimensions to maintain aspect ratio
      const imgAspectRatio = img.width / img.height;
      let sourceWidth = img.width;
      let sourceHeight = img.height;
      let sourceX = 0;
      let sourceY = 0;
  
      if (imgAspectRatio > 16/9) {
        // Image is wider than target ratio
        sourceWidth = sourceHeight * (16/9);
        sourceX = (img.width - sourceWidth) / 2;
      } else if (imgAspectRatio < 16/9) {
        // Image is taller than target ratio
        sourceHeight = sourceWidth * (9/16);
        sourceY = (img.height - sourceHeight) / 2;
      }
  
      // Draw photo
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        xPos, verticalPadding, photoWidth, photoHeight
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
  
    return canvas.toDataURL('image/jpeg', 1.0);
  };