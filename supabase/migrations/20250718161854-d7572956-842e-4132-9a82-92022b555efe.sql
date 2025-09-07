-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount INTEGER NOT NULL, -- Amount in paise (Indian currency)
  currency TEXT DEFAULT 'INR',
  plan_name TEXT NOT NULL, -- Basic, Pro, Premium
  message_credits INTEGER NOT NULL, -- 5, 25, 100
  status TEXT DEFAULT 'pending', -- pending, completed, failed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_credits table to track message credits
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_credits INTEGER DEFAULT 0,
  used_credits INTEGER DEFAULT 0,
  remaining_credits INTEGER DEFAULT 0,
  last_purchase_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Update orders" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Create policies for user_credits
CREATE POLICY "Users can view their own credits" 
ON public.user_credits 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Insert user credits" 
ON public.user_credits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Update user credits" 
ON public.user_credits 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Function to update remaining credits
CREATE OR REPLACE FUNCTION public.update_remaining_credits()
RETURNS TRIGGER AS $$
BEGIN
  NEW.remaining_credits = NEW.total_credits - NEW.used_credits;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate remaining credits
CREATE TRIGGER update_user_credits_remaining
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_remaining_credits();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();