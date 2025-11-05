import { serve } from "https://deno.land/std@0.207.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Define the target WhatsApp number (the mobile number that receives the booking message)
const TARGET_WHATSAPP_NUMBER = "918799132161"; 

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();

    // 1. Construct the detailed, formatted message text
    const message = `*✨ NEW APPOINTMENT REQUEST - Firdaus Makeover ✨*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Service:* ${formData.service}\n` +
      `*Date:* ${formData.date}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Notes:* ${formData.message || 'None'}\n\n` +
      `Please contact the client ASAP to confirm the booking.`;

    // 2. Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // 3. Create the WhatsApp deep link
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    console.log('Generated WhatsApp link for new booking request.');
    
    // 4. Return the link to the client-side for redirection
    return new Response(
      JSON.stringify({
        success: true,
        message: 'WhatsApp link generated successfully',
        whatsappUrl: whatsappUrl // <--- Sending the redirect URL back
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error generating WhatsApp link:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to process booking request'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
});