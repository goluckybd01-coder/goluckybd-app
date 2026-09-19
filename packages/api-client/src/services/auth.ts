import { supabase } from '../supabase';

export const AuthService = {
  async signUpWithPhone(phone: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({ phone, password, options: { data: { username } } });
    return { data, error };
  },
  async signInWithPhone(phone: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ phone, password });
    return { data, error };
  },
  async sendOTP(phone: string) {
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    return { data, error };
  },
  async verifyOTP(phone: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    return { data, error };
  },
  async signOut() { return await supabase.auth.signOut(); },
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { profile: null, error: 'Not authenticated' };
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return { profile: data, error };
  },
  async updateProfile(updates: { display_name?: string; avatar_url?: string; language?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', user.id).select().single();
    return { data, error };
  },
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
