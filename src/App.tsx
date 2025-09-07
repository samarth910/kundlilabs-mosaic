import { useState, useEffect, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Donate from "./pages/Donate";
import DonationSuccess from "./pages/DonationSuccess";
import DonationFailed from "./pages/DonationFailed";
import ThankYou from "./pages/ThankYou";
import PaymentFailed from "./pages/PaymentFailed";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ChatbotWidget from "./components/ChatbotWidget";
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import PaymentFallback from "./pages/PaymentFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Consolidated auth state management
  const handleAuthStateChange = useCallback((event: string, session: Session | null) => {
    console.log('Auth state changed:', event, session?.user?.email);
    
    setSession(session);
    setUser(session?.user ?? null);
    setIsLoading(false);
    setAuthError(null);
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setAuthError(null);

      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting initial session:', error);
        setAuthError(error.message);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Error initializing auth:', error);
      setAuthError('Failed to initialize authentication');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initialize auth state
    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [initializeAuth, handleAuthStateChange]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple mx-auto mb-4"></div>
          <p className="text-white/70">Initializing...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (authError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Authentication Error</h2>
          <p className="text-white/70 mb-4">{authError}</p>
          <button 
            onClick={initializeAuth}
            className="px-4 py-2 bg-cosmic-purple text-white rounded-lg hover:bg-cosmic-purple/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/donation-failed" element={<DonationFailed />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/payment-fallback" element={<PaymentFallback />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Show chatbot widget only for authenticated users */}
          {user && <ChatbotWidget userId={user.id} />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
