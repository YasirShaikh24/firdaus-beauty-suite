import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json()

    console.log('Admin login attempt for username:', username)

    // Hardcoded admin credentials (secure approach would use database with hashed passwords)
    const ADMIN_USERNAME = 'firdaussindhi'
    const ADMIN_PASSWORD = 'javed123'

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a Supabase admin client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Create or get an admin user session
      // For simplicity, we'll create a guest session
      const { data, error } = await supabase.auth.signInAnonymously()

      if (error) {
        console.error('Error creating session:', error)
        throw error
      }

      console.log('Admin login successful')

      return new Response(
        JSON.stringify({
          success: true,
          session: data.session,
          message: 'Admin login successful'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } else {
      console.log('Invalid credentials')
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid credentials'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        },
      )
    }
  } catch (error) {
    console.error('Error in admin-login:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
