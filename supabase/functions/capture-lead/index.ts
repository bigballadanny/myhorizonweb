import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://myhorizon.ai",
  "https://www.myhorizon.ai",
]);

function isAllowedOrigin(origin: string) {
  const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  const isMyHorizonPreview = /^https:\/\/myhorizon-[a-z0-9-]+-bigballadannys-projects\.vercel\.app$/.test(origin);
  return allowedOrigins.has(origin) || isLocal || isMyHorizonPreview;
}

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin)
      ? origin
      : "https://myhorizon.ai",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  if (origin && !isAllowedOrigin(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { ...corsHeaders(req), "Content-Type": "application/json" },
    });
  }

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(req) });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders(req), "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { email, name, phone, company, source, notes } = body;

    const normalizedEmail = typeof email === "string"
      ? email.trim().toLowerCase()
      : "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!validEmail || normalizedEmail.length > 254) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders(req), "Content-Type": "application/json" },
        }
      );
    }

    // Use service role key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Map source to enum value
    const sourceMap: Record<string, string> = {
      chat_widget: "website_chat",
      newsletter: "other",
      lead_form: "website_chat",
      cal_booking: "website_chat",
      exit_intent: "other",
      voice_widget: "inbound_call",
    };

    const leadSource = sourceMap[source] || "other";

    // Check for duplicate (same email + source in last 24h)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("email", normalizedEmail)
      .gte("created_at", oneDayAgo)
      .limit(1);

    if (existing && existing.length > 0) {
      // Update existing lead with new info
      const { error: updateError } = await supabase
        .from("leads")
        .update({
          ...(typeof name === "string" && name.trim() ? { name: name.trim().slice(0, 160) } : {}),
          ...(typeof phone === "string" && phone.trim() ? { phone: phone.trim().slice(0, 60) } : {}),
          ...(typeof company === "string" && company.trim() ? { company: company.trim().slice(0, 200) } : {}),
          notes: notes
            ? `${String(notes).slice(0, 1000)} (updated via ${source})`
            : `Repeat visit via ${source}`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing[0].id);

      if (updateError) {
        console.error("Update error:", updateError);
        return new Response(
          JSON.stringify({ error: "Failed to update lead" }),
          {
            status: 500,
            headers: { ...corsHeaders(req), "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          action: "updated",
          id: existing[0].id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders(req), "Content-Type": "application/json" },
        }
      );
    }

    // Insert new lead
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        email: normalizedEmail,
        name: typeof name === "string" ? name.trim().slice(0, 160) || null : null,
        phone: typeof phone === "string" ? phone.trim().slice(0, 60) || null : null,
        company: typeof company === "string" ? company.trim().slice(0, 200) || null : null,
        source: leadSource,
        status: "new",
        notes: typeof notes === "string"
          ? notes.slice(0, 1000)
          : `Captured via ${source} on ${new Date().toISOString()}`,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead", detail: insertError.message }),
        {
          status: 500,
          headers: { ...corsHeaders(req), "Content-Type": "application/json" },
        }
      );
    }

    console.log("Lead captured:", lead?.id, source);

    return new Response(
      JSON.stringify({ success: true, action: "created", id: lead?.id }),
      {
        status: 200,
        headers: { ...corsHeaders(req), "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Capture lead error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders(req), "Content-Type": "application/json" },
      }
    );
  }
});
