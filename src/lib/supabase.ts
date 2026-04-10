import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function createSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    );
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

let clientInstance: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (!clientInstance) {
    clientInstance = createSupabaseClient();
  }
  return clientInstance;
}

// For backward compatibility
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    return Reflect.get(getSupabase(), prop);
  },
});
