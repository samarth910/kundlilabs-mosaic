import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import sunImg from '/lovable-uploads/9286b4ae-6e60-4e6d-b801-8265f85d2d6c.png';
import moonImg from '/lovable-uploads/2a06ce0d-75f5-41e0-84de-bb27a4c794e8.png';
import marsImg from '/lovable-uploads/c4919169-8a31-4527-9dcb-16063508bb63.png';
import mercuryImg from '/lovable-uploads/b2b56d2b-046f-4553-92c6-a3e1eb510d5a.png';
import jupiterImg from '/lovable-uploads/43710563-76d1-46ea-9296-7cca1ad26d3e.png';
import venusImg from '/lovable-uploads/b76f4a82-39ac-4092-b3cc-ebcc977d485e.png';
import saturnImg from '/lovable-uploads/71ce4253-8766-45ef-a558-790bf802766f.png';
import rahuImg from '/lovable-uploads/23b5e239-0908-4959-bf0c-b576f113b532.png';
import ketuImg from '/lovable-uploads/d0fa0828-e292-4c63-b3dd-b6ba23a813f0.png';

interface Planet {
  name: string;
  title: string;
  description: string;
  rulingSign: string;
  image: string;
  glowColor: string;
}

const planets: Planet[] = [
  {
    name: 'sun',
    title: 'Sun – The King',
    description: 'Represents the soul, ego, power, and authority. It gives leadership, confidence, and vitality.',
    rulingSign: 'Leo',
    image: sunImg,
    glowColor: '#d37603'
  },
  {
    name: 'moon',
    title: 'Moon – The Queen',
    description: 'Symbolizes the mind, emotions, and nurturing nature. It governs moods, instincts, and inner peace.',
    rulingSign: 'Cancer',
    image: moonImg,
    glowColor: '#bec3bc'
  },
  {
    name: 'mars',
    title: 'Mars – The Warrior',
    description: 'Stands for energy, courage, aggression, and action. It drives ambition, discipline, and quick decisions.',
    rulingSign: 'Aries and Scorpio',
    image: marsImg,
    glowColor: '#ad1d02'
  },
  {
    name: 'mercury',
    title: 'Mercury – The Prince',
    description: 'Controls intellect, speech, logic, and communication. It brings curiosity, business skills, and adaptability.',
    rulingSign: 'Gemini and Virgo',
    image: mercuryImg,
    glowColor: '#4a5f1e'
  },
   {
    name: 'saturn',
    title: 'Saturn – The Judge',
    description: 'Symbolizes discipline, karma, responsibility, and delay. It teaches patience, endurance, and hard-earned success.',
    rulingSign: 'Capricorn and Aquarius',
    image: saturnImg,
    glowColor: '#2e455b'
  },
  {
    name: 'jupiter',
    title: 'Jupiter – The Guru',
    description: 'Represents wisdom, growth, faith, and righteousness. It gives knowledge, luck, and a sense of purpose.',
    rulingSign: 'Sagittarius and Pisces',
    image: jupiterImg,
    glowColor: '#c86605'
  },
  {
    name: 'venus',
    title: 'Venus – The Lover',
    description: 'Stands for love, beauty, pleasure, and relationships. It brings charm, creativity, and material comfort.',
    rulingSign: 'Taurus and Libra',
    image: venusImg,
    glowColor: '#e2c6be'
  },
  {
    name: 'rahu',
    title: 'Rahu – The Rebel',
    description: 'Represents illusion, obsession, desire, and innovation. It creates attraction to fame, foreign things, and shortcuts.',
    rulingSign: 'None',
    image: rahuImg,
    glowColor: '#3a84aa'
  },
  {
    name: 'ketu',
    title: 'Ketu – The Mystic',
    description: 'Stands for detachment, past karma, and spiritual liberation. It removes material desires and leads to higher knowledge.',
    rulingSign: 'None',
    image: ketuImg,
    glowColor: '#9b8e7e'
  }
];

