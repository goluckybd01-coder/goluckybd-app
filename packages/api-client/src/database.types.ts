export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; username: string; display_name: string | null; phone: string | null; email: string | null; avatar_url: string | null; role: 'player' | 'agent' | 'admin' | 'super_admin'; kyc_status: 'none' | 'pending' | 'verified' | 'rejected'; vip_tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'; vip_points: number; referral_code: string; referred_by: string | null; language: string; is_active: boolean; last_login_at: string | null; created_at: string; updated_at: string; };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string; username: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      wallets: {
        Row: { id: string; user_id: string; currency: string; balance: number; locked_balance: number; total_deposited: number; total_withdrawn: number; total_wagered: number; total_won: number; created_at: string; updated_at: string; };
        Insert: Partial<Database['public']['Tables']['wallets']['Row']> & { user_id: string };
        Update: Partial<Database['public']['Tables']['wallets']['Row']>;
      };
      transactions: {
        Row: { id: string; user_id: string; wallet_id: string; type: 'deposit' | 'withdraw' | 'transfer' | 'bet' | 'win' | 'bonus' | 'commission' | 'refund'; status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'; amount: number; fee: number; currency: string; payment_method: string | null; reference_id: string | null; description: string | null; metadata: Json; from_user_id: string | null; to_user_id: string | null; created_at: string; completed_at: string | null; };
        Insert: Partial<Database['public']['Tables']['transactions']['Row']> & { user_id: string; wallet_id: string; type: string; amount: number };
        Update: Partial<Database['public']['Tables']['transactions']['Row']>;
      };
      games: {
        Row: { id: string; slug: string; name: string; name_bn: string | null; category: 'lottery' | 'crash' | 'strategy' | 'casino' | 'slots' | 'sports' | 'card'; description: string | null; thumbnail_url: string | null; min_bet: number; max_bet: number; house_edge: number; is_active: boolean; is_featured: boolean; sort_order: number; config: Json; created_at: string; };
        Insert: Partial<Database['public']['Tables']['games']['Row']> & { slug: string; name: string; category: string };
        Update: Partial<Database['public']['Tables']['games']['Row']>;
      };
      bets: {
        Row: { id: string; user_id: string; game_id: string; round_id: string | null; wallet_id: string; status: 'pending' | 'active' | 'won' | 'lost' | 'cancelled' | 'refunded'; bet_amount: number; win_amount: number; multiplier: number | null; bet_data: Json; result_data: Json; currency: string; created_at: string; settled_at: string | null; };
        Insert: Partial<Database['public']['Tables']['bets']['Row']> & { user_id: string; game_id: string; wallet_id: string; bet_amount: number };
        Update: Partial<Database['public']['Tables']['bets']['Row']>;
      };
      posts: {
        Row: { id: string; user_id: string; type: 'text' | 'image' | 'bet_share' | 'win_share'; content: string | null; image_url: string | null; bet_id: string | null; likes_count: number; comments_count: number; shares_count: number; is_pinned: boolean; is_hidden: boolean; created_at: string; };
        Insert: Partial<Database['public']['Tables']['posts']['Row']> & { user_id: string };
        Update: Partial<Database['public']['Tables']['posts']['Row']>;
      };
      notifications: {
        Row: { id: string; user_id: string; type: 'system' | 'promotion' | 'transaction' | 'game' | 'social' | 'vip' | 'agent'; title: string; title_bn: string | null; body: string | null; body_bn: string | null; data: Json; is_read: boolean; created_at: string; };
        Insert: Partial<Database['public']['Tables']['notifications']['Row']> & { user_id: string; type: string; title: string };
        Update: Partial<Database['public']['Tables']['notifications']['Row']>;
      };
    };
    Functions: { update_wallet_balance: { Args: { p_wallet_id: string; p_amount: number; p_type: string }; Returns: boolean; }; };
  };
};
