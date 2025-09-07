import React from 'react';
import { XCircle, RefreshCw, AlertTriangle, ArrowLeft, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const DonationFailed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <XCircle className="h-16 w-16 text-red-500" />
                  <div className="absolute -top-2 -right-2">
                    <Globe className="h-6 w-6 text-orange-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-4">
                Donation Failed
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <p className="text-red-400 font-semibold">Payment Not Processed</p>
                </div>
                <p className="text-white/80 text-sm">
                  No charges have been made to your account.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  🌟 Lighthearted Message
                </h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Looks like Mercury went retrograde — your donation didn't go through. Want to give it another spin?
                </p>
              </div>

              <p className="text-white/60">
                Don't worry, cosmic timing can be tricky! Your payment was not processed and no amount has been charged.
              </p>
              
              <div className="space-y-4 pt-6">
                <Link to="/donate">
                  <Button className="w-full glow-on-hover">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                  <Link to="/blog">
                    <Button variant="outline" className="w-full">
                      Read Our Blog
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  Still having issues? Email us at <span className="text-cosmic-gold">kundlilabs@q5cg.onmicrosoft.com</span>
                </p>
                <p className="text-white/40 text-xs mt-1">
                  We typically respond within 24 hours
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

export default DonationFailed; 