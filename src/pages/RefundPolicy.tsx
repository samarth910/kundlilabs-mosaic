import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Refund and Cancellation Policy</h1>
            <p className="text-white/70">Understanding our refund and cancellation terms</p>
          </div>

          <div className="space-y-6">
            {/* Current Free Access */}
            <div className="glass-card p-6 border border-cosmic-gold/30">
              <h2 className="text-xl font-bold text-cosmic-gold mb-4">🎁 CURRENT STATUS: FREE ACCESS</h2>
              <div className="text-white/80 space-y-3">
                <p>KundliLabs is currently offering free access to all users, courtesy of MosAIc. No payments are required at this time.</p>
                <p>This policy will apply when we transition to paid services in the future.</p>
              </div>
            </div>

            {/* Future Refund Policy */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">1. REFUND POLICY</h2>
              <div className="text-white/80 space-y-3">
                <p>When paid services are introduced:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Duration-based subscriptions:</strong> Refunds will be calculated on a pro-rata basis for unused time</li>
                  <li><strong>24-hour cooling period:</strong> Full refund available within 24 hours of initial purchase</li>
                  <li><strong>Service issues:</strong> Refunds available if technical issues prevent service access for more than 48 hours</li>
                  <li><strong>Cancellation:</strong> You may cancel anytime with refund for unused duration</li>
                </ul>
              </div>
            </div>

            {/* Cancellation Process */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">2. CANCELLATION PROCESS</h2>
              <div className="text-white/80 space-y-3">
                <p>To cancel your subscription when paid services begin:</p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Contact us at <span className="text-cosmic-gold">kundlilabs@q5cg.onmicrosoft.com</span></li>
                  <li>Include your account email and reason for cancellation</li>
                  <li>We will process your request within 2 business days</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                </ol>
              </div>
            </div>

            {/* Non-refundable Items */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">3. NON-REFUNDABLE ITEMS</h2>
              <div className="text-white/80 space-y-3">
                <p>The following will not be eligible for refunds:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Consultation time already used</li>
                  <li>Downloadable reports or content already accessed</li>
                  <li>Services cancelled after the cooling period due to change of mind</li>
                </ul>
              </div>
            </div>

            {/* Processing Time */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">4. PROCESSING TIME</h2>
              <div className="text-white/80 space-y-3">
                <ul className="list-disc ml-6 space-y-2">
                  <li>Refund requests processed within 2 business days</li>
                  <li>Refunds appear in original payment method within 5-7 business days</li>
                  <li>Bank processing times may vary</li>
                </ul>
              </div>
            </div>

            {/* Contact for Refunds */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">REFUND REQUESTS</h2>
              <div className="text-white/80">
                <p>For refund requests or questions about this policy, please contact us at:</p>
                <p className="text-cosmic-gold mt-2">kundlilabs@q5cg.onmicrosoft.com</p>
                <p className="text-sm mt-4">Please include your order details and reason for the refund request.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;