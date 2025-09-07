import React, { useEffect, useRef } from 'react';
import { Mail, Star, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize floating orbs animation
    if (canvasRef.current) {
      initializeFloatingOrbs();
    }
  }, []);

  const initializeFloatingOrbs = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating orbs
    const orbs: any[] = [];
    const orbCount = 15;

    class Orb {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2 + Math.random() * 4;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.color = `hsl(${200 + Math.random() * 60}, 70%, 70%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create orbs
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw orbs
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Orbs Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="glass-card backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Mail className="h-16 w-16 text-cosmic-purple" />
                  <div className="absolute -top-2 -right-2">
                    <Star className="h-6 w-6 text-cosmic-gold animate-pulse" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-4">
                Get in Touch
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 border border-cosmic-purple/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Have a cosmic query or just want to say hi?
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Even ancient sages needed tech support — Parāśara probably would've loved AI if he had a WiFi connection. We're here to combine the best of astrology and modern intelligence.
                </p>
              </div>

              <div className="bg-cosmic-purple/10 border border-cosmic-purple/20 rounded-lg p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="h-5 w-5 text-cosmic-gold" />
                  <h3 className="text-cosmic-purple font-semibold">Email Us</h3>
                  <Sparkles className="h-5 w-5 text-cosmic-gold" />
                </div>
                <a 
                  href="mailto:kundlilabs@q5cg.onmicrosoft.com"
                  className="text-2xl font-bold text-cosmic-gold hover:text-cosmic-pink transition-colors break-all"
                >
                  kundlilabs@q5cg.onmicrosoft.com
                </a>
              </div>

              <div className="space-y-4">
                <p className="text-white/80">
                  Whether you have questions about your Kundli, need technical support, or just want to share your cosmic journey with us, we'd love to hear from you.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-cosmic-gold font-semibold mb-2">Technical Support</h4>
                    <p className="text-white/70">Issues with the platform or AI assistant</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-cosmic-gold font-semibold mb-2">Astrological Queries</h4>
                    <p className="text-white/70">Questions about readings or interpretations</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-cosmic-gold font-semibold mb-2">Partnership</h4>
                    <p className="text-white/70">Business opportunities and collaborations</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-cosmic-gold font-semibold mb-2">Feedback</h4>
                    <p className="text-white/70">Share your experience and suggestions</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  We typically respond within 24 hours during business days
                </p>
                <p className="text-white/40 text-xs mt-1">
                  🌟 May the stars guide your message to us 🌟
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 