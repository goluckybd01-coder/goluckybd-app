-- GoLuckyBD — Complete Database Schema (Supabase / PostgreSQL 15+)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUMS
CREATE TYPE user_role AS ENUM ('player', 'agent', 'admin', 'super_admin');
CREATE TYPE kyc_status AS ENUM ('none', 'pending', 'verified', 'rejected');
CREATE TYPE vip_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'diamond');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdraw', 'transfer', 'bet', 'win', 'bonus', 'commission', 'refund');
CREATE TYPE transaction_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('bkash', 'nagad', 'rocket', 'bank_transfer', 'usdt_trc20', 'usdt_erc20');
CREATE TYPE game_category AS ENUM ('lottery', 'crash', 'strategy', 'casino', 'slots', 'sports', 'card');
CREATE TYPE bet_status AS ENUM ('pending', 'active', 'won', 'lost', 'cancelled', 'refunded');
CREATE TYPE post_type AS ENUM ('text', 'image', 'bet_share', 'win_share');
CREATE TYPE notification_type AS ENUM ('system', 'promotion', 'transaction', 'game', 'social', 'vip', 'agent');

-- PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL, display_name TEXT, phone TEXT UNIQUE, email TEXT, avatar_url TEXT,
  role user_role DEFAULT 'player', kyc_status kyc_status DEFAULT 'none',
  vip_tier vip_tier DEFAULT 'bronze', vip_points INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE DEFAULT UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8)),
  referred_by UUID REFERENCES profiles(id), language TEXT DEFAULT 'bn',
  is_active BOOLEAN DEFAULT true, last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_phone ON profiles(phone);
CREATE INDEX idx_profiles_referral ON profiles(referral_code);

-- WALLETS
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  currency TEXT NOT NULL DEFAULT 'BDT',
  balance DECIMAL(18,2) DEFAULT 0.00, locked_balance DECIMAL(18,2) DEFAULT 0.00,
  total_deposited DECIMAL(18,2) DEFAULT 0.00, total_withdrawn DECIMAL(18,2) DEFAULT 0.00,
  total_wagered DECIMAL(18,2) DEFAULT 0.00, total_won DECIMAL(18,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, currency)
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id), wallet_id UUID NOT NULL REFERENCES wallets(id),
  type transaction_type NOT NULL, status transaction_status DEFAULT 'pending',
  amount DECIMAL(18,2) NOT NULL, fee DECIMAL(18,2) DEFAULT 0.00, currency TEXT DEFAULT 'BDT',
  payment_method payment_method, reference_id TEXT, description TEXT, metadata JSONB DEFAULT '{}',
  from_user_id UUID REFERENCES profiles(id), to_user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(), completed_at TIMESTAMPTZ
);
CREATE INDEX idx_transactions_user ON transactions(user_id, created_at DESC);

-- PAYMENT METHODS
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  method payment_method NOT NULL, account_name TEXT, account_number TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false, is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GAMES
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL, name_bn TEXT,
  category game_category NOT NULL, description TEXT, thumbnail_url TEXT,
  min_bet DECIMAL(18,2) DEFAULT 10.00, max_bet DECIMAL(18,2) DEFAULT 100000.00,
  house_edge DECIMAL(5,4) DEFAULT 0.0300, is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false, sort_order INTEGER DEFAULT 0,
  config JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GAME ROUNDS
CREATE TABLE game_rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID NOT NULL REFERENCES games(id), round_number BIGINT NOT NULL,
  status TEXT DEFAULT 'waiting', result JSONB, hash TEXT, salt TEXT,
  started_at TIMESTAMPTZ, ended_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_game_rounds_unique ON game_rounds(game_id, round_number);

-- BETS
CREATE TABLE bets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id), game_id UUID NOT NULL REFERENCES games(id),
  round_id UUID REFERENCES game_rounds(id), wallet_id UUID NOT NULL REFERENCES wallets(id),
  status bet_status DEFAULT 'pending', bet_amount DECIMAL(18,2) NOT NULL,
  win_amount DECIMAL(18,2) DEFAULT 0.00, multiplier DECIMAL(10,4),
  bet_data JSONB DEFAULT '{}', result_data JSONB DEFAULT '{}', currency TEXT DEFAULT 'BDT',
  created_at TIMESTAMPTZ DEFAULT NOW(), settled_at TIMESTAMPTZ
);
CREATE INDEX idx_bets_user ON bets(user_id, created_at DESC);
CREATE INDEX idx_bets_round ON bets(round_id);

-- VIP
CREATE TABLE vip_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), tier vip_tier NOT NULL,
  min_points INTEGER NOT NULL, rakeback_percent DECIMAL(5,2) DEFAULT 0.00,
  cashback_percent DECIMAL(5,2) DEFAULT 0.00, withdraw_limit_daily DECIMAL(18,2),
  deposit_bonus_percent DECIMAL(5,2) DEFAULT 0.00, birthday_bonus DECIMAL(18,2) DEFAULT 0.00,
  has_personal_manager BOOLEAN DEFAULT false, has_exclusive_events BOOLEAN DEFAULT false,
  benefits_json JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AGENTS
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id),
  agent_code TEXT UNIQUE NOT NULL, parent_agent_id UUID REFERENCES agents(id),
  commission_rate DECIMAL(5,2) DEFAULT 5.00, total_commission DECIMAL(18,2) DEFAULT 0.00,
  total_referrals INTEGER DEFAULT 0, total_team_size INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1, status TEXT DEFAULT 'active', qr_code_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE agent_commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id), from_user_id UUID NOT NULL REFERENCES profiles(id),
  bet_id UUID REFERENCES bets(id), amount DECIMAL(18,2) NOT NULL, rate DECIMAL(5,2) NOT NULL,
  level INTEGER DEFAULT 1, status TEXT DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LUCKY HUB
