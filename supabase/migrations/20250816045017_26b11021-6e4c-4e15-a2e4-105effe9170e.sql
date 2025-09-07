-- Create user_credits table to track user message credits
CREATE TABLE public.user_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_credits INTEGER NOT NULL DEFAULT 0,
  used_credits INTEGER NOT NULL DEFAULT 0,
  remaining_credits INTEGER NOT NULL DEFAULT 0,
  last_purchase_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table to track payment transactions
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  message_credits INTEGER NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_credits
CREATE POLICY "Users can view their own credits" 
ON public.user_credits 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits" 
ON public.user_credits 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Service can insert credits" 
ON public.user_credits 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service can update orders" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_razorpay_order_id ON public.orders(razorpay_order_id);