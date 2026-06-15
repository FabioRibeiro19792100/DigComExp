import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const PLAN_SLUG = import.meta.env.VITE_SUPABASE_PLAN_SLUG || "expedicao-roblox-2026";

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function hasSupabase() {
  return Boolean(supabase);
}

export async function loadRemotePlanState(planSlug) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("plan_states")
    .select("schedule, current_week")
    .eq("plan_slug", planSlug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    weekData: data.schedule || null,
    currentWeek: data.current_week || 1,
  };
}

export async function saveRemotePlanState(planSlug, weekData, currentWeek) {
  if (!supabase) {
    return;
  }

  const payload = {
    plan_slug: planSlug,
    schedule: weekData,
    current_week: currentWeek,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("plan_states").upsert(payload, {
    onConflict: "plan_slug",
  });

  if (error) {
    throw error;
  }
}
