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
    <div className="w-full flex justify-center">
      <div className="relative group">
        {/* Outer cosmic aura */}
        <div className="absolute -inset-3 bg-gradient-to-r from-cosmic-purple via-cosmic-gold to-cosmic-pink rounded-full blur-xl opacity-50 group-hover:opacity-90 animate-pulse transition-opacity duration-500"></div>
        
        {/* Middle glow layer */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cosmic-purple to-cosmic-gold rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Button */}
        <Button
          onClick={onClick}
          className={`
            relative bg-gradient-to-r from-cosmic-purple via-cosmic-indigo to-cosmic-gold
            hover:from-cosmic-gold hover:via-cosmic-purple hover:to-cosmic-pink
            text-white font-bold text-xl px-12 py-6 rounded-full
            border-2 border-white/30 hover:border-white/60
            transition-all duration-300 transform hover:scale-110 active:scale-95
            shadow-2xl hover:shadow-cosmic-purple/60
            backdrop-blur-sm min-w-[250px]
            group-hover:shadow-[0_0_50px_rgba(147,51,234,0.8)]
            mx-auto block
            ${className}
          `}
        >
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span className="font-accent tracking-wide text-center">{children}</span>
            <Zap className="h-6 w-6 animate-bounce" />
          </div>
          
          {/* Inner sparkle effects */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-2 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-4 right-1/4 w-1 h-1 bg-cosmic-gold rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-white rounded-full animate-bounce delay-500"></div>
            <div className="absolute bottom-2 right-1/3 w-1 h-1 bg-cosmic-pink rounded-full animate-pulse delay-700"></div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default CosmicButton;