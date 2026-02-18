import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { email, name, phone, company, source, notes } = body;

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
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
      .eq("email", email)
      .gte("created_at", oneDayAgo)
      .limit(1);

    if (existing && existing.length > 0) {
      // Update existing lead with new info
      const { error: updateError } = await supabase
        .from("leads")
        .update({
          notes: notes
            ? `${notes} (updated via ${source})`
            : `Repeat visit via ${source}`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing[0].id);

      if (updateError) {
        console.error("Update error:", updateError);
      }

      return new Response(
        JSON.stringify({
          success: true,
          action: "updated",
          id: existing[0].id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Insert new lead
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        source: leadSource,
        status: "new",
        notes: notes || `Captured via ${source} on ${new Date().toISOString()}`,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead", detail: insertError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Lead captured:", lead?.id, email, source);

    return new Response(
      JSON.stringify({ success: true, action: "created", id: lead?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Capture lead error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
