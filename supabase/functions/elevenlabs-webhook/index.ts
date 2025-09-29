import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();
    console.log('ElevenLabs webhook received:', payload);

    // Extract conversation data from ElevenLabs webhook
    const {
      conversation_id,
      agent_id,
      transcript,
      duration_ms,
      metadata,
      analysis,
    } = payload;

    // Extract contact information if available
    let leadData = null;
    const contactInfo = metadata?.contact_info || {};
    
    if (contactInfo.name || contactInfo.email || contactInfo.phone) {
      // Check if lead exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .or(`email.eq.${contactInfo.email},phone.eq.${contactInfo.phone}`)
        .single();

      if (existingLead) {
        leadData = existingLead;
      } else {
        // Create new lead
        const { data: newLead, error: leadError } = await supabase
          .from('leads')
          .insert({
            name: contactInfo.name,
            email: contactInfo.email,
            phone: contactInfo.phone,
            company: contactInfo.company,
            source: 'website_chat',
            status: 'new',
          })
          .select()
          .single();

        if (leadError) {
          console.error('Error creating lead:', leadError);
        } else {
          leadData = newLead;
        }
      }
    }

    // Store conversation
    const { error: convError } = await supabase
      .from('conversations')
      .insert({
        lead_id: leadData?.id,
        agent_id,
        transcript: typeof transcript === 'string' ? transcript : JSON.stringify(transcript),
        duration_seconds: Math.floor(duration_ms / 1000),
        call_type: 'inbound',
        metadata: {
          conversation_id,
          analysis,
          ...metadata,
        },
      });

    if (convError) {
      console.error('Error storing conversation:', convError);
      throw convError;
    }

    // Create interaction record
    if (leadData) {
      await supabase
        .from('interactions')
        .insert({
          lead_id: leadData.id,
          interaction_type: 'ai_conversation',
          description: `AI conversation via website chat`,
        });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
