import { supabase } from '../supabase';

export const GameService = {
  async getGames(category?: string) {
    let query = supabase.from('games').select('*').eq('is_active', true).order('sort_order');
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    return { games: data, error };
  },
  async getFeaturedGames() {
    const { data, error } = await supabase.from('games').select('*').eq('is_active', true).eq('is_featured', true).order('sort_order');
    return { games: data, error };
  },
  async getGame(slug: string) {
    const { data, error } = await supabase.from('games').select('*').eq('slug', slug).single();
    return { game: data, error };
  },
  async getCurrentRound(gameId: string) {
    const { data, error } = await supabase.from('game_rounds').select('*').eq('game_id', gameId).in('status', ['waiting', 'active']).order('round_number', { ascending: false }).limit(1).single();
    return { round: data, error };
  },
  async getRoundHistory(gameId: string, limit = 20) {
    const { data, error } = await supabase.from('game_rounds').select('*').eq('game_id', gameId).eq('status', 'completed').order('round_number', { ascending: false }).limit(limit);
    return { rounds: data, error };
  },
  async placeBet(params: { game_id: string; round_id?: string; bet_amount: number; bet_data: Record<string, any>; currency?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data: wallet } = await supabase.from('wallets').select('id, balance').eq('user_id', user.id).eq('currency', params.currency || 'BDT').single();
    if (!wallet || wallet.balance < params.bet_amount) return { error: 'Insufficient balance' };
    const { data, error } = await supabase.from('bets').insert({ user_id: user.id, game_id: params.game_id, round_id: params.round_id, wallet_id: wallet.id, bet_amount: params.bet_amount, bet_data: params.bet_data, currency: params.currency || 'BDT', status: 'active' }).select().single();
    return { bet: data, error };
  },
  async getBetHistory(params?: { game_id?: string; limit?: number }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { bets: null, error: 'Not authenticated' };
    let query = supabase.from('bets').select('*, games(name, name_bn, slug, category)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(params?.limit || 20);
    if (params?.game_id) query = query.eq('game_id', params.game_id);
    const { data, error } = await query;
    return { bets: data, error };
  },
  subscribeToRound(gameId: string, callback: (payload: any) => void) {
    return supabase.channel(`game-${gameId}`).on('postgres_changes', { event: '*', schema: 'public', table: 'game_rounds', filter: `game_id=eq.${gameId}` }, callback).subscribe();
  },
};
