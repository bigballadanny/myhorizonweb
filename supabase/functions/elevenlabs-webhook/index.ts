import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-elevenlabs-signature',
};

// Verify webhook signature
async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(payload);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBytes = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const computedSignature = Array.from(new Uint8Array(signatureBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return computedSignature === signature;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== ElevenLabs Webhook Received ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Headers:', Object.fromEntries(req.headers.entries()));
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const webhookSecret = Deno.env.get('ELEVENLABS_WEBHOOK_SECRET')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-elevenlabs-signature');
    
    console.log('Has signature header:', !!signature);
    
    // Verify signature if present
    if (signature && webhookSecret) {
      const isValid = await verifySignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.error('Invalid webhook signature');
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.log('Signature verified successfully');
    } else if (webhookSecret) {
      console.warn('No signature provided but secret is configured');
    }

    const payload = JSON.parse(rawBody);
    console.log('Payload structure:', {
      has_conversation_id: !!payload.conversation_id,
      has_agent_id: !!payload.agent_id,
      has_transcript: !!payload.transcript,
      has_duration_ms: !!payload.duration_ms,
      has_metadata: !!payload.metadata,
      metadata_keys: payload.metadata ? Object.keys(payload.metadata) : []
    });
    console.log('Full payload:', JSON.stringify(payload, null, 2));

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
    
    console.log('Contact info extracted:', contactInfo);
    
    if (contactInfo.name || contactInfo.email || contactInfo.phone) {
      console.log('Processing lead with contact info...');
      // Check if lead exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .or(`email.eq.${contactInfo.email},phone.eq.${contactInfo.phone}`)
        .single();

      if (existingLead) {
        console.log('Found existing lead:', existingLead.id);
        leadData = existingLead;
      } else {
        console.log('Creating new lead...');
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
          console.log('New lead created:', newLead.id);
          leadData = newLead;
        }
      }
    }

    // Store conversation
    console.log('Storing conversation for lead:', leadData?.id);
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
    
    console.log('Conversation stored successfully');

    // Create interaction record
    if (leadData) {
      console.log('Creating interaction record...');
      await supabase
        .from('interactions')
        .insert({
          lead_id: leadData.id,
          interaction_type: 'ai_conversation',
          description: `AI conversation via website chat`,
        });
    }

    console.log('=== Webhook Processing Complete ===');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Conversation processed successfully' }),
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
