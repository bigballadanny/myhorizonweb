import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { conversation_id } = await req.json();
    if (!conversation_id) throw new Error("conversation_id required");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Fetch conversation
    const { data: conv, error: convErr } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversation_id)
      .single();

    if (convErr || !conv) throw new Error("Conversation not found");
    if (!conv.transcript || conv.transcript.length < 10) {
      return new Response(JSON.stringify({ message: "Transcript too short to process" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Call Lovable AI to extract lead info
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a lead extraction AI. Analyze voice conversation transcripts and extract contact/business information. Extract whatever is available - not everything will be mentioned.`,
          },
          {
            role: "user",
            content: `Extract lead information from this conversation transcript:\n\n${conv.transcript}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_lead",
              description: "Extract lead contact and business information from a conversation.",
              parameters: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Person's full name" },
                  email: { type: "string", description: "Email address" },
                  phone: { type: "string", description: "Phone number" },
                  company: { type: "string", description: "Company or organization name" },
                  project_needs: { type: "string", description: "What they need help with" },
                  budget_range: { type: "string", description: "Mentioned budget or price sensitivity" },
                  urgency: { type: "string", enum: ["low", "medium", "high"], description: "How urgent their need seems" },
                  interest_areas: {
                    type: "array",
                    items: { type: "string" },
                    description: "Services they showed interest in (e.g., AI agents, workflows, CRM)",
                  },
                },
                required: ["project_needs"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_lead" } },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI extraction failed:", aiResponse.status, errText);
      throw new Error("AI extraction failed");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No extraction result");

    const extracted = JSON.parse(toolCall.function.arguments);
    console.log("Extracted lead data:", extracted);

    // Dedup: check if lead already exists by email or phone
    let existingLead = null;
    if (extracted.email) {
      const { data } = await supabase.from("leads").select("*").eq("email", extracted.email).limit(1);
      if (data && data.length > 0) existingLead = data[0];
    }
    if (!existingLead && extracted.phone) {
      const { data } = await supabase.from("leads").select("*").eq("phone", extracted.phone).limit(1);
      if (data && data.length > 0) existingLead = data[0];
    }

    let leadId: string;

    if (existingLead) {
      // Update existing lead with new info
      const updates: Record<string, unknown> = {};
      if (extracted.name && !existingLead.name) updates.name = extracted.name;
      if (extracted.company && !existingLead.company) updates.company = extracted.company;
      if (extracted.project_needs) {
        updates.notes = [existingLead.notes, `[AI] ${extracted.project_needs}`].filter(Boolean).join("\n");
      }

      if (Object.keys(updates).length > 0) {
        await supabase.from("leads").update(updates).eq("id", existingLead.id);
      }
      leadId = existingLead.id;
    } else {
      // Create new lead
      const notes = [
        extracted.project_needs ? `Needs: ${extracted.project_needs}` : null,
        extracted.budget_range ? `Budget: ${extracted.budget_range}` : null,
        extracted.urgency ? `Urgency: ${extracted.urgency}` : null,
        extracted.interest_areas?.length ? `Interests: ${extracted.interest_areas.join(", ")}` : null,
      ].filter(Boolean).join("\n");

      const { data: newLead, error: leadErr } = await supabase
        .from("leads")
        .insert({
          name: extracted.name || "Voice Lead",
          email: extracted.email || null,
          phone: extracted.phone || null,
          company: extracted.company || null,
          source: "inbound_call" as const,
          status: "new" as const,
          notes,
        })
        .select("id")
        .single();

      if (leadErr) throw new Error(`Failed to create lead: ${leadErr.message}`);
      leadId = newLead.id;
    }

    // Link conversation to lead
    await supabase.from("conversations").update({ lead_id: leadId }).eq("id", conversation_id);

    // Create interaction record
    await supabase.from("interactions").insert({
      lead_id: leadId,
      interaction_type: "voice_call",
      description: `AI voice conversation (${conv.duration_seconds ? Math.round(conv.duration_seconds / 60) + " min" : "unknown duration"}). ${extracted.project_needs || ""}`,
    });

    // Try to score the lead (non-blocking)
    try {
      await fetch(`${supabaseUrl}/functions/v1/score-lead`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lead_id: leadId }),
      });
    } catch (e) {
      console.error("Score-lead call failed (non-blocking):", e);
    }

    return new Response(
      JSON.stringify({ success: true, lead_id: leadId, extracted, is_existing: !!existingLead }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("process-conversation error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
