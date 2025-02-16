import { Heart, Star, Smile, Music, Coffee, Sun, Camera, Sparkles, Cloud, Flower, 
    Crown, Diamond, Gift, IceCream, Moon, Rocket, Cat, Dog, Cake, Pizza } from 'lucide-react';
  import { FrameColor, StickerOption } from './types';
  
  export const frameColors: FrameColor[] = [
    { name: 'Navy', primary: '#1a237e', secondary: '#283593' },
    { name: 'Pink', primary: '#FFE4E9', secondary: '#FFD1D9' },
    { name: 'Sunset', primary: '#ff9a9e', secondary: '#fad0c4' },
    { name: 'Mint', primary: '#a8edea', secondary: '#fed6e3' },
    { name: 'Purple', primary: '#a18cd1', secondary: '#fbc2eb' },
    { name: 'Ocean', primary: '#4facfe', secondary: '#00f2fe' },
    { name: 'Forest', primary: '#43e97b', secondary: '#38f9d7' },
    { name: 'Autumn', primary: '#fa709a', secondary: '#fee140' },
    { name: 'Night', primary: '#30cfd0', secondary: '#330867' },
    { name: 'Coral', primary: '#ff8177', secondary: '#ff867a' },
  ];
  
  export const availableStickers: StickerOption[] = [
    { icon: <Heart className="w-6 h-6" />, type: 'heart', color: '#ff4081' },
    { icon: <Star className="w-6 h-6" />, type: 'star', color: '#ffd700' },
    { icon: <Smile className="w-6 h-6" />, type: 'smile', color: '#ffb74d' },
    { icon: <Music className="w-6 h-6" />, type: 'music', color: '#9c27b0' },
    { icon: <Coffee className="w-6 h-6" />, type: 'coffee', color: '#795548' },
    { icon: <Sun className="w-6 h-6" />, type: 'sun', color: '#ffc107' },
    { icon: <Camera className="w-6 h-6" />, type: 'camera', color: '#2196f3' },
    { icon: <Sparkles className="w-6 h-6" />, type: 'sparkles', color: '#ffeb3b' },
    { icon: <Cloud className="w-6 h-6" />, type: 'cloud', color: '#90caf9' },
    { icon: <Flower className="w-6 h-6" />, type: 'flower', color: '#f06292' },
    { icon: <Crown className="w-6 h-6" />, type: 'crown', color: '#ffd700' },
    { icon: <Diamond className="w-6 h-6" />, type: 'diamond', color: '#b39ddb' },
    { icon: <Gift className="w-6 h-6" />, type: 'gift', color: '#ec407a' },
    { icon: <Moon className="w-6 h-6" />, type: 'moon', color: '#5c6bc0' },
    { icon: <Cat className="w-6 h-6" />, type: 'cat', color: '#78909c' },
    { icon: <Dog className="w-6 h-6" />, type: 'dog', color: '#8d6e63' },
    { icon: <Cake className="w-6 h-6" />, type: 'cake', color: '#e91e63' },
    { icon: <Pizza className="w-6 h-6" />, type: 'pizza', color: '#ff5722' },
    { icon: <Rocket className="w-6 h-6" />, type: 'rocket', color: '#3f51b5' },
    { icon: <IceCream className="w-6 h-6" />, type: 'icecream', color: '#e91e63' },
  ];