import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';

const About = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-violet-900/30 to-purple-900/30"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-full">
            <span className="text-cosmic-gold text-sm font-medium">🎁 Free for Now</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6 px-4 leading-tight">
            Astrology That Talks Back.
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Meet Dishaa — your 24/7 AI astrologer. No waiting. No limits.
          </p>
          <Button onClick={() => setShowAuthModal(true)} size="lg">
            Start Talking to Dishaa
          </Button>
        </div>
      </section>

      {/* About + Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-cosmic-purple mb-6">About KundliLabs</h2>
              <p className="text-white/80 mb-6">
                At KundliLabs, we're bringing Vedic astrology to life through Dishaa, your AI-powered guide who listens, responds, and evolves with every conversation. No reports. No waiting. Just dialogue — anytime you need clarity.
              </p>
              
              <h3 className="text-2xl font-bold text-cosmic-gold mb-4">Our Mission</h3>
              <p className="text-white/80">
                We believe astrology works best when it feels personal and accessible. Our mission is to remove the friction: no long waitlists, no rigid consultations, no uncertainty about costs.
              </p>
              <p className="text-white/80 mt-4">
                With AI, we've made astrology instant, conversational, and affordable, without losing its authenticity.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="glass-card p-8 w-full max-w-md">
              <div className="bg-gradient-to-br from-cosmic-purple/20 to-cosmic-gold/20 rounded-xl p-6 border border-white/10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cosmic-purple/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">AI-Powered Astrology</h4>
                  <p className="text-white/60 text-sm">Experience the future today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cosmic-purple/10 to-cosmic-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">What Makes Us Different</h2>
            <p className="text-xl text-white/80">Experience the future of astrology today</p>
          </div>
          
          {/* First row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2">Meet Dishaa</h3>
              <p className="text-white/70 text-sm">your 24/7 AI astrologer</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white mb-2">Real Conversations</h3>
              <p className="text-white/70 text-sm">not reports — ask, discuss, and explore</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">⏳</div>
              <h3 className="text-lg font-semibold text-white mb-2">No Waiting Time</h3>
              <p className="text-white/70 text-sm">insights the moment you want them</p>
            </div>
            
            <div className="glass-card p-6 text-center relative">
              <div className="absolute -top-2 -right-2 bg-cosmic-gold text-black text-xs px-2 py-1 rounded-full font-semibold">FREE</div>
              <div className="text-3xl mb-4">🎁</div>
              <h3 className="text-lg font-semibold text-white mb-2">Currently Free</h3>
              <p className="text-white/70 text-sm">MosAIc courtesy — early access for everyone</p>
            </div>
          </div>
          
          {/* Second row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">🔮</div>
              <h3 className="text-lg font-semibold text-white mb-2">Authentic</h3>
              <p className="text-white/70 text-sm">Built on genuine Vedic astrological calculations</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Always On</h3>
              <p className="text-white/70 text-sm">Always available, zero waiting</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Freedom to Explore</h3>
              <p className="text-white/70 text-sm">Unlimited conversations within your chosen duration</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-lg font-semibold text-white mb-2">Transparent Pricing</h3>
              <p className="text-white/70 text-sm">Duration-based, unlimited chats. (Currently free!)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision + Philosophy */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 via-transparent to-cosmic-gold/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <div className="w-16 h-16 bg-cosmic-purple/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔮</span>
            </div>
            
            <h2 className="text-3xl font-bold gradient-text mb-8">Our Vision</h2>
            <p className="text-white/80 text-lg mb-8">
              We see astrology as a tool for <strong className="text-cosmic-gold">empowerment</strong>, not dependency. With Dishaa, we want to make this wisdom a living, conversational experience that fits seamlessly into modern life — whether you're navigating career moves, relationships, or personal growth.
            </p>
            
            <h3 className="text-2xl font-bold text-cosmic-purple mb-6">Our Philosophy</h3>
            <p className="text-white/80 text-lg">
              Astrology is about <strong className="text-cosmic-gold">possibility</strong>, not fate. That's why Dishaa doesn't just "predict" — she helps you <strong className="text-cosmic-gold">reflect</strong>, understand, and act with clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-violet-900/40 to-purple-900/40"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Your Cosmic Guide Is Ready. Are You?</h2>
          <p className="text-white/80 text-lg mb-8">Free access, courtesy of MosAIc (limited time).</p>
          <Button onClick={() => setShowAuthModal(true)} size="lg">
            Talk to Dishaa Free
          </Button>
        </div>
      </section>
      
      <Footer />
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default About;