import React, { useEffect, useState } from 'react';
import { XCircle, RefreshCw, AlertTriangle, ArrowLeft, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const [errorReason, setErrorReason] = useState<string>('');

  useEffect(() => {
    // Try to get error reason from URL params
    const reason = searchParams.get('reason');
    const errorCode = searchParams.get('error_code');
    
    if (reason) {
      setErrorReason(reason);
    } else if (errorCode) {
      setErrorReason(`Error code: ${errorCode}`);
    }
  }, [searchParams]);

  const commonIssues = [
    {
      title: "Insufficient Balance",
      description: "Check if your account has sufficient funds"
    },
    {
      title: "Network Issues", 
      description: "Poor internet connection during payment"
    },
    {
      title: "Bank Restrictions",
      description: "Your bank might have blocked the transaction"
    },
    {
      title: "Card Issues",
      description: "Expired card or incorrect details entered"
    }
  ];

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
                    <AlertTriangle className="h-6 w-6 text-orange-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold gradient-text mb-4">
                Payment Failed
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-400 font-semibold">Payment Not Processed</p>
                </div>
                <p className="text-white/80 text-sm">
                  {errorReason || "We couldn't complete your payment. No charges have been made to your account."}
                </p>
              </div>

              <p className="text-xl text-white/80">
                Don't worry - your payment was not processed and no amount has been charged.
              </p>
              
              <div className="bg-cosmic-purple/10 border border-cosmic-purple/20 rounded-lg p-4">
                <h3 className="text-cosmic-purple font-semibold mb-3">Common Issues & Solutions</h3>
                <div className="grid gap-3">
                  {commonIssues.map((issue, index) => (
                    <div key={index} className="text-left text-sm">
                      <p className="text-white/80 font-medium">{issue.title}</p>
                      <p className="text-white/60">{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-white/60">
                You can retry the payment using a different method or contact our support team for assistance.
              </p>
              
              <div className="space-y-4 pt-6">
                <Link to="/pricing">
                  <Button className="w-full glow-on-hover">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Payment Again
                  </Button>
                </Link>
                
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

export default PaymentFailed;