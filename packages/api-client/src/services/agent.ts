import { supabase } from '../supabase';

export const AgentService = {
  async register() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const agentCode = 'AG' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase.from('agents').insert({ user_id: user.id, agent_code: agentCode }).select().single();
    if (!error) await supabase.from('profiles').update({ role: 'agent' }).eq('id', user.id);
    return { agent: data, error };
  },
  async getDashboard() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data: agent } = await supabase.from('agents').select('*').eq('user_id', user.id).single();
    if (!agent) return { error: 'Not an agent' };
    const { data: team } = await supabase.from('profiles').select('id, username, display_name, avatar_url, vip_tier, created_at').eq('referred_by', user.id);
    const { data: commissions } = await supabase.from('agent_commissions').select('*, profiles:from_user_id(username)').eq('agent_id', agent.id).order('created_at', { ascending: false }).limit(20);
    return { agent, team: team || [], commissions: commissions || [] };
  },
  async getCommissions(limit = 20) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data: agent } = await supabase.from('agents').select('id').eq('user_id', user.id).single();
    if (!agent) return { error: 'Not an agent' };
    const { data, error } = await supabase.from('agent_commissions').select('*, profiles:from_user_id(username, display_name)').eq('agent_id', agent.id).order('created_at', { ascending: false }).limit(limit);
    return { commissions: data, error };
  },
  async transferToUser(targetUsername: string, amount: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data: target } = await supabase.from('profiles').select('id').eq('username', targetUsername).single();
    if (!target) return { error: 'User not found' };
    const { data: wallet } = await supabase.from('wallets').select('id, balance').eq('user_id', user.id).eq('currency', 'BDT').single();
    if (!wallet || wallet.balance < amount) return { error: 'Insufficient balance' };
    const { data, error } = await supabase.from('transactions').insert({ user_id: user.id, wallet_id: wallet.id, type: 'transfer', amount, from_user_id: user.id, to_user_id: target.id, status: 'completed' }).select().single();
    return { transaction: data, error };
  },
};
