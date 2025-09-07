import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
            <p className="text-white/70">Your privacy is important to us</p>
          </div>

          <div className="space-y-6">
            {/* Information Collection */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">1. INFORMATION WE COLLECT</h2>
              <div className="text-white/80 space-y-3">
                <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Birth details for astrological calculations (date, time, place of birth)</li>
                  <li>Usage data and chat interactions with our AI astrology service</li>
                  <li>Payment information for subscription services</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">2. HOW WE USE YOUR INFORMATION</h2>
              <div className="text-white/80 space-y-3">
                <ul className="list-disc ml-6 space-y-2">
                  <li>Provide, maintain, and improve our astrological services</li>
                  <li>Generate personalized astrological readings and predictions</li>
                  <li>Process payments and manage your account</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">3. INFORMATION SHARING</h2>
              <div className="text-white/80 space-y-3">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>With service providers who assist us in operating our platform</li>
                  <li>To comply with legal obligations or protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">4. DATA SECURITY</h2>
              <div className="text-white/80 space-y-3">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">5. YOUR RIGHTS</h2>
              <div className="text-white/80 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">CONTACT US</h2>
              <div className="text-white/80">
                <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-cosmic-gold">kundlilabs@q5cg.onmicrosoft.com</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;