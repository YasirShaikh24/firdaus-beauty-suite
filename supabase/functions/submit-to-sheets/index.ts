import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, date, message } = await req.json()
    
    console.log('Received appointment:', { name, email, phone, service, date })

    // Get Google Apps Script webhook URL from environment
    const webhookUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL')
    
    if (!webhookUrl) {
      throw new Error('Google Sheets webhook URL not configured')
    }

    // Send data to Google Sheets via webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        date,
        message,
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      console.error('Google Sheets webhook failed:', await response.text())
      throw new Error('Failed to submit to Google Sheets')
    }

    console.log('Successfully submitted to Google Sheets')

    return new Response(
      JSON.stringify({ success: true, message: 'Appointment submitted to Google Sheets' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in submit-to-sheets:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
