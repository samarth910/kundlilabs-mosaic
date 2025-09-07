import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

interface CosmicButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CosmicButton: React.FC<CosmicButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <div className="relative group">
      {/* Outer cosmic aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-purple via-cosmic-gold to-cosmic-pink rounded-full blur-lg opacity-70 group-hover:opacity-100 animate-pulse-glow"></div>
      
      {/* Middle glow layer */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-purple to-cosmic-gold rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      {/* Button */}
      <Button
        onClick={onClick}
        className={`
          relative bg-gradient-to-r from-cosmic-purple via-cosmic-indigo to-cosmic-gold
          hover:from-cosmic-gold hover:via-cosmic-purple hover:to-cosmic-pink
          text-white font-bold text-lg px-8 py-4 rounded-full
          border border-white/20 hover:border-white/40
          transition-all duration-300 transform hover:scale-105
          shadow-2xl hover:shadow-cosmic-purple/50
          backdrop-blur-sm
          group-hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]
          ${className}
        `}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 animate-pulse" />
          {children}
          <Zap className="h-5 w-5 animate-bounce" />
        </div>
        
        {/* Inner sparkle effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-70"></div>
          <div className="absolute top-3 right-1/4 w-0.5 h-0.5 bg-cosmic-gold rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-bounce"></div>
        </div>
      </Button>
    </div>
  );
};

export default CosmicButton;