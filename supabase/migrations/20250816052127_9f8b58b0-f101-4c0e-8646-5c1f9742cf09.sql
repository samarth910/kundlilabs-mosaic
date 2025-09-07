-- Fix function search path mutable warnings by setting search_path to public

-- Update validate_order_data function to set search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update validate_user_credits function to set search_path  
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;