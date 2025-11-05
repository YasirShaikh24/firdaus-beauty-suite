import { serve } from "https://deno.land/std@0.207.0/http/server.ts" // UPDATED DENO STD
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3' // UPDATED SUPABASE JS

const corsHeaders = {
// ... rest of the function remains the same
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

    // Secure approach: Use Supabase Secrets for admin credentials
    const ADMIN_USERNAME = Deno.env.get('ADMIN_USERNAME')
    const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD')

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a Supabase admin client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Create or get an admin user session
      const { data, error } = await supabase.auth.signInAnonymously()

      if (error) {
        console.error('Error creating session:', error)
        throw error
      }

      // CRITICAL STEP: Assign the 'admin' role to this session's user
      if (data.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: data.user.id, role: 'admin' })
          .select()
        
        // Ignore unique constraint error (23505) if the role is already set
        if (roleError && roleError.code !== '23505') { 
          console.error('Error setting admin role:', roleError);
          throw roleError;
        }
      }

      console.log('Admin login successful and role assigned')

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