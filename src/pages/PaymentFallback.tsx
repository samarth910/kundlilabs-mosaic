import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const PaymentFallback = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-12 px-4 sm:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Sparkles className="h-16 w-16 text-cosmic-purple animate-pulse" />
                  <div className="absolute -top-2 -right-2">
                    <AlertTriangle className="h-6 w-6 text-orange-500 animate-bounce" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-4">
                Payment Status Uncertain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-cosmic-purple/10 border border-cosmic-purple/20 rounded-lg p-4 mb-6">
                <p className="text-white/80 text-lg">
                  It seems the cosmic winds are uncertain... your payment might be stuck.
                </p>
                <p className="text-cosmic-gold mt-2 text-base font-semibold">
                  "Oops! Looks like Rahu clouded the Moon 🌑. We couldn’t see your donation this time."
                </p>
                <p className="text-white/60 mt-2">
                  Please try again – the stars will align soon ✨
                </p>
              </div>
              <div className="space-y-4 pt-6">
                <Button className="w-full glow-on-hover" onClick={() => navigate(-1)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Payment
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  Still having issues? Email us at <span className="text-cosmic-gold">kundlilabs@q5cg.onmicrosoft.com</span>
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

export default PaymentFallback;
