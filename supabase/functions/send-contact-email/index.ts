import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to the recipient
    const emailResponse = await resend.emails.send({
      from: "KundliLabs Contact <onboarding@resend.dev>",
      to: ["samarthmishra910@yahoo.com"],
      subject: `🌟 New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4c1d95, #7c3aed); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #fbbf24;">✨ New Cosmic Message ✨</h1>
            <p style="margin: 10px 0 0 0; color: #e5e7eb; font-size: 16px;">A new message has arrived through the cosmic channels</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h2 style="color: #fbbf24; margin-top: 0; font-size: 20px;">📧 Message Details</h2>
              <p><strong style="color: #a78bfa;">From:</strong> ${name}</p>
              <p><strong style="color: #a78bfa;">Email:</strong> ${email}</p>
              <p><strong style="color: #a78bfa;">Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 20px;">
              <h3 style="color: #fbbf24; margin-top: 0;">💫 Message:</h3>
              <div style="background: rgba(0, 0, 0, 0.2); padding: 15px; border-radius: 6px; border-left: 4px solid #fbbf24;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; text-align: center; border-top: 1px solid rgba(139, 92, 246, 0.3);">
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">
              🌟 This message was sent through KundliLabs Contact Form 🌟<br>
              May the stars align for a swift response!
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the sender
    await resend.emails.send({
      from: "KundliLabs <onboarding@resend.dev>",
      to: [email],
      subject: "✨ Your cosmic message has been received!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4c1d95, #7c3aed); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #fbbf24;">🌟 Message Received 🌟</h1>
            <p style="margin: 10px 0 0 0; color: #e5e7eb; font-size: 16px;">Your cosmic query has reached us through the digital astral plane</p>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 18px; color: #e5e7eb;">Hi ${name},</p>
            
            <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0; color: #fbbf24; font-weight: bold;">✨ Thank you for reaching out to KundliLabs!</p>
            </div>
            
            <p style="color: #e5e7eb; line-height: 1.6;">
              Just like ancient sages who sought wisdom from the cosmos, your message has been delivered through our digital channels. We've received your inquiry about "<strong style="color: #a78bfa;">${subject}</strong>" and our team will respond within 24 hours during business days.
            </p>
            
            <p style="color: #e5e7eb; line-height: 1.6;">
              Whether you're seeking astrological insights, technical support, or just sharing your cosmic journey with us, we're here to help guide you through the stars and technology alike.
            </p>
          </div>
          
          <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; text-align: center; border-top: 1px solid rgba(139, 92, 246, 0.3);">
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">
              🌟 May the stars guide our response to you 🌟<br>
              <strong>The KundliLabs Team</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your cosmic message has been sent! We'll respond within 24 hours." 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);