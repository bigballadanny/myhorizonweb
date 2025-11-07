import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-elevenlabs-signature',
};

serve(async (req) => {
  console.log('🔔 DIAGNOSTIC ENDPOINT HIT');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));

  if (req.method === 'OPTIONS') {
    console.log('✅ CORS Preflight');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();
    console.log('📦 Body Length:', rawBody.length);
    console.log('📦 Raw Body:', rawBody);

    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
      console.log('✅ JSON Parsed:', JSON.stringify(parsedBody, null, 2));
    } catch (e) {
      console.log('⚠️ Not JSON, raw text:', rawBody);
      parsedBody = { raw: rawBody };
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Diagnostic endpoint received your request',
        timestamp: new Date().toISOString(),
        method: req.method,
        headers: Object.fromEntries(req.headers.entries()),
        body: parsedBody,
        bodyLength: rawBody.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Diagnostic Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
