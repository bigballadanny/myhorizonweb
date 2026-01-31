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
    const elevenLabsKey = Deno.env.get('Eleven_Labs') || Deno.env.get('ELEVENLABS_API_KEY');
    
    if (!elevenLabsKey) {
      throw new Error('ElevenLabs API key not configured. Add Eleven_Labs or ELEVENLABS_API_KEY secret.');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get agent ID from request or use default
    const { agentId } = await req.json().catch(() => ({}));
    const targetAgentId = agentId || 'agent_3701k6bjf9q2e5wsc1y94xbg2r3g';
    
    console.log('Syncing conversations for agent:', targetAgentId);
    
    // Fetch recent conversations from ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${targetAgentId}`,
      {
        headers: {
          'xi-api-key': elevenLabsKey,
        },
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }
    
    const data = await response.json();
    const conversations = data.conversations || [];
    
    console.log(`Found ${conversations.length} conversations`);
    
    let synced = 0;
    let skipped = 0;
    
    for (const conv of conversations) {
      // Check if conversation already exists
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('metadata->>conversation_id', conv.conversation_id)
        .maybeSingle();
      
      if (existing) {
        skipped++;
        continue;
      }
      
      // Fetch full conversation details
      const detailResponse = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations/${conv.conversation_id}`,
        {
          headers: {
            'xi-api-key': elevenLabsKey,
          },
        }
      );
      
      if (!detailResponse.ok) {
        console.error('Failed to fetch conversation details:', conv.conversation_id);
        continue;
      }
      
      const details = await detailResponse.json();
      
      // Format transcript
      let formattedTranscript = '';
      if (Array.isArray(details.transcript)) {
        formattedTranscript = details.transcript.map((t: any) => 
          `${t.role || 'unknown'}: ${t.text || t.message || ''}`
        ).join('\n');
      }
      
      // Extract contact info from analysis
      let leadData = null;
      const analysis = details.analysis || {};
      const dataCollection = analysis.data_collection || {};
      
      const name = dataCollection.name || dataCollection.full_name;
      const email = dataCollection.email;
      const phone = dataCollection.phone || dataCollection.phone_number;
      const company = dataCollection.company;
      
      if (name || email || phone) {
        // Try to find existing lead
        let existingLead = null;
        
        if (email) {
          const { data } = await supabase
            .from('leads')
            .select('id')
            .eq('email', email)
            .maybeSingle();
          existingLead = data;
        }
        
        if (!existingLead && phone) {
          const { data } = await supabase
            .from('leads')
            .select('id')
            .eq('phone', phone)
            .maybeSingle();
          existingLead = data;
        }

        if (existingLead) {
          leadData = existingLead;
        } else {
          const { data: newLead, error: leadError } = await supabase
            .from('leads')
            .insert({
              name: name || 'Unknown',
              email,
              phone,
              company,
              source: 'website_chat',
              status: 'new',
              notes: 'Synced from ElevenLabs API',
            })
            .select()
            .single();

          if (!leadError) {
            leadData = newLead;
          }
        }
      }
      
      // Store conversation
      const { error: convError } = await supabase
        .from('conversations')
        .insert({
          lead_id: leadData?.id,
          agent_id: conv.agent_id,
          transcript: formattedTranscript,
          duration_seconds: details.metadata?.call_duration_secs || null,
          call_type: 'inbound',
          metadata: {
            conversation_id: conv.conversation_id,
            call_successful: details.analysis?.call_successful,
            call_ended_reason: details.metadata?.call_ended_reason,
            analysis: details.analysis,
            synced_at: new Date().toISOString(),
          },
          created_at: conv.start_time_unix_secs 
            ? new Date(conv.start_time_unix_secs * 1000).toISOString() 
            : new Date().toISOString(),
        });

      if (!convError) {
        synced++;
        
        // Create interaction record
        if (leadData) {
          await supabase
            .from('interactions')
            .insert({
              lead_id: leadData.id,
              interaction_type: 'ai_conversation',
              description: 'AI conversation (synced from API)',
            });
        }
      }
    }
    
    console.log(`Sync complete: ${synced} synced, ${skipped} skipped`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced,
        skipped,
        total: conversations.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Sync error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
