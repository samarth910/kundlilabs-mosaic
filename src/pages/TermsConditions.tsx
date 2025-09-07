import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight gradient-text mb-6">
            KUNDLILABS - TERMS AND CONDITIONS OF SERVICE
          </h1>
          <div className="text-white/60 text-sm mb-8">Last Updated: 18 July 2025</div>
          
          <div className="space-y-8">
            {/* Acceptance Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">1. ACCEPTANCE OF BINDING AGREEMENT</h2>
              <div className="text-white/80 space-y-3">
                <p>By accessing, browsing, or using the Service in any manner, you irrevocably and unconditionally agree to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Be legally bound by these Terms, as they may be amended from time to time;</li>
                  <li>Affirm that you possess the legal capacity to enter into a contract, are of sound mind, and are not disqualified from contracting by any law (e.g., you are at least 18 years of age, as per the Indian Contract Act, 1872);</li>
                  <li>Accept and be bound by all future modifications, amendments, or updates to these Terms.</li>
                </ul>
                <p className="font-bold text-red-300">
                  IF YOU DO NOT UNCONDITIONALLY ACCEPT AND AGREE TO ALL OF THESE TERMS, YOU MUST IMMEDIATELY DISCONTINUE ALL ACCESS AND USE OF THE SERVICE.
                </p>
              </div>
            </div>

            {/* Nature of Service Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">2. NATURE OF SERVICE & FUNDAMENTAL DISCLAIMERS</h2>
              <div className="text-white/80 space-y-3">
                <ol className="list-decimal ml-6 space-y-3">
                  <li><strong>AI-Generated Content:</strong> The Service provides algorithmically generated outputs, interpretations, and textual content ("Astrological Content") based on traditional Parashari astrological texts and computational models.</li>
                  <li><strong>STRICTLY FOR ENTERTAINMENT AND INFORMATIONAL PURPOSES ONLY:</strong> The Astrological Content provided by the Service is EXCLUSIVELY, SOLELY, AND STRICTLY FOR ENTERTAINMENT, PERSONAL REFLECTION, AND GENERAL INFORMATIONAL PURPOSES. It is not intended to be, nor should it be construed as, a substitute for professional advice or guidance.</li>
                  <li><strong>NO WARRANTY OF ACCURACY, RELIABILITY, OR SUITABILITY:</strong> The Company EXPLICITLY AND UNEQUIVOCALLY DISCLAIMS ANY AND ALL REPRESENTATIONS, WARRANTIES, OR GUARANTEES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, regarding the accuracy, completeness, reliability, suitability, timeliness, non-infringement, merchantability, or fitness for a particular purpose of the Astrological Content or any other information provided through the Service.</li>
                  <li><strong>NO PROFESSIONAL ADVICE:</strong> The Astrological Content SHALL NOT UNDER ANY CIRCUMSTANCES BE CONSTRUED AS, NOR SHOULD IT BE RELIED UPON AS, MEDICAL, LEGAL, FINANCIAL, PSYCHOLOGICAL, BUSINESS, OR ANY OTHER FORM OF PROFESSIONAL ADVICE.</li>
                  <li><strong>NO SCIENTIFIC VALIDATION:</strong> You acknowledge and understand that astrology, by its very nature, lacks scientific validation and empirical verification.</li>
                  <li><strong>USER'S SOLE RESPONSIBILITY AND LIABILITY:</strong> You assume COMPLETE, SOLE, AND ABSOLUTE RESPONSIBILITY AND LIABILITY for all interpretations, actions, decisions, or consequences arising from your use of the Service.</li>
                </ol>
              </div>
            </div>

            {/* Payment Terms Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">4. PAYMENT TERMS</h2>
              <div className="text-white/80 space-y-3">
                <ol className="list-decimal ml-6 space-y-3">
                  <li><strong>Non-Refundable Payments:</strong> All payments made for the Service, including but not limited to subscription fees, are FINAL AND NON-REFUNDABLE, save and except where expressly prohibited by mandatory provisions of applicable Indian law, such as the Consumer Protection Act, 2019.</li>
                  <li><strong>Price Modifications:</strong> The Company reserves the right to modify its pricing, subscription plans, and billing methods for the Service AT ANY TIME WITHOUT PRIOR NOTICE.</li>
                </ol>
              </div>
            </div>

            {/* Liability Restrictions Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">6. LIABILITY RESTRICTIONS</h2>
              <div className="text-white/80 space-y-3">
                <ol className="list-decimal ml-6 space-y-3">
                  <li><strong>NO CONSEQUENTIAL, INDIRECT, OR SPECIAL DAMAGES:</strong> To the maximum extent permitted by applicable law, in no event shall the Company, its affiliates, directors, officers, employees, agents, or licensors be liable for any indirect, incidental, special, punitive, exemplary, or consequential damages whatsoever.</li>
                  <li><strong>ABSOLUTE CAP ON LIABILITY:</strong> The Company's maximum aggregate liability to you for any and all claims shall be strictly limited to the LOWER OF (A) INDIAN RUPEES ONE THOUSAND (₹1,000 INR) OR (B) THE ACTUAL FEES PAID BY YOU TO THE COMPANY FOR THE SERVICE IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</li>
                </ol>
              </div>
            </div>

            {/* Governing Law Section */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">8. GOVERNING LAW & DISPUTES</h2>
              <div className="text-white/80 space-y-3">
                <ol className="list-decimal ml-6 space-y-3">
                  <li><strong>GOVERNING LAW AND JURISDICTION:</strong> These Terms shall be governed by and construed exclusively in accordance with the laws of India. The courts in New Delhi, India, shall have exclusive jurisdiction.</li>
                  <li><strong>MANDATORY BINDING ARBITRATION:</strong> Any dispute shall be resolved exclusively by BINDING ARBITRATION in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of the arbitration shall be New Delhi, India.</li>
                </ol>
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-cosmic-purple mb-4">CONTACT INFORMATION</h2>
              <div className="text-white/80">
                <p>If you have any questions about these Terms & Conditions, please contact us through our website or customer support channels.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;