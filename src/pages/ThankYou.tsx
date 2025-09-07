import React, { useEffect, useState } from 'react';
import { CheckCircle, Star, Gift } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UserCredits {
  total_credits: number;
  remaining_credits: number;
}

const ThankYou = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data: creditsData } = await supabase
            .from('user_credits')
            .select('total_credits, remaining_credits')
            .eq('user_id', user.id)
            .single();
          
          setCredits(creditsData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <div className="absolute -top-2 -right-2">
                    <Star className="h-6 w-6 text-cosmic-gold animate-pulse" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-4">
                Payment Successful! 🎉
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  <p className="text-green-400 font-semibold">Payment Confirmed</p>
                </div>
                <p className="text-white/80 text-sm">
                  Your transaction has been processed successfully and your credits have been activated.
                </p>
              </div>

              {!loading && credits && (
                <div className="bg-cosmic-purple/10 border border-cosmic-purple/20 rounded-lg p-4">
                  <h3 className="text-cosmic-purple font-semibold mb-2">Your Credits</h3>
                  <p className="text-white/80">
                    <span className="text-cosmic-gold font-bold">{credits.remaining_credits}</span> out of {credits.total_credits} credits available
                  </p>
                </div>
              )}
              
              <p className="text-xl text-white/80">
                Thank you for choosing KundliLabs! You can now explore the cosmos with our AI-powered Kundli assistant.
              </p>
              
              <p className="text-white/60">
                Your message credits are now active. Start your cosmic journey by asking about your personality, career, relationships, or any life questions.
              </p>
              
              <div className="space-y-4 pt-6">
                <Link to="/">
                  <Button className="w-full glow-on-hover">
                    🚀 Start Your Cosmic Journey
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full">
                      View Plans
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
                  Need help? Contact our support team anytime.
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

export default ThankYou;