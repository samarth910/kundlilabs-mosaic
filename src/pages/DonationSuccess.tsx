import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, Star, Heart, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useSearchParams } from 'react-router-dom';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentId, setPaymentId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Get payment ID and amount from URL params
    const id = searchParams.get('payment_id');
    const amt = searchParams.get('amount');
    if (id) {
      setPaymentId(id);
    }
    if (amt) {
      setAmount(amt);
    }
    // Initialize fireworks animation
    if (canvasRef.current) {
      initializeFireworks();
    }
  }, [searchParams]);

  const initializeFireworks = () => {
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

    // Fireworks particles
    const particles: any[] = [];
    const fireworks: any[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 100;
        this.maxLife = 100;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life--;
      }

      draw() {
        if (!ctx) return;
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      speed: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height * 0.6;
        this.speed = 3 + Math.random() * 2;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      }

      update() {
        this.y -= this.speed;
        return this.y <= this.targetY;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      explode() {
        const particleCount = 50 + Math.random() * 50;
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount;
          const speed = 2 + Math.random() * 3;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          particles.push(new Particle(this.x, this.y, vx, vy, this.color));
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new fireworks
      if (Math.random() < 0.05) {
        fireworks.push(new Firework());
      }

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.update();
        firework.draw();

        if (firework.y <= firework.targetY) {
          firework.explode();
          fireworks.splice(i, 1);
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }

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
      {/* Fireworks Canvas */}
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
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <div className="absolute -top-2 -right-2">
                    <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-4">
                Donation Successful! 🎉
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-green-500" />
                  <p className="text-green-400 font-semibold">Thank You!</p>
                </div>
                <p className="text-white/80 text-sm">
                  Your generous donation has been processed successfully.
                </p>
                {amount && (
                  <div className="mt-4">
                    <span className="text-3xl font-bold gradient-text block">You donated ₹{amount}</span>
                  </div>
                )}
              </div>

              {paymentId && (
                <div className="bg-cosmic-purple/10 border border-cosmic-purple/20 rounded-lg p-4">
                  <h3 className="text-cosmic-purple font-semibold mb-2">Payment Reference</h3>
                  <p className="text-white/80 font-mono text-sm">
                    ID: {paymentId}
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 border border-cosmic-purple/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  A Message from KundliLabs Team
                </h3>
                <p className="text-white/90 leading-relaxed">
                  We're deeply grateful for your support. Thanks to your generosity, we'll continue building and keeping AI Kundli accessible for everyone.
                </p>
              </div>
              
              <p className="text-white/60">
                Your contribution helps us maintain and improve our cosmic AI platform for the community.
              </p>
              
              <div className="space-y-4 pt-6">
                <Link to="/">
                  <Button className="w-full glow-on-hover">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/blog">
                    <Button variant="outline" className="w-full">
                      Read Our Blog
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  Questions? Contact us at <span className="text-cosmic-gold">kundlilabs@q5cg.onmicrosoft.com</span>
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

export default DonationSuccess; 