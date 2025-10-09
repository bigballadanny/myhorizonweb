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
    console.log('=== ElevenLabs Webhook Test Function Started ===');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get optional overrides from request body
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, company } = body;

    console.log('Test overrides:', { name, email, phone, company });

    // Build test payload matching ElevenLabs webhook structure
    const testPayload = {
      conversation_id: `test_${Date.now()}`,
      agent_id: 'test_agent_id',
      transcript: 'This is a test conversation to verify the webhook integration is working correctly.',
      duration_ms: 45000,
      metadata: {
        contact_info: {
          name: name || 'Test User',
          email: email || 'test@example.com',
          phone: phone || '+1234567890',
          company: company || 'Test Company'
        }
      },
      analysis: {
        sentiment: 'positive',
        intent: 'qualification'
      }
    };

    console.log('Test payload created:', JSON.stringify(testPayload, null, 2));

    // Extract contact information
    const contactInfo = testPayload.metadata.contact_info;
    let leadData = null;

    // Check if lead exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .or(`email.eq.${contactInfo.email},phone.eq.${contactInfo.phone}`)
      .maybeSingle();

    console.log('Existing lead check:', existingLead ? `Found lead ID: ${existingLead.id}` : 'No existing lead found');

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
        throw new Error(`Lead creation failed: ${leadError.message}`);
      }
      
      console.log('New lead created:', newLead);
      leadData = newLead;
    }

    // Store test conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert({
        lead_id: leadData?.id,
        agent_id: testPayload.agent_id,
        transcript: testPayload.transcript,
        duration_seconds: Math.floor(testPayload.duration_ms / 1000),
        call_type: 'inbound',
        metadata: {
          conversation_id: testPayload.conversation_id,
          analysis: testPayload.analysis,
          test: true,
          ...testPayload.metadata,
        },
      })
      .select()
      .single();

    if (convError) {
      console.error('Error storing conversation:', convError);
      throw new Error(`Conversation storage failed: ${convError.message}`);
    }

    console.log('Test conversation stored:', conversation);

    // Create interaction record
    if (leadData) {
      const { error: interactionError } = await supabase
        .from('interactions')
        .insert({
          lead_id: leadData.id,
          interaction_type: 'ai_conversation',
          description: `Test AI conversation via website chat`,
        });

      if (interactionError) {
        console.error('Error creating interaction:', interactionError);
      } else {
        console.log('Test interaction created for lead:', leadData.id);
      }
    }

    console.log('=== Test Completed Successfully ===');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Test conversation created successfully',
        data: {
          conversation,
          lead: leadData,
          test_payload: testPayload
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('=== Test Function Error ===');
    console.error('Error details:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
