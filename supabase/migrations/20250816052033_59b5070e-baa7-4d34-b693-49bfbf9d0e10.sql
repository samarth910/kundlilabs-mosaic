-- Fix critical RLS policies for financial security

-- Drop existing overpermissive policies for orders table
DROP POLICY IF EXISTS "Service can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Service can update orders" ON public.orders;

-- Create secure policies for orders table
-- Only allow inserts when user_id matches authenticated user
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id AND status = 'pending' AND amount > 0);

-- Only allow service role to update order status after payment verification
CREATE POLICY "Service can update order status" 
ON public.orders 
FOR UPDATE 
TO service_role
USING (true)
WITH CHECK (status IN ('completed', 'failed', 'cancelled'));

-- Drop existing overpermissive policy for user_credits table  
DROP POLICY IF EXISTS "Service can insert credits" ON public.user_credits;
DROP POLICY IF EXISTS "Users can update their own credits" ON public.user_credits;

-- Create secure policies for user_credits table
-- Only service role can insert credits (after payment verification)
CREATE POLICY "Service can insert user credits" 
ON public.user_credits 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Only service role can update credits (after payment verification)  
CREATE POLICY "Service can update user credits" 
ON public.user_credits 
FOR UPDATE 
TO service_role
USING (true)
WITH CHECK (remaining_credits >= 0 AND used_credits >= 0);

-- Add validation trigger for orders to ensure proper data integrity
CREATE OR REPLACE FUNCTION validate_order_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure amount is positive
  IF NEW.amount <= 0 THEN
    RAISE EXCEPTION 'Order amount must be positive';
  END IF;
  
  -- Ensure message_credits is positive
  IF NEW.message_credits <= 0 THEN
    RAISE EXCEPTION 'Message credits must be positive';
  END IF;
  
  -- Ensure user_id is provided
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'User ID is required';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER validate_order_trigger
  BEFORE INSERT OR UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION validate_order_data();

-- Add validation trigger for user_credits
CREATE OR REPLACE FUNCTION validate_user_credits()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure credits are non-negative
  IF NEW.remaining_credits < 0 THEN
    RAISE EXCEPTION 'Remaining credits cannot be negative';
  END IF;
  
  IF NEW.used_credits < 0 THEN
    RAISE EXCEPTION 'Used credits cannot be negative';
  END IF;
  
  IF NEW.total_credits < 0 THEN
    RAISE EXCEPTION 'Total credits cannot be negative';
  END IF;
  
  -- Ensure credits math is correct
  IF NEW.total_credits != (NEW.used_credits + NEW.remaining_credits) THEN
    RAISE EXCEPTION 'Credits math error: total must equal used + remaining';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER validate_user_credits_trigger
  BEFORE INSERT OR UPDATE ON public.user_credits
  FOR EACH ROW EXECUTE FUNCTION validate_user_credits();