import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to verify Razorpay signature
async function verifySignature(orderId: string, paymentId: string, signature: string, secret: string): Promise<boolean> {
  try {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    ).then(key => 
      crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
    ).then(signature => 
      Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    );
    
    return expectedSignature === signature;
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Payment verification request received");
    
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json();

    console.log("Payment details:", { razorpay_order_id, razorpay_payment_id });

    // Get Razorpay key secret from environment (NOT webhook secret)
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET not found");
      throw new Error("Payment verification configuration error");
    }

    // Verify signature
    const isValidSignature = await verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      keySecret
    );

    console.log("Signature verification result:", isValidSignature);

    if (!isValidSignature) {
      console.error("Invalid signature provided");
      throw new Error("Invalid signature");
    }

    // Get user from auth header
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

    // Use service role key for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Update order status
    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .update({
        razorpay_payment_id,
        status: "completed",
        updated_at: new Date().toISOString()
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order update failed:", orderError);
      throw new Error("Order not found or update failed");
    }

    console.log("Order updated successfully:", order.id);

    // Update or create user credits
    const { data: existingCredits } = await supabaseService
      .from("user_credits")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (existingCredits) {
      console.log("Updating existing credits");
      // Update existing credits
      const { error: updateError } = await supabaseService
        .from("user_credits")
        .update({
          total_credits: existingCredits.total_credits + order.message_credits,
          remaining_credits: existingCredits.remaining_credits + order.message_credits,
          last_purchase_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Error updating credits:", updateError);
        throw new Error("Failed to update user credits");
      }
    } else {
      console.log("Creating new credits record");
      // Create new credits record
      const { error: insertError } = await supabaseService
        .from("user_credits")
        .insert({
          user_id: user.id,
          total_credits: order.message_credits,
          used_credits: 0,
          remaining_credits: order.message_credits,
          last_purchase_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Error creating credits:", insertError);
        throw new Error("Failed to create user credits");
      }
    }

    console.log("Credits updated successfully");

    return new Response(JSON.stringify({ 
      success: true,
      message: "Payment verified and credits added successfully",
      credits_added: order.message_credits
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});