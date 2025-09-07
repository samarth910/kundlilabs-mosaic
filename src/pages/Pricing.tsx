import React from 'react';
import { Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const donationTiers = [
  {
    name: "Liked Us",
    price: "₹51",
    description: "Small gestures, big impact!",
    details: "You're helping keep the lights on—thank you for giving us a cosmic push 🚀",
    popular: false
  },
  {
    name: "Loved Us",
    price: "₹201", 
    description: "You're fueling the stars!",
    details: "Your support helps us build better features and serve more users 🌟",
    popular: true
  },
  {
    name: "Can't Live Without Us",
    price: "₹501",
    description: "You're our North Star!",
    details: "You believe in our vision—and you're helping us reach the universe 🙌",
    popular: false
  }
];

const Pricing = () => {
  const { toast } = useToast();
  
  const handleDonation = async (tierName: string, price: string) => {
    try {
      console.log("Starting donation process for:", tierName);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to make a donation",
          variant: "destructive"
        });
        return;
      }

      console.log("User authenticated, creating donation order...");

      // Create Razorpay order for donation
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          plan_name: `${tierName} Donation`,
          amount: parseInt(price.replace('₹', '')) * 100, // Convert to paise
          message_credits: 0  // No credits for donations
        }
      });

      if (error) {
        console.error("Order creation error:", error);
        throw new Error(error.message);
      }

      if (!data || !data.orderId) {
        console.error("Invalid order response:", data);
        throw new Error("Failed to create order");
      }

      console.log("Order created successfully:", data.orderId);

      // Initialize Razorpay payment
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'KundliLabs',
        description: `${tierName} - Thank you for your support!`,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            console.log("Payment completed, verifying...", response);
            
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }
            });

            if (verifyError) {
              console.error("Payment verification error:", verifyError);
              throw new Error(verifyError.message);
            }

            console.log("Payment verified successfully:", verifyData);

            toast({
              title: "Donation Successful! 💖",
              description: "Thank you for your generous support! Your kindness helps us grow 🌟"
            });

            // Redirect to thank you page
            setTimeout(() => {
              window.location.href = '/thank-you';
            }, 2000);
            
          } catch (err) {
            console.error("Payment verification failed:", err);
            toast({
              title: "Donation Verification Failed",
              description: "Please contact support if payment was deducted. Error: " + (err instanceof Error ? err.message : 'Unknown error'),
              variant: "destructive"
            });
          }
        },
        prefill: {
          email: user.email,
          contact: user.user_metadata?.phone || ''
        },
        theme: {
          color: '#7c3aed'
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal dismissed");
          }
        }
      };

      console.log("Initializing Razorpay with options:", options);

      // Check if Razorpay is loaded
      if (!(window as any).Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page and try again.");
      }

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error("Payment failed:", response);
        toast({
          title: "Donation Failed",
          description: response.error.description || "Donation failed. Please try again.",
          variant: "destructive"
        });
        
        setTimeout(() => {
          window.location.href = '/payment-failed';
        }, 2000);
      });

      rzp.open();
      
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Error",
        description: "Failed to initiate donation: " + (error instanceof Error ? error.message : 'Unknown error'),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              🪐 Support Our Journey
            </h1>
            <p className="text-xl text-white/70 max-w-4xl mx-auto">
              We're in our MVP phase—no charges yet, just your kindness! If our AI-powered Kundli readings brought you value, consider donating to help us grow. Choose the vibe that matches how you feel 💫
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {donationTiers.map((tier, index) => (
              <Card 
                key={tier.name} 
                className={`glass-card relative ${tier.popular ? 'border-cosmic-purple shadow-cosmic-glow' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cosmic-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    💖 {tier.name}
                  </CardTitle>
                  <CardDescription className="text-white/70 mb-4">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                  </div>
                </CardHeader>

                <CardContent className="text-center">
                  <p className="text-white/80 leading-relaxed">
                    {tier.details}
                  </p>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full"
                    variant="default"
                    onClick={() => handleDonation(tier.name, tier.price)}
                  >
                    Donate {tier.price}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/60">
              ✅ All donations are processed securely. Your generosity helps us improve and expand our cosmic offerings.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;