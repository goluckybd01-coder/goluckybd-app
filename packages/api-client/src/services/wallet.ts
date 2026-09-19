import { supabase } from '../supabase';

export const WalletService = {
  async getWallets() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { wallets: null, error: 'Not authenticated' };
    const { data, error } = await supabase.from('wallets').select('*').eq('user_id', user.id);
    return { wallets: data, error };
  },
  async getWallet(currency: 'BDT' | 'USDT' = 'BDT') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { wallet: null, error: 'Not authenticated' };
    const { data, error } = await supabase.from('wallets').select('*').eq('user_id', user.id).eq('currency', currency).single();
    return { wallet: data, error };
  },
  async requestDeposit(params: { amount: number; payment_method: string; currency?: string; reference_id?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { wallets } = await WalletService.getWallets();
    const wallet = wallets?.find(w => w.currency === (params.currency || 'BDT'));
    if (!wallet) return { error: 'Wallet not found' };
    const { data, error } = await supabase.from('transactions').insert({ user_id: user.id, wallet_id: wallet.id, type: 'deposit', amount: params.amount, payment_method: params.payment_method, reference_id: params.reference_id, currency: params.currency || 'BDT', status: 'pending' }).select().single();
    return { transaction: data, error };
  },
  async requestWithdraw(params: { amount: number; payment_method: string; account_number: string; currency?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { wallets } = await WalletService.getWallets();
    const wallet = wallets?.find(w => w.currency === (params.currency || 'BDT'));
    if (!wallet || wallet.balance < params.amount) return { error: 'Insufficient balance' };
    const { data, error } = await supabase.from('transactions').insert({ user_id: user.id, wallet_id: wallet.id, type: 'withdraw', amount: params.amount, payment_method: params.payment_method, currency: params.currency || 'BDT', status: 'pending', metadata: { account_number: params.account_number } }).select().single();
    return { transaction: data, error };
  },
  async getTransactions(params?: { type?: string; limit?: number; offset?: number }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { transactions: null, error: 'Not authenticated' };
    let query = supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(params?.limit || 20);
    if (params?.type) query = query.eq('type', params.type);
    const { data, error } = await query;
    return { transactions: data, error };
  },
  async getPaymentMethods() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { methods: null, error: 'Not authenticated' };
    const { data, error } = await supabase.from('payment_methods').select('*').eq('user_id', user.id);
    return { methods: data, error };
  },
  async addPaymentMethod(params: { method: string; account_name: string; account_number: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data, error } = await supabase.from('payment_methods').insert({ user_id: user.id, ...params }).select().single();
    return { data, error };
  },
};