const PlanetGallery = () => {
  const [activePlanet, setActivePlanet] = useState<number | null>(null);
  const [calloutPosition, setCalloutPosition] = useState<{ x: number; y: number; isMobile: boolean } | null>(null);
  const [showCallout, setShowCallout] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize planet refs
  useEffect(() => {
    planetRefs.current = planetRefs.current.slice(0, planets.length);
  }, []);

  const handlePlanetEnter = useCallback((index: number, event: React.MouseEvent) => {
    const planet = event.currentTarget as HTMLDivElement;
    const glowColor = planet.dataset.glow;
    const rect = planet.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;

    // Calculate initial position
    let offsetX = rect.left + rect.width + 18 + window.scrollX;
    let offsetY = rect.top + window.scrollY - 10;

    if (isMobile) {
      // Mobile positioning - center horizontally, position below planet
      offsetX = rect.left + (rect.width / 2) + window.scrollX;
      offsetY = rect.bottom + 12 + window.scrollY;
    }

    // Viewport boundary detection and adjustment
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const calloutWidth = 280; // Approximate callout width
    const calloutHeight = 120; // Approximate callout height
    const padding = 20; // Minimum padding from viewport edges

    if (isMobile) {
      // Mobile adjustments
      // Ensure callout doesn't go off the bottom of the screen
      if (offsetY + calloutHeight + padding > viewportHeight + window.scrollY) {
        // Position above the planet instead
        offsetY = rect.top - calloutHeight - 12 + window.scrollY;
      }
      
      // Ensure callout doesn't go off the top of the screen
      if (offsetY < window.scrollY + padding) {
        offsetY = window.scrollY + padding;
      }
    } else {
      // Desktop adjustments
      // Check if callout would go off the right side
      if (offsetX + calloutWidth + padding > viewportWidth + window.scrollX) {
        // Position to the left of the planet
        offsetX = rect.left - calloutWidth - 18 + window.scrollX;
      }
      
      // Check if callout would go off the left side
      if (offsetX < window.scrollX + padding) {
        offsetX = window.scrollX + padding;
      }
      
      // Check if callout would go off the bottom
      if (offsetY + calloutHeight + padding > viewportHeight + window.scrollY) {
        offsetY = viewportHeight + window.scrollY - calloutHeight - padding;
      }
      
      // Check if callout would go off the top
      if (offsetY < window.scrollY + padding) {
        offsetY = window.scrollY + padding;
      }
    }

    setCalloutPosition({ x: offsetX, y: offsetY, isMobile });
    setShowCallout(true);
    setShowOverlay(true);
    setActivePlanet(index);

    // Apply visual effects to all planets
    planetRefs.current.forEach((p, i) => {
      if (!p) return;
      
      if (i !== index) {
        // Gray out other planets
        p.classList.add('grayed');
        const direction = i < index ? -1 : 1;
        const distance = Math.abs(i - index) * 80;
        const offset = direction * distance;
        p.style.transform = `translateX(${offset}px)`;
        p.style.zIndex = '45';
        
        const img = p.querySelector('img');
        if (img) {
          img.style.boxShadow = '';
        }
      } else {
        // Highlight active planet
        p.classList.add('active');
        p.style.zIndex = '51';
        
        const img = p.querySelector('img');
        if (img && glowColor) {
          img.style.boxShadow = `0 0 40px 10px ${glowColor}`;
        }
      }
    });
  }, []);

  const handlePlanetLeave = useCallback(() => {
    setShowCallout(false);
    setShowOverlay(false);
    setActivePlanet(null);
    setCalloutPosition(null);

    // Reset all planets
    planetRefs.current.forEach((p) => {
      if (!p) return;
      
      p.classList.remove('grayed', 'active');
      p.style.transform = '';
      p.style.zIndex = '45';
      
      const img = p.querySelector('img');
      if (img) {
        img.style.boxShadow = '';
      }
    });
  }, []);

  return (
    <>
      {/* Page Dim Overlay */}
      {showOverlay && createPortal(
        <div 
          id="page-dim-overlay"
          className="fixed inset-0 bg-black/70 opacity-100 pointer-events-none transition-opacity duration-300 z-40"
        />,
        document.body
      )}

      <section className="w-full flex flex-col items-center mt-2">
        {/* Planet Gallery */}
        <div className="planet-gallery flex flex-wrap justify-center mb-10 relative z-10">
          {planets.map((planet, index) => (
            <div
              key={planet.name}
              ref={(el) => (planetRefs.current[index] = el)}
              className={`planet cursor-pointer relative flex items-center justify-center w-24 h-24 transition-transform duration-300 ease-out ${
                index === 0 ? 'ml-0' : '-ml-11'
              }`}
              onMouseEnter={(e) => handlePlanetEnter(index, e)}
              onMouseLeave={handlePlanetLeave}
              onTouchStart={(e) => handlePlanetEnter(index, e as any)}
              onTouchEnd={handlePlanetLeave}
              data-planet={planet.name}
              data-glow={planet.glowColor}
            >
              <img
                src={planet.image}
                alt={planet.title}
                className="w-24 h-24 rounded-full transition-all duration-300"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Planet Callout */}
        {showCallout && calloutPosition && activePlanet !== null && createPortal(
          <div
            id="planet-callout"
            className={`fixed z-[60] px-4 py-3 backdrop-blur-xl rounded-xl border border-white/20 bg-white/10 text-white shadow-lg pointer-events-none glass-shine ${
              showCallout ? 'show' : ''
            }`}
            style={{
              minWidth: '200px',
              left: calloutPosition.isMobile ? '50%' : `${calloutPosition.x}px`,
              top: `${calloutPosition.y}px`,
              transform: calloutPosition.isMobile ? 'translateX(-50%)' : '',
            }}
          >
            <h3 
              id="planet-title"
              className="font-bold text-lg mb-1"
              style={{ color: planets[activePlanet].glowColor }}
            >
              {planets[activePlanet].title}
            </h3>
            <p 
              id="planet-desc"
              className="text-sm text-white/70 font-medium"
            >
              {planets[activePlanet].description}
              <br />
              <span className="ruling-sign">
                Ruling Sign: {planets[activePlanet].rulingSign}
              </span>
            </p>
          </div>,
          document.body
        )}
      </section>
    </>
  );
};

export default PlanetGallery;