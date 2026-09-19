import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});

export function createSupabaseClient(url?: string, key?: string): SupabaseClient<Database> {
  return createClient<Database>(url || SUPABASE_URL, key || SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: true, persistSession: true },
  });
}
