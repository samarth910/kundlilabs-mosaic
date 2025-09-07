import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface UserSubscription {
  hasActiveSubscription: boolean;
  activePlan: string | null;
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  lastPurchaseAt: string | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const useUserSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<UserSubscription>({
    hasActiveSubscription: false,
    activePlan: null,
    totalCredits: 0,
    usedCredits: 0,
    remainingCredits: 0,
    lastPurchaseAt: null,
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Retry mechanism with exponential backoff
  const retryWithBackoff = useCallback(async (operation: () => Promise<any>) => {
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
        setRetryCount(attempt + 1);
      }
    }
  }, []);

  const fetchUserSubscription = useCallback(async () => {
    if (!user) return;

    try {
      setSubscription(prev => ({ ...prev, isLoading: true, error: null }));

      // Fetch user credits with retry mechanism
      const creditsData = await retryWithBackoff(async () => {
        const { data, error } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        return data;
      });

      // Fetch latest completed order with retry mechanism
      const orderData = await retryWithBackoff(async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('plan_name, created_at')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          throw error;
        }

        return data;
      });

      const hasCredits = creditsData && creditsData.remaining_credits > 0;
      const latestOrder = orderData?.[0];

      setSubscription({
        hasActiveSubscription: hasCredits,
        activePlan: hasCredits ? latestOrder?.plan_name || null : null,
        totalCredits: creditsData?.total_credits || 0,
        usedCredits: creditsData?.used_credits || 0,
        remainingCredits: creditsData?.remaining_credits || 0,
        lastPurchaseAt: creditsData?.last_purchase_at || null,
        isLoading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      });

      setRetryCount(0);

    } catch (error: any) {
      console.error('Failed to fetch user subscription:', error);
      setSubscription(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to load subscription data',
        lastUpdated: new Date().toISOString(),
      }));
    }
  }, [user, retryWithBackoff]);

  // Set up real-time subscription for credit updates
  useEffect(() => {
    if (!user) {
      setSubscription({
        hasActiveSubscription: false,
        activePlan: null,
        totalCredits: 0,
        usedCredits: 0,
        remainingCredits: 0,
        lastPurchaseAt: null,
        isLoading: false,
        error: null,
        lastUpdated: null,
      });
      return;
    }

    fetchUserSubscription();

    // Set up real-time subscription for user_credits table
    const creditsSubscription = supabase
      .channel('user_credits_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_credits',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Credits updated:', payload);
          // Refresh subscription data when credits change
          fetchUserSubscription();
        }
      )
      .subscribe();

    // Set up real-time subscription for orders table
    const ordersSubscription = supabase
      .channel('user_orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Order updated:', payload);
          // Refresh subscription data when orders change
          fetchUserSubscription();
        }
      )
      .subscribe();

    return () => {
      creditsSubscription.unsubscribe();
      ordersSubscription.unsubscribe();
    };
  }, [user, fetchUserSubscription]);

  const refreshSubscription = useCallback(() => {
    fetchUserSubscription();
  }, [fetchUserSubscription]);

  const retryFetch = useCallback(() => {
    if (retryCount < maxRetries) {
      fetchUserSubscription();
    }
  }, [retryCount, fetchUserSubscription]);

  // Auto-refresh subscription data every 5 minutes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      fetchUserSubscription();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [user, fetchUserSubscription]);

  return {
    subscription,
    refreshSubscription,
    retryFetch,
    retryCount,
    maxRetries,
  };
};