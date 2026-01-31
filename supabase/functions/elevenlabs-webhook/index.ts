import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, elevenlabs-signature, x-elevenlabs-signature',
};

// Verify webhook signature using ElevenLabs format: "t=timestamp,v0=signature"
async function verifySignature(
  payload: string,
  signatureHeader: string,
  secret: string
): Promise<{ valid: boolean; timestamp?: number }> {
  try {
    // Parse header format: "t=1234567890,v0=abc123..."
    const parts = signatureHeader.split(',');
    let timestamp: string | undefined;
    let signature: string | undefined;
    
    for (const part of parts) {
      if (part.startsWith('t=')) {
        timestamp = part.substring(2);
      } else if (part.startsWith('v0=')) {
        signature = part.substring(3);
      }
    }
    
    if (!timestamp || !signature) {
      console.log('Missing timestamp or signature in header');
      return { valid: false };
    }
    
    const timestampNum = parseInt(timestamp);
    
    // Validate timestamp is within 30 minutes
    const now = Math.floor(Date.now() / 1000);
    const tolerance = 30 * 60; // 30 minutes
    if (Math.abs(now - timestampNum) > tolerance) {
      console.log('Timestamp outside tolerance window');
      return { valid: false, timestamp: timestampNum };
    }
    
    // Compute signature: HMAC-SHA256(secret, "timestamp.payload")
    const payloadToSign = `${timestamp}.${payload}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(payloadToSign);
    
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
    
    const isValid = computedSignature === signature;
    console.log('Signature verification:', isValid ? 'VALID' : 'INVALID');
    
    return { valid: isValid, timestamp: timestampNum };
  } catch (error) {
    console.error('Signature verification error:', error);
    return { valid: false };
  }
}

serve(async (req) => {
  // Log incoming request immediately
  console.log('🔔 WEBHOOK REQUEST RECEIVED');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Timestamp:', new Date().toISOString());
  
  // Log all headers for debugging
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  console.log('Headers:', JSON.stringify(headers, null, 2));

  if (req.method === 'OPTIONS') {
    console.log('✅ CORS Preflight - Returning 200');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const webhookSecret = Deno.env.get('ELEVENLABS_WEBHOOK_SECRET');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get raw body
    const rawBody = await req.text();
    console.log('📦 Raw Body Length:', rawBody.length);
    console.log('📦 Raw Body Preview:', rawBody.substring(0, 1000));
    
    // Check for signature header (ElevenLabs uses "elevenlabs-signature", not "x-elevenlabs-signature")
    const signatureHeader = req.headers.get('elevenlabs-signature') || req.headers.get('x-elevenlabs-signature');
    console.log('🔐 Signature Header:', signatureHeader ? `Present (${signatureHeader.substring(0, 50)}...)` : 'Missing');
    
    // Verify signature if present and secret is configured
    if (signatureHeader && webhookSecret) {
      const { valid, timestamp } = await verifySignature(rawBody, signatureHeader, webhookSecret);
      if (!valid) {
        console.log('❌ Signature verification failed');
        // Continue processing for now but log the failure
        // In production, you might want to return 401 here
      } else {
        console.log('✅ Signature verified, timestamp:', timestamp);
      }
    } else {
      console.log('⚠️ Skipping signature verification (no header or secret)');
    }
    
    // Parse payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
      console.log('✅ Payload parsed successfully');
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError);
      throw new Error('Invalid JSON payload');
    }
    
    // ElevenLabs webhooks may wrap data in a "data" field
    // Handle both direct payload and wrapped payload
    const data = payload.data || payload;
    
    console.log('Payload structure:', {
      has_data_wrapper: !!payload.data,
      type: payload.type,
      conversation_id: data.conversation_id,
      agent_id: data.agent_id,
      has_transcript: !!data.transcript,
      has_analysis: !!data.analysis,
      has_metadata: !!data.metadata,
    });
    
    // Extract conversation data
    const {
      conversation_id,
      agent_id,
      transcript,
      duration_ms,
      duration_seconds: duration_s,
      metadata,
      analysis,
      call_successful,
      call_ended_reason,
    } = data;
    
    // Calculate duration - handle both formats
    const durationSeconds = duration_s || (duration_ms ? Math.floor(duration_ms / 1000) : null);
    
    // Format transcript properly
    let formattedTranscript = '';
    if (typeof transcript === 'string') {
      formattedTranscript = transcript;
    } else if (Array.isArray(transcript)) {
      // Handle array format: [{role: 'user', text: '...'}, {role: 'agent', text: '...'}]
      formattedTranscript = transcript.map((t: any) => 
        `${t.role || 'unknown'}: ${t.text || t.message || ''}`
      ).join('\n');
    } else if (transcript) {
      formattedTranscript = JSON.stringify(transcript);
    }
    
    console.log('Formatted transcript preview:', formattedTranscript.substring(0, 200));

    // Extract contact information from analysis or metadata
    let leadData = null;
    const contactInfo = analysis?.data_collection || metadata?.contact_info || {};
    
    // Try to extract from analysis.data_collection (ElevenLabs' format)
    const extractedData: Record<string, string> = {};
    if (analysis?.data_collection) {
      for (const [key, value] of Object.entries(analysis.data_collection)) {
        if (typeof value === 'string' || typeof value === 'object') {
          extractedData[key.toLowerCase()] = typeof value === 'object' ? JSON.stringify(value) : value;
        }
      }
    }
    
    const name = extractedData.name || extractedData.full_name || contactInfo.name;
    const email = extractedData.email || contactInfo.email;
    const phone = extractedData.phone || extractedData.phone_number || contactInfo.phone;
    const company = extractedData.company || extractedData.company_name || contactInfo.company;
    
    console.log('Extracted contact info:', { name, email, phone, company });
    
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
        console.log('Found existing lead:', existingLead.id);
        leadData = existingLead;
      } else {
        console.log('Creating new lead...');
        const { data: newLead, error: leadError } = await supabase
          .from('leads')
          .insert({
            name: name || 'Unknown',
            email,
            phone,
            company,
            source: 'website_chat',
            status: 'new',
            notes: `Created from AI conversation. ${call_ended_reason ? `Call ended: ${call_ended_reason}` : ''}`,
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
    const { data: convData, error: convError } = await supabase
      .from('conversations')
      .insert({
        lead_id: leadData?.id,
        agent_id,
        transcript: formattedTranscript,
        duration_seconds: durationSeconds,
        call_type: 'inbound',
        metadata: {
          conversation_id,
          call_successful,
          call_ended_reason,
          analysis,
          original_metadata: metadata,
        },
      })
      .select()
      .single();

    if (convError) {
      console.error('Error storing conversation:', convError);
      throw convError;
    }
    
    console.log('✅ Conversation stored:', convData.id);

    // Create interaction record
    if (leadData) {
      await supabase
        .from('interactions')
        .insert({
          lead_id: leadData.id,
          interaction_type: 'ai_conversation',
          description: `AI conversation - ${durationSeconds ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : 'duration unknown'}`,
        });
      console.log('✅ Interaction recorded');
    }

    // Trigger lead scoring if we have a lead
    if (leadData) {
      try {
        await supabase.functions.invoke('score-lead', {
          body: { leadId: leadData.id }
        });
        console.log('✅ Lead scoring triggered');
      } catch (scoreError) {
        console.log('⚠️ Lead scoring failed (non-critical):', scoreError);
      }
    }

    console.log('=== Webhook Processing Complete ===');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Conversation processed successfully',
        conversation_id: convData.id,
        lead_id: leadData?.id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌❌❌ WEBHOOK ERROR ❌❌❌');
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack');
    
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
