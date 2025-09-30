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
    const { leadId } = await req.json();
    
    if (!leadId) {
      return new Response(
        JSON.stringify({ error: "leadId is required" }),
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

    // Fetch lead data
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select(`
        *,
        interactions (
          interaction_type,
          description,
          created_at
        ),
        appointments (
          title,
          status,
          start_time
        )
      `)
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      return new Response(
        JSON.stringify({ error: "Lead not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare context for AI scoring
    const leadContext = `
Lead Information:
- Name: ${lead.name}
- Company: ${lead.company || "Not provided"}
- Email: ${lead.email || "Not provided"}
- Phone: ${lead.phone || "Not provided"}
- Source: ${lead.source}
- Status: ${lead.status}
- Notes: ${lead.notes || "None"}

Interactions (${lead.interactions?.length || 0}):
${lead.interactions?.map((i: any) => `- ${i.interaction_type}: ${i.description}`).join("\n") || "None"}

Appointments (${lead.appointments?.length || 0}):
${lead.appointments?.map((a: any) => `- ${a.title} (${a.status})`).join("\n") || "None"}
`;

    // Call Lovable AI to score the lead
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
            content: `You are a lead qualification expert for a video production company. 
Score leads on a scale of 0-100 based on:
- Company size and budget potential (30%)
- Engagement level (interactions, appointments) (30%)
- Project clarity and notes quality (20%)
- Source quality (20%)

Return ONLY a JSON object with:
{
  "score": <number 0-100>,
  "reasoning": "<2-3 sentence explanation>",
  "nextSteps": "<recommended action>"
}`
          },
          {
            role: "user",
            content: `Score this lead:\n\n${leadContext}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI scoring failed" }),
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
    let scoringResult;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                       content.match(/(\{[\s\S]*?\})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      scoringResult = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update lead with AI score
    const { error: updateError } = await supabase
      .from("leads")
      .update({ 
        ai_score: scoringResult.score,
        notes: lead.notes 
          ? `${lead.notes}\n\n[AI Analysis] ${scoringResult.reasoning}\nNext Steps: ${scoringResult.nextSteps}`
          : `[AI Analysis] ${scoringResult.reasoning}\nNext Steps: ${scoringResult.nextSteps}`
      })
      .eq("id", leadId);

    if (updateError) {
      console.error("Failed to update lead:", updateError);
    }

    return new Response(
      JSON.stringify(scoringResult),
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
