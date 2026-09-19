-- GoLuckyBD Seed Data

INSERT INTO games (slug, name, name_bn, category, min_bet, max_bet, house_edge, is_featured, sort_order) VALUES
('wingo', 'WinGo', 'উইনগো', 'lottery', 10, 50000, 0.0300, true, 1),
('k3', 'K3', 'কে৩', 'lottery', 10, 50000, 0.0300, true, 2),
('5d', '5D Lottery', '৫ডি লটারি', 'lottery', 10, 50000, 0.0300, false, 3),
('trx-win', 'TRX Win', 'টিআরএক্স উইন', 'lottery', 10, 50000, 0.0300, false, 4),
('crash', 'Crash', 'ক্র্যাশ', 'crash', 10, 100000, 0.0250, true, 5),
('aviator', 'Aviator', 'অ্যাভিয়েটর', 'crash', 10, 100000, 0.0250, true, 6),
('moto-race', 'Moto Race', 'মোটো রেস', 'crash', 10, 50000, 0.0300, false, 7),
('mine', 'Mine', 'মাইন', 'strategy', 10, 50000, 0.0200, true, 9),
('head-tail', 'Head Tail', 'হেড টেইল', 'strategy', 10, 50000, 0.0200, false, 10),
('crypto-trading', 'Crypto Trading', 'ক্রিপ্টো ট্রেডিং', 'strategy', 50, 100000, 0.0300, false, 11),
('roulette', 'Roulette', 'রুলেট', 'casino', 50, 200000, 0.0270, true, 12),
('blackjack', 'Blackjack', 'ব্ল্যাকজ্যাক', 'casino', 50, 200000, 0.0050, false, 13),
('baccarat', 'Baccarat', 'ব্যাকারাট', 'casino', 50, 200000, 0.0106, false, 14),
('cricket', 'Cricket Betting', 'ক্রিকেট বেটিং', 'sports', 50, 500000, 0.0500, true, 16),
('football', 'Football Betting', 'ফুটবল বেটিং', 'sports', 50, 500000, 0.0500, false, 17);

INSERT INTO vip_benefits (tier, min_points, rakeback_percent, cashback_percent, withdraw_limit_daily, deposit_bonus_percent, birthday_bonus, has_personal_manager, has_exclusive_events) VALUES
('bronze', 0, 0.50, 1.00, 50000, 5, 100, false, false),
('silver', 5000, 1.00, 2.00, 100000, 10, 500, false, false),
('gold', 25000, 2.00, 3.00, 250000, 15, 2000, false, true),
('platinum', 100000, 3.00, 5.00, 500000, 20, 5000, true, true),
('diamond', 500000, 5.00, 8.00, 1000000, 30, 25000, true, true);

INSERT INTO missions (title, title_bn, reward_type, reward_amount, requirement_type, requirement_value, category, sort_order) VALUES
('First Bet', 'প্রথম বেট', 'coins', 50, 'bets_count', 1, 'daily', 1),
('5 Bets', '৫টি বেট', 'coins', 100, 'bets_count', 5, 'daily', 2),
('Deposit 1000', '১০০০ জমা', 'vip_points', 50, 'deposit_amount', 1000, 'daily', 3),
('3-Day Streak', '৩ দিন স্ট্রিক', 'coins', 200, 'login_streak', 3, 'weekly', 4);

INSERT INTO promotions (title, title_bn, promo_code, bonus_type, bonus_percent, min_deposit, max_bonus, wagering_requirement, starts_at, ends_at) VALUES
('Welcome Bonus', 'ওয়েলকাম বোনাস ১০০%', 'WELCOME100', 'deposit_match', 100, 500, 10000, 5, NOW(), NOW() + INTERVAL '1 year'),
('Daily Cashback', 'ডেইলি ক্যাশব্যাক ৫%', 'DAILY5', 'cashback', 5, 100, 5000, 1, NOW(), NOW() + INTERVAL '1 year');
