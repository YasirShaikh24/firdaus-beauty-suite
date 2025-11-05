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
    const formData = await req.json()
    const webhookUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL')

    if (!webhookUrl) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL not configured')
      throw new Error('Google Sheets webhook not configured')
    }

    console.log('Submitting appointment to Google Sheets:', {
      name: formData.name,
      service: formData.service,
      date: formData.date
    })

    // Send data to Google Sheets via webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        message: formData.message,
        timestamp: formData.timestamp || new Date().toISOString()
      }),
    })

    const responseText = await response.text()
    console.log('Google Sheets response:', responseText)

    if (!response.ok) {
      throw new Error(`Failed to submit to Google Sheets: ${response.statusText}`)
    }

    console.log('Successfully submitted to Google Sheets')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Appointment submitted successfully'
      }),
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
        message: error instanceof Error ? error.message : 'Failed to submit appointment'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