CREATE TABLE daily_bonuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  day_number INTEGER NOT NULL, amount DECIMAL(18,2) NOT NULL, bonus_type TEXT DEFAULT 'daily_checkin',
  claimed_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE spin_wheel_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  prize_type TEXT NOT NULL, prize_amount DECIMAL(18,2), prize_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE scratch_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  prize_amount DECIMAL(18,2) DEFAULT 0.00, is_winner BOOLEAN DEFAULT false,
  is_scratched BOOLEAN DEFAULT false, expires_at TIMESTAMPTZ, scratched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MISSIONS
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL, title_bn TEXT, description TEXT, description_bn TEXT,
  reward_type TEXT DEFAULT 'coins', reward_amount DECIMAL(18,2) NOT NULL,
  requirement_type TEXT NOT NULL, requirement_value DECIMAL(18,2) NOT NULL,
  category TEXT DEFAULT 'daily', icon_url TEXT, is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE user_missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id), mission_id UUID NOT NULL REFERENCES missions(id),
  progress DECIMAL(18,2) DEFAULT 0.00, is_completed BOOLEAN DEFAULT false,
  is_claimed BOOLEAN DEFAULT false, completed_at TIMESTAMPTZ, claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOCIAL
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  type post_type DEFAULT 'text', content TEXT, image_url TEXT, bet_id UUID REFERENCES bets(id),
  likes_count INTEGER DEFAULT 0, comments_count INTEGER DEFAULT 0, shares_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false, is_hidden BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE post_likes (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(post_id, user_id));
CREATE TABLE post_comments (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES profiles(id), content TEXT NOT NULL, parent_comment_id UUID REFERENCES post_comments(id), likes_count INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE follows (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), follower_id UUID NOT NULL REFERENCES profiles(id), following_id UUID NOT NULL REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(follower_id, following_id));

-- NOTIFICATIONS
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  type notification_type NOT NULL, title TEXT NOT NULL, title_bn TEXT, body TEXT, body_bn TEXT,
  data JSONB DEFAULT '{}', is_read BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);

-- PROMOTIONS
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), title TEXT NOT NULL, title_bn TEXT,
  description TEXT, description_bn TEXT, banner_url TEXT, promo_code TEXT UNIQUE,
  bonus_type TEXT DEFAULT 'deposit_match', bonus_value DECIMAL(18,2), bonus_percent DECIMAL(5,2),
  min_deposit DECIMAL(18,2), max_bonus DECIMAL(18,2), wagering_requirement DECIMAL(5,2) DEFAULT 1.00,
  starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ, is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KYC
CREATE TABLE kyc_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  document_type TEXT NOT NULL, document_number TEXT, front_image_url TEXT, back_image_url TEXT,
  selfie_url TEXT, status kyc_status DEFAULT 'pending', rejection_reason TEXT,
  verified_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUPPORT
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID NOT NULL REFERENCES profiles(id),
  subject TEXT NOT NULL, category TEXT DEFAULT 'general', status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal', created_at TIMESTAMPTZ DEFAULT NOW(), resolved_at TIMESTAMPTZ
);
CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), ticket_id UUID NOT NULL REFERENCES support_tickets(id),
  sender_id UUID NOT NULL REFERENCES profiles(id), message TEXT NOT NULL, is_staff BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own wallet" ON wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own bets" ON bets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authenticated can view posts" ON posts FOR SELECT USING (auth.role() = 'authenticated' AND is_hidden = false);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage own payment methods" ON payment_methods FOR ALL USING (auth.uid() = user_id);

-- TRIGGERS
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, phone) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || SUBSTRING(NEW.id::TEXT FROM 1 FOR 8)), NEW.email, NEW.phone);
  INSERT INTO public.wallets (user_id, currency) VALUES (NEW.id, 'BDT');
  INSERT INTO public.wallets (user_id, currency) VALUES (NEW.id, 'USDT');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_wallet_balance(p_wallet_id UUID, p_amount DECIMAL, p_type TEXT) RETURNS BOOLEAN AS $$
DECLARE v_balance DECIMAL;
BEGIN
  SELECT balance INTO v_balance FROM wallets WHERE id = p_wallet_id FOR UPDATE;
  IF p_type IN ('withdraw', 'bet') AND v_balance < p_amount THEN RETURN FALSE; END IF;
  IF p_type IN ('deposit', 'win', 'bonus', 'refund', 'commission') THEN UPDATE wallets SET balance = balance + p_amount, updated_at = NOW() WHERE id = p_wallet_id;
  ELSE UPDATE wallets SET balance = balance - p_amount, updated_at = NOW() WHERE id = p_wallet_id; END IF;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
