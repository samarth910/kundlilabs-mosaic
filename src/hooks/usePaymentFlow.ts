import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
}

export interface PaymentState {
  isLoading: boolean;
  processingPlanId: string | null;
  error: string | null;
  retryCount: number;
  isRetrying: boolean;
}

export const usePaymentFlow = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isLoading: false,
    processingPlanId: null,
    error: null,
    retryCount: 0,
    isRetrying: false,
  });
  const { toast } = useToast();

  // Retry mechanism with exponential backoff
  const retryWithBackoff = useCallback(async (operation: () => Promise<any>, maxRetries = 3) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        setPaymentState(prev => ({
          ...prev,
          retryCount: attempt + 1,
          isRetrying: true,
        }));
      }
    }
  }, []);

  const initiatePayment = async (plan: PaymentPlan) => {
    // Prevent double-clicks and multiple payment windows
    if (paymentState.isLoading) {
      console.warn('Payment already in progress, ignoring duplicate request');
      return;
    }

    setPaymentState({
      isLoading: true,
      processingPlanId: plan.id,
      error: null,
      retryCount: 0,
      isRetrying: false,
    });

    try {
      // Check authentication first
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Please log in to purchase a plan');
      }

      console.log('Creating Razorpay order for user:', user.id, 'plan:', plan.name);

      // Create Razorpay order with retry mechanism
      const orderData = await retryWithBackoff(async () => {
        const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
          body: {
            plan_name: plan.name,
            amount: plan.price * 100, // Convert to paise
            message_credits: plan.credits
          }
        });

        if (error) {
          console.error('Order creation failed:', error);
          throw new Error(error.message || 'Failed to create payment order');
        }

        if (!data?.orderId || !data?.keyId) {
          console.error('Invalid order response:', data);
          throw new Error('Invalid payment order received');
        }

        return data;
      });

      console.log('Order created successfully:', orderData.orderId);

      // Check if Razorpay SDK is loaded
      if (!(window as any).Razorpay) {
        throw new Error('Payment system not loaded. Please refresh the page and try again.');
      }

      // Initialize Razorpay with enhanced options
      const razorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'KundliLabs',
        description: `${plan.name} Plan - ${plan.credits} Credits`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          await handlePaymentSuccess(response, plan);
        },
        prefill: {
          email: user.email,
          contact: user.user_metadata?.phone || '',
        },
        theme: {
          color: '#8B5CF6'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed by user');
            handlePaymentDismiss();
          },
          escape: true,
          backdropclose: false,
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
        timeout: 900, // 15 minutes timeout
        config: {
          display: {
            blocks: {
              utib: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi"
                  }
                ]
              },
              other: {
                name: "Other Payment methods",
                instruments: [
                  {
                    method: "card"
                  },
                  {
                    method: "netbanking"
                  }
                ]
              }
            },
            sequence: ["block.utib", "block.other"],
            preferences: {
              show_default_blocks: false
            }
          }
        }
      };

      const rzp = new (window as any).Razorpay(razorpayOptions);

      // Handle payment failures with detailed error messages
      rzp.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response);
        handlePaymentFailure(response);
      });

      // Handle payment errors
      rzp.on('payment.error', (response: any) => {
        console.error('Payment error:', response);
        handlePaymentError('Payment processing error. Please try again.');
      });

      // Open payment modal
      rzp.open();

    } catch (error: any) {
      console.error('Payment initialization error:', error);
      handlePaymentError(error.message || 'Failed to initialize payment');
    }
  };

  const handlePaymentSuccess = async (response: any, plan: PaymentPlan) => {
    try {
      console.log('Payment completed, verifying...', response);

      // Show processing message
      toast({
        title: "Processing Payment...",
        description: "Please wait while we verify your payment",
      });

      // Verify payment signature with retry mechanism
      const verifyData = await retryWithBackoff(async () => {
        const { data, error } = await supabase.functions.invoke('verify-razorpay-payment', {
          body: {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }
        });

        if (error) {
          console.error('Payment verification failed:', error);
          throw new Error('Payment verification failed. Please contact support if amount was deducted.');
        }

        return data;
      });

      console.log('Payment verified successfully:', verifyData);

      // Clear loading state
      setPaymentState({
        isLoading: false,
        processingPlanId: null,
        error: null,
        retryCount: 0,
        isRetrying: false,
      });

      // Show success message
      toast({
        title: "Payment Successful! 🎉",
        description: `Welcome to ${plan.name} plan! Your ${plan.credits} credits have been added.`,
      });

      // Redirect to success page
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 1500);

    } catch (error: any) {
      console.error('Payment verification error:', error);
      setPaymentState({
        isLoading: false,
        processingPlanId: null,
        error: error.message,
        retryCount: 0,
        isRetrying: false,
      });

      toast({
        title: "Payment Verification Failed",
        description: error.message || "Please contact support if payment was deducted",
        variant: "destructive"
      });

      // Redirect to failure page
      setTimeout(() => {
        window.location.href = '/payment-failed';
      }, 2000);
    }
  };

  const handlePaymentFailure = (response: any) => {
    console.error('Payment failed:', response);
    
    let errorMessage = 'Payment failed. Please try again.';
    
    // Provide more specific error messages based on failure reason
    if (response?.error?.code) {
      switch (response.error.code) {
        case 'PAYMENT_CANCELLED':
          errorMessage = 'Payment was cancelled. You can try again anytime.';
          break;
        case 'PAYMENT_DECLINED':
          errorMessage = 'Payment was declined by your bank. Please check your card details or try a different payment method.';
          break;
        case 'INSUFFICIENT_FUNDS':
          errorMessage = 'Insufficient funds in your account. Please try with a different payment method.';
          break;
        case 'NETWORK_ERROR':
          errorMessage = 'Network error occurred. Please check your internet connection and try again.';
          break;
        default:
          errorMessage = response?.error?.description || errorMessage;
      }
    }
    
    setPaymentState({
      isLoading: false,
      processingPlanId: null,
      error: errorMessage,
      retryCount: 0,
      isRetrying: false,
    });

    toast({
      title: "Payment Failed",
      description: errorMessage,
      variant: "destructive"
    });

    // Redirect to failure page
    setTimeout(() => {
      window.location.href = '/payment-failed';
    }, 2000);
  };

  const handlePaymentDismiss = () => {
    console.log('Payment dismissed by user');
    setPaymentState({
      isLoading: false,
      processingPlanId: null,
      error: null,
      retryCount: 0,
      isRetrying: false,
    });
  };

  const handlePaymentError = (errorMessage: string) => {
    setPaymentState({
      isLoading: false,
      processingPlanId: null,
      error: errorMessage,
      retryCount: 0,
      isRetrying: false,
    });

    toast({
      title: "Payment Error",
      description: errorMessage,
      variant: "destructive"
    });
  };

  const clearError = () => {
    setPaymentState(prev => ({ 
      ...prev, 
      error: null,
      retryCount: 0,
      isRetrying: false,
    }));
  };

  const retryPayment = async (plan: PaymentPlan) => {
    if (paymentState.retryCount >= 3) {
      toast({
        title: "Maximum Retries Reached",
        description: "Please try again later or contact support",
        variant: "destructive"
      });
      return;
    }

    await initiatePayment(plan);
  };

  return {
    paymentState,
    initiatePayment,
    clearError,
    retryPayment,
  };
};