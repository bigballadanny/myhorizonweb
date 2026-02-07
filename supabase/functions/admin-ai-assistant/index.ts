import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Horizon AI, the intelligent admin assistant for MyHorizon — an AI automation agency.
You have access to the company's CRM data including leads, conversations, appointments, campaigns, and visitor analytics.
Be concise, data-driven, and actionable. When showing data, format it clearly with markdown tables or lists.
When asked to take actions (create leads, update statuses, draft campaigns), use the available tools.
Always be professional and helpful. If you don't have enough data, say so.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) throw new Error("messages array required");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Fetch context data for the AI
    const [leadsRes, convsRes, apptsRes, campaignsRes, visitorsRes] = await Promise.all([
      supabase.from("leads").select("id, name, email, company, status, source, ai_score, estimated_value, created_at").order("created_at", { ascending: false }).limit(50),
      supabase.from("conversations").select("id, transcript, duration_seconds, call_type, created_at, lead_id").order("created_at", { ascending: false }).limit(20),
      supabase.from("appointments").select("id, title, start_time, end_time, status, lead_id, created_at").order("start_time", { ascending: false }).limit(20),
      supabase.from("email_campaigns").select("id, subject, status, total_recipients, total_sent, total_opened, total_clicked, created_at").order("created_at", { ascending: false }).limit(10),
      supabase.from("visitor_sessions").select("id, fingerprint_hash, is_returning, visit_count, pages_viewed, session_duration_seconds, last_seen_at").order("last_seen_at", { ascending: false }).limit(30),
    ]);

    const contextData = `
## Current CRM Data Snapshot

### Leads (${leadsRes.data?.length || 0} most recent)
${JSON.stringify(leadsRes.data?.map(l => ({ id: l.id, name: l.name, email: l.email, company: l.company, status: l.status, source: l.source, score: l.ai_score, value: l.estimated_value })) || [], null, 2)}

### Recent Conversations (${convsRes.data?.length || 0})
${JSON.stringify(convsRes.data?.map(c => ({ id: c.id, duration: c.duration_seconds, type: c.call_type, date: c.created_at, lead_id: c.lead_id, transcript_preview: c.transcript?.slice(0, 200) })) || [], null, 2)}

### Appointments (${apptsRes.data?.length || 0})
${JSON.stringify(apptsRes.data?.map(a => ({ id: a.id, title: a.title, start: a.start_time, status: a.status, lead_id: a.lead_id })) || [], null, 2)}

### Campaigns (${campaignsRes.data?.length || 0})
${JSON.stringify(campaignsRes.data || [], null, 2)}

### Visitor Sessions (${visitorsRes.data?.length || 0})
Total unique: ${new Set(visitorsRes.data?.map(v => v.fingerprint_hash)).size}
Returning: ${visitorsRes.data?.filter(v => v.is_returning).length || 0}
${JSON.stringify(visitorsRes.data?.slice(0, 10).map(v => ({ returning: v.is_returning, visits: v.visit_count, duration: v.session_duration_seconds, sections: v.pages_viewed })) || [], null, 2)}
`;

    const tools = [
      {
        type: "function",
        function: {
          name: "create_lead",
          description: "Create a new lead in the CRM",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              company: { type: "string" },
              source: { type: "string", enum: ["website_chat", "inbound_call", "outbound_call", "referral", "other"] },
              notes: { type: "string" },
            },
            required: ["name"],
            additionalProperties: false,
          },
        },
      },
      {
        type: "function",
        function: {
          name: "update_lead_status",
          description: "Update a lead's status",
          parameters: {
            type: "object",
            properties: {
              lead_id: { type: "string" },
              new_status: { type: "string", enum: ["new", "contacted", "qualified", "nurturing", "appointment_scheduled", "closed_won", "closed_lost"] },
            },
            required: ["lead_id", "new_status"],
            additionalProperties: false,
          },
        },
      },
      {
        type: "function",
        function: {
          name: "create_campaign_draft",
          description: "Create a draft email campaign",
          parameters: {
            type: "object",
            properties: {
              subject: { type: "string" },
              body_html: { type: "string" },
            },
            required: ["subject", "body_html"],
            additionalProperties: false,
          },
        },
      },
    ];

    // First AI call with context + tools
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + "\n\n" + contextData },
          ...messages,
        ],
        tools,
        stream: true,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await aiResponse.text();
      console.error("AI error:", aiResponse.status, t);
      throw new Error("AI gateway error");
    }

    // Check if response is streaming (SSE) or JSON (tool calls)
    const contentType = aiResponse.headers.get("content-type") || "";

    if (contentType.includes("text/event-stream")) {
      // Stream through directly
      return new Response(aiResponse.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // Non-streaming response (possibly with tool calls)
    const aiData = await aiResponse.json();
    const choice = aiData.choices?.[0];

    if (choice?.message?.tool_calls) {
      // Execute tool calls
      const toolResults = [];
      for (const tc of choice.message.tool_calls) {
        const args = JSON.parse(tc.function.arguments);
        let result: unknown;

        switch (tc.function.name) {
          case "create_lead": {
            const { data, error } = await supabase.from("leads").insert({
              name: args.name,
              email: args.email || null,
              phone: args.phone || null,
              company: args.company || null,
              source: args.source || "other",
              notes: args.notes || null,
            }).select().single();
            result = error ? { error: error.message } : { success: true, lead: data };
            break;
          }
          case "update_lead_status": {
            const { error } = await supabase.from("leads").update({ status: args.new_status }).eq("id", args.lead_id);
            result = error ? { error: error.message } : { success: true };
            break;
          }
          case "create_campaign_draft": {
            const { data, error } = await supabase.from("email_campaigns").insert({
              subject: args.subject,
              body_html: args.body_html,
              status: "draft",
            }).select().single();
            result = error ? { error: error.message } : { success: true, campaign: data };
            break;
          }
          default:
            result = { error: "Unknown tool" };
        }
        toolResults.push({ tool_call_id: tc.id, result });
      }

      // Follow-up call with tool results
      const followUpMessages = [
        { role: "system", content: SYSTEM_PROMPT + "\n\n" + contextData },
        ...messages,
        choice.message,
        ...toolResults.map(tr => ({
          role: "tool",
          tool_call_id: tr.tool_call_id,
          content: JSON.stringify(tr.result),
        })),
      ];

      const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: followUpMessages,
          stream: true,
        }),
      });

      if (!followUpResponse.ok) {
        const t = await followUpResponse.text();
        console.error("Follow-up error:", t);
        // Return tool results directly
        return new Response(JSON.stringify({
          content: `Actions completed: ${toolResults.map(tr => JSON.stringify(tr.result)).join(", ")}`,
          tool_results: toolResults,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(followUpResponse.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // Regular response
    return new Response(JSON.stringify(aiData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin-ai-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
