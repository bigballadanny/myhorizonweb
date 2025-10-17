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
  // Log EVERYTHING - even before CORS check
  console.log('🔔 WEBHOOK REQUEST RECEIVED');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Timestamp:', new Date().toISOString());
  console.log('All Headers:', JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));

  if (req.method === 'OPTIONS') {
    console.log('✅ CORS Preflight - Returning 200');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('=== Processing Webhook ===');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const webhookSecret = Deno.env.get('ELEVENLABS_WEBHOOK_SECRET')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get raw body
    const rawBody = await req.text();
    console.log('📦 Raw Body Length:', rawBody.length);
    console.log('📦 Raw Body Preview:', rawBody.substring(0, 500));
    
    const signature = req.headers.get('x-elevenlabs-signature');
    console.log('🔐 Signature Header:', signature ? 'Present' : 'Missing');
    
    // TEMPORARILY SKIP signature verification for debugging
    console.log('⚠️ DIAGNOSTIC MODE: Skipping signature verification');
    
    let payload;
    try {
      payload = JSON.parse(rawBody);
      console.log('✅ Payload parsed successfully');
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError);
      console.log('Raw body that failed:', rawBody);
      const errorMsg = parseError instanceof Error ? parseError.message : 'Unknown parse error';
      throw new Error(`Invalid JSON: ${errorMsg}`);
    }
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
    console.error('❌❌❌ WEBHOOK ERROR ❌❌❌');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
