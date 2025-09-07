import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showForgotPassword) {
        // Password reset flow
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/login`,
        });

        if (error) {
          toast({
            title: "Password Reset Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Password Reset Email Sent",
            description: "Please check your email for password reset instructions",
          });
          setShowForgotPassword(false);
        }
      } else if (isSignUp) {
        // Sign up flow
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive"
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: formData.name,
              phone: formData.phone
            }
          }
        });

        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Success!",
            description: "Please check your email to confirm your account",
          });
        }
      } else {
        // Sign in flow
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in",
          });
          onClose();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        toast({
          title: "Google Sign In Error", 
          description: `${error.message}. Please ensure Google OAuth is properly configured in Supabase Auth settings.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Redirecting to Google...",
          description: "You will be redirected to Google for authentication",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong with Google sign in. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            {showForgotPassword ? 'Reset Password' : (isSignUp ? 'Join KundliLabs' : 'Welcome Back')}
          </h2>
          <p className="text-white/70">
            {showForgotPassword 
              ? 'Enter your email to receive a password reset link'
              : (isSignUp 
                ? 'Create your account to unlock cosmic insights' 
                : 'Sign in to access your cosmic dashboard'
              )
            }
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!showForgotPassword && isSignUp && (
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-white/70">
                Full Name *
              </Label>
              <Input
                type="text"
                id="name"
                required={isSignUp}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1 bg-white/5 border-white/20 text-white placeholder-white/40 focus:ring-cosmic-purple"
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-white/70">
              Email Address *
            </Label>
            <Input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 bg-white/5 border-white/20 text-white placeholder-white/40 focus:ring-cosmic-purple"
              placeholder="Enter your email"
            />
          </div>

          {!showForgotPassword && isSignUp && (
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-white/70">
                Phone Number *
              </Label>
              <Input
                type="tel"
                id="phone"
                required={isSignUp}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1 bg-white/5 border-white/20 text-white placeholder-white/40 focus:ring-cosmic-purple"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          {!showForgotPassword && (
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-white/70">
                Password *
              </Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:ring-cosmic-purple pr-10"
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {!showForgotPassword && isSignUp && (
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-white/70">
                Confirm Password *
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                required={isSignUp}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="mt-1 bg-white/5 border-white/20 text-white placeholder-white/40 focus:ring-cosmic-purple"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {!showForgotPassword && isSignUp && (
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={(e) => handleInputChange('terms', e.target.checked)}
                required
                className="mt-1 h-4 w-4 text-cosmic-purple bg-white/5 border-white/20 rounded focus:ring-cosmic-purple"
              />
              <Label htmlFor="terms" className="text-sm text-white/70">
                I agree to the <a href="/terms" target="_blank" className="text-cosmic-purple hover:text-cosmic-pink underline">Terms & Conditions</a> *
              </Label>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full glow-on-hover"
            disabled={(isSignUp && !formData.terms && !showForgotPassword) || loading}
          >
            {loading ? 'Please wait...' : (showForgotPassword ? 'Send Reset Email' : (isSignUp ? 'Create Account' : 'Sign In'))}
          </Button>

          {!showForgotPassword && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-white/50">or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </>
          )}
        </form>

        {!showForgotPassword && (
          <div className="mt-6 text-center">
            <p className="text-white/70">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cosmic-purple hover:text-cosmic-pink font-medium transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        )}

        {!showForgotPassword && !isSignUp && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-cosmic-blue hover:text-cosmic-purple text-sm transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        )}

        {showForgotPassword && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-cosmic-blue hover:text-cosmic-purple text-sm transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;