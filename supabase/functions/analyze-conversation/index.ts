import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId } = await req.json();
    
    if (!conversationId) {
      return new Response(
        JSON.stringify({ error: "conversationId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch conversation data
    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .single();

    if (convError || !conversation) {
      return new Response(
        JSON.stringify({ error: "Conversation not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare context for AI analysis
    const analysisPrompt = `
Analyze this customer conversation transcript and extract key insights:

Transcript: ${conversation.transcript}
Duration: ${conversation.duration_seconds} seconds
Call Type: ${conversation.call_type}

Provide a JSON response with:
{
  "sentiment": "positive|neutral|negative",
  "intent": "information_gathering|ready_to_buy|price_shopping|not_interested",
  "budget_mentioned": "string or null",
  "timeline": "string or null",
  "pain_points": ["array", "of", "issues"],
  "key_information": {
    "project_type": "string or null",
    "specific_requirements": "string or null"
  },
  "recommended_status": "new|contacted|qualified|appointment_scheduled|nurturing",
  "follow_up_action": "string - specific recommended next step",
  "conversion_probability": 0-100,
  "summary": "2-3 sentence summary of the conversation"
}`;

    // Call Lovable AI to analyze the conversation
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert conversation analyst for a video production company. Analyze sales conversations to extract key insights and recommend actions."
          },
          {
            role: "user",
            content: analysisPrompt
          }
        ],
        temperature: 0.5,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No response from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse AI response
    let analysisResult;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                       content.match(/(\{[\s\S]*?\})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysisResult = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update conversation with analysis
    const updatedMetadata = {
      ...conversation.metadata,
      ai_analysis: analysisResult
    };

    const { error: updateError } = await supabase
      .from("conversations")
      .update({ metadata: updatedMetadata })
      .eq("id", conversationId);

    if (updateError) {
      console.error("Failed to update conversation:", updateError);
    }

    // Update lead if associated
    if (conversation.lead_id && analysisResult.recommended_status) {
      await supabase
        .from("leads")
        .update({ status: analysisResult.recommended_status })
        .eq("id", conversation.lead_id);
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
