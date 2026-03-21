import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_AGENT_ID = 'agent_8801khq4sqbseqxa56493s1j7anz';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    
    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY not configured');
      throw new Error('ElevenLabs API key not configured');
    }

    console.log('Attempting to get signed URL for agent:', ELEVENLABS_AGENT_ID);

    // Try to get signed URL - this only works for agents with authentication enabled
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${ELEVENLABS_AGENT_ID}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Signed URL not available (agent may be public):', response.status, errorText);
      
      // For public agents, we don't need a signed URL
      // Return the agent ID for direct connection
      return new Response(
        JSON.stringify({ 
          agent_id: ELEVENLABS_AGENT_ID,
          is_public: true,
          message: 'Agent is public, connect directly with agent_id'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Signed URL generated successfully');

    return new Response(
      JSON.stringify({ 
        signed_url: data.signed_url,
        agent_id: ELEVENLABS_AGENT_ID,
        is_public: false,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Token generation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
