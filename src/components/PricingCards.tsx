import { Check, Star, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { usePaymentFlow } from '@/hooks/usePaymentFlow';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import type { User } from '@supabase/supabase-js';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  credits: number;
  features: string[];
  popular?: boolean;
  gradient: string;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 1,
    credits: 50,
    features: [
      '50 AI Chat Credits',
      'Basic Kundli Analysis',
      'Daily Predictions',
      'Email Support'
    ],
    gradient: 'from-cosmic-blue to-cosmic-purple'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2,
    originalPrice: 5,
    credits: 150,
    features: [
      '150 AI Chat Credits',
      'Advanced Kundli Analysis',
      'Detailed Reports',
      'Priority Support',
      'Career Guidance',
      'Relationship Insights'
    ],
    popular: true,
    gradient: 'from-cosmic-purple to-cosmic-pink'
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 3,
    originalPrice: 10,
    credits: 1000,
    features: [
      '1000 AI Chat Credits',
      'Premium Kundli Analysis',
      'Unlimited Reports',
      '24/7 Priority Support',
      'Personal Astrologer',
      'All Future Updates',
      'Exclusive Features'
    ],
    gradient: 'from-cosmic-gold to-cosmic-pink'
  }
];

interface PricingCardsProps {
  user: User | null;
}

const PricingCards = ({ user }: PricingCardsProps) => {
  const { paymentState, initiatePayment } = usePaymentFlow();
  const { subscription } = useUserSubscription(user);

  const handlePurchase = (plan: PricingPlan) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    initiatePayment(plan);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4">
          Choose Your Cosmic Journey
        </h2>
        <p className="text-xl text-white/70">
          Unlock the power of AI-driven Vedic astrology
        </p>
        {subscription.isLoading && (
          <p className="text-white/50 mt-2">Loading subscription status...</p>
        )}
      </div>

      {/* Current Subscription Status */}
      {user && subscription.hasActiveSubscription && (
        <Card className="glass-card mb-8 max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-cosmic-gold" />
              <h3 className="text-lg font-semibold text-white">Active Plan</h3>
            </div>
            <p className="text-cosmic-gold font-medium">{subscription.activePlan}</p>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-white/80">
                  Credits: {subscription.remainingCredits} of {subscription.totalCredits} remaining
                </p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isActive = subscription.hasActiveSubscription && subscription.activePlan === plan.name;
          const isDisabled = subscription.hasActiveSubscription && !isActive;
          const isProcessing = paymentState.isLoading && paymentState.processingPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative glass-card p-8 text-center transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'border-2 border-cosmic-gold' : ''
              } ${isActive ? 'ring-2 ring-cosmic-gold' : ''} ${
                isDisabled ? 'opacity-60' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cosmic-gold to-cosmic-pink text-white">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </span>
                </div>
              )}

              {isActive && (
                <div className="absolute -top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 text-white">
                    Active Plan
                  </span>
                </div>
              )}

              <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${plan.gradient} mb-6`}>
                <Star className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-xl text-white/50 line-through">₹{plan.originalPrice}</span>
                  )}
                </div>
                <p className="text-white/70 mt-2">{plan.credits} AI Chat Credits</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-cosmic-gold flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(plan)}
                disabled={paymentState.isLoading || isDisabled}
                className={`w-full py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-green-600 hover:bg-green-700 cursor-default'
                    : `bg-gradient-to-r ${plan.gradient} hover:opacity-90 glow-on-hover`
                } ${isProcessing ? 'animate-pulse' : ''}`}
              >
                {isActive
                  ? 'Current Plan'
                  : isProcessing
                  ? 'Processing...'
                  : isDisabled
                  ? 'Unavailable'
                  : !user
                  ? 'Login to Purchase'
                  : 'Buy Now'
                }
              </Button>
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="text-center mt-12">
        <div className="flex items-center justify-center gap-2 text-white/60">
          <Shield className="w-4 h-4" />
          <p className="text-sm">
            Secure payments powered by Razorpay • All transactions are encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;