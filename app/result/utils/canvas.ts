import { FrameColor, Sticker } from '../types';
import { availableStickers } from '../constants';

export const drawDiagonalStripes = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number,
  color: string
) => {
  const stripeWidth = 100;
  const angle = Math.PI / 4;
  
  ctx.save();
  ctx.fillStyle = color;
  
  for (let i = -height; i < width + height; i += stripeWidth) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + height * Math.cos(angle), height * Math.sin(angle));
    ctx.lineTo(i + stripeWidth + height * Math.cos(angle), height * Math.sin(angle));
    ctx.lineTo(i + stripeWidth, 0);
    ctx.fill();
  }
  
  ctx.restore();
};

export const drawSticker = (
  ctx: CanvasRenderingContext2D, 
  sticker: Sticker, 
  canvasWidth: number, 
  canvasHeight: number
) => {
  const stickerInfo = availableStickers.find(s => s.type === sticker.type);
  if (!stickerInfo) return;

  ctx.save();
  ctx.translate(sticker.x * canvasWidth, sticker.y * canvasHeight);
  ctx.rotate(sticker.rotation * Math.PI / 180);
  ctx.scale(sticker.scale, sticker.scale);

  ctx.fillStyle = stickerInfo.color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;

  switch (sticker.type) {
    case 'heart':
      drawHeart(ctx, 0, 0, 20);
      break;
    case 'star':
      drawStar(ctx, 0, 0, 20, 5);
      break;
    // Add more sticker drawing functions
  }

  ctx.restore();
};

export const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.quadraticCurveTo(x, y, x + size / 4, y);
  ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
  ctx.quadraticCurveTo(x + size / 2, y, x + size * 3 / 4, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
  ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + size);
  ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
  ctx.fill();
  ctx.stroke();
};

export const drawStar = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  size: number, 
  points: number
) => {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? size : size / 2;
    const angle = (i * Math.PI) / points;
    if (i === 0) ctx.moveTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    else ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
};