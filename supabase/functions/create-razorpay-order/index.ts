import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Creating Razorpay order - Request received");
    
    // Validate request method
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }
    
    // Parse and validate request body
    const body = await req.json();
    const { plan_name, amount, message_credits } = body;
    
    // Validate required fields
    if (!plan_name || !amount || message_credits === undefined) {
      throw new Error("Missing required fields: plan_name, amount, message_credits");
    }
    
    // Validate amount is positive integer
    if (typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
      throw new Error("Amount must be a positive integer in paise");
    }
    
    // Validate message_credits is non-negative integer
    if (typeof message_credits !== 'number' || message_credits < 0 || !Number.isInteger(message_credits)) {
      throw new Error("Message credits must be a non-negative integer");
    }
    
    console.log("Order details validated:", { plan_name, amount, message_credits });

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      throw new Error("No authorization header provided");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      console.error("User authentication failed:", userError);
      throw new Error("User not authenticated");
    }

    console.log("User authenticated:", user.id);

    // Get Razorpay credentials from environment
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    console.log("Debug - RAZORPAY_KEY_ID exists:", !!razorpayKeyId);
    console.log("Debug - RAZORPAY_KEY_SECRET exists:", !!razorpayKeySecret);
    console.log("Debug - RAZORPAY_KEY_ID value:", razorpayKeyId ? razorpayKeyId.substring(0, 12) + "..." : "MISSING");
    console.log("Debug - RAZORPAY_KEY_SECRET value:", razorpayKeySecret ? razorpayKeySecret.substring(0, 8) + "..." : "MISSING");
    
    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Missing Razorpay credentials");
      console.error("RAZORPAY_KEY_ID:", razorpayKeyId ? "SET" : "MISSING");
      console.error("RAZORPAY_KEY_SECRET:", razorpayKeySecret ? "SET" : "MISSING");
      throw new Error("Payment service not configured");
    }
    
    console.log("Using Razorpay Key ID:", razorpayKeyId.substring(0, 12) + "...");

    // Create order data
    const orderData = {
      amount: amount, // Amount is already in paise from frontend
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        plan_name: plan_name,
        message_credits: message_credits.toString(),
        user_id: user.id
      }
    };

    console.log("Creating Razorpay order with data:", orderData);

    const credentials = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    console.log("Razorpay API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Razorpay API error:", response.status, errorData);
      
      // Handle specific Razorpay errors
      if (response.status === 400) {
        throw new Error("Invalid payment details. Please check and try again.");
      } else if (response.status === 401) {
        throw new Error("Payment service authentication failed. Please contact support.");
      } else if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      } else {
        throw new Error(`Payment service error (${response.status}). Please try again.`);
      }
    }

    const order = await response.json();
    
    // Validate order response
    if (!order || !order.id || !order.amount) {
      console.error("Invalid order response:", order);
      throw new Error("Invalid payment order response");
    }
    
    console.log("Razorpay order created successfully:", order.id);

    // Store order in database with service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { error: insertError } = await supabaseService.from("orders").insert({
      user_id: user.id,
      razorpay_order_id: order.id,
      amount: amount,
      plan_name: plan_name,
      message_credits: Math.max(message_credits, 1), // Ensure positive value for database constraint
      status: "pending"
    });

    if (insertError) {
      console.error("Error inserting order:", insertError);
      throw new Error("Failed to save order to database");
    }

    console.log("Order saved to database successfully");

    return new Response(JSON.stringify({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});