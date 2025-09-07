import { Link } from 'react-router-dom';
import PlanetGallery from './PlanetGallery';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <main className="relative pt-44 pb-12 flex flex-col items-center justify-start min-h-[80vh] px-2">
      <PlanetGallery />
      
      <div className="w-full flex flex-col items-center">
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text text-center mb-4 px-4 leading-tight">
          Decode Your Destiny with AI × Astrology
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl font-semibold text-white text-center max-w-2xl text-shadow px-4">
          Unlock the secrets of the cosmos with our AI-powered astrology platform
        </p>
        <div className="mt-8">
          <Link to="/login">
            <Button size="lg" className="text-lg font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;