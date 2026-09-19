import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// GoLuckyBD Supabase Configuration
// URL and anon key are public (secured by Row Level Security)
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://fdvbtixztjusgidkpioh.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdmJ0aXh6dGp1c2dpZGtwaW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5Mzk1OTcsImV4cCI6MjA4NDUxNTU5N30.Ac3di_2SEm_opo0hvXerFjtCzfEw6HbDElDDv6-UQIs';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export function createSupabaseClient(
  url?: string,
  key?: string
): SupabaseClient<Database> {
  return createClient<Database>(
    url || SUPABASE_URL,
    key || SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: true, persistSession: true } }
  );
}
