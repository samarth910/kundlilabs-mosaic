import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PlanetGallery from '@/components/PlanetGallery';
import ChatbotWidget from '@/components/ChatbotWidget';
import Footer from '@/components/Footer';
import CosmicButton from '@/components/CosmicButton';
import VoiceflowWidget from '@/components/VoiceflowWidget';
import type { User } from '@supabase/supabase-js';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDishaChatActive, setIsDishaChatActive] = useState(false);
  const particlesLoadedRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error getting initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Scroll to About section if ?scroll=about is present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('scroll') === 'about') {
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Wait for render
    }
  }, [location.search]);

  useEffect(() => {
    // Load particles.js only once and only if not already loaded
    if (!loading && !particlesLoadedRef.current) {
      particlesLoadedRef.current = true;
      // Check if particles.js is already loaded
      if (window.particlesJS) {
        initializeParticles();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = () => {
        if (window.particlesJS) {
          initializeParticles();
        }
      };
      script.onerror = () => {
        console.warn('Failed to load particles.js, continuing without particle effects');
      };
      document.head.appendChild(script);
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [loading]);

  const initializeParticles = () => {
    if (!window.particlesJS) return;
    try {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Authenticated user - clean focused interface
  if (user) {
    return (
      <div className="min-h-screen bg-background relative">
        {/* Particles Background */}
        <div id="particles-js" className="fixed top-0 left-0 w-full h-full opacity-30"></div>
        <Navigation />
        <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Explore the Cosmic Influences
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Discover how each planet shapes your destiny
            </p>
          </div>
          <PlanetGallery />
          
          {/* Cosmic Disha AI Button - Only for authenticated users */}
          <div className="w-full flex flex-col items-center mt-16 mb-8 px-4">
            <div className="w-full max-w-md flex justify-center">
              <CosmicButton onClick={() => setIsDishaChatActive(true)}>
                Start Disha AI
              </CosmicButton>
            </div>
            <p className="text-white/60 text-sm mt-4 text-center max-w-lg mx-auto leading-relaxed">
              🌟 Activate your personal cosmic AI guide for deep astrological insights and destiny decoding
            </p>
            {isDishaChatActive && (
              <p className="text-cosmic-gold text-xs mt-2 text-center animate-pulse">
                ✨ Loading Disha AI... ✨
              </p>
            )}
          </div>
          
          <ChatbotWidget userId={user.id} />
          <Footer />
        </div>
        
        {/* Voiceflow AI Widget - Only loads when activated */}
        <VoiceflowWidget 
          isActive={isDishaChatActive}
          userId={user.id}
        />
      </div>
    );
  }

  // Non-authenticated user - full homepage with all sections
  return (
    <div className="min-h-screen bg-background relative">
      {/* Particles Background */}
      <div id="particles-js" className="fixed top-0 left-0 w-full h-full opacity-30"></div>
      <Navigation />
      <HeroSection />
      <Footer />
    </div>
  );
};

// Extend window interface for particles.js
declare global {
  interface Window {
    particlesJS: (id: string, config: any) => void;
  }
}

export default Index;