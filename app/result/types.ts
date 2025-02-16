import { ReactNode } from 'react';

export type FrameColor = {
  name: string;
  primary: string;
  secondary: string;
};

export type Sticker = {
  id: string;
  type: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type StickerOption = {
  icon: ReactNode;
  type: string;
  color: string;
};

export type Position = {
  x: number;
  y: number;
};

export type DownloadFormat = 'portrait' | 'landscape';

export type PhotoLayout = {
  width: number;
  height: number;
  spacing: number;
  padding: number;
};