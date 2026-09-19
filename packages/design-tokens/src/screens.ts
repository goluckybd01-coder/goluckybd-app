export const screenSections = {
  auth: { label: 'Auth & Onboarding', screens: ['splash','onboarding-1','onboarding-2','onboarding-3','login','signup','otp-verification','forgot-password'] },
  home: { label: 'হোম', screens: ['home','notifications','notification-detail','search','search-results','announcements','promotions','promotion-detail'] },
  games: { label: 'গেমস', screens: ['games-lobby','game-detail','game-history','game-leaderboard','wingo','k3','5d-lottery','trx-win','crash','aviator','moto-race','video-wingo','mine','head-tail','crypto-trading','live-casino-lobby','roulette','blackjack','baccarat','dragon-tiger','slots-lobby','slot-detail','sports-lobby','cricket-betting','football-betting','match-detail','bet-slip','live-match'] },
  luckyHub: { label: 'লাকি হাব', screens: ['lucky-hub-main','spin-wheel','spin-result','scratch-card','scratch-result','daily-bonus','bonus-calendar','treasure-hunt','mystery-box','lucky-draw','draw-result','referral-bonus'] },
  rewards: { label: 'রিওয়ার্ডস', screens: ['rewards-main','daily-checkin','missions','mission-detail','achievements','achievement-detail','rakeback','cashback','bonus-history','redeem','redeem-success','referral-program','referral-leaderboard'] },
  socialFeed: { label: 'সোশ্যাল ফিড', screens: ['social-feed','post-detail','create-post','other-user-profile','followers-list','following-list','share-bet','share-bet-detail','live-chat','chat-room','report-post','social-leaderboard'] },
  agent: { label: 'এজেন্ট', screens: ['agent-dashboard','agent-register','agent-commission','agent-team','agent-downline','agent-transfer','agent-transfer-history','agent-qr-code','agent-support','agent-reports','agent-settings','agent-promo-materials'] },
  wallet: { label: 'ওয়ালেট', screens: ['wallet-home','wallet-crypto-detail','crypto-convert','deposit-centre','bkash-deposit','nagad-deposit','rocket-deposit','bank-transfer','deposit-history','withdraw','withdraw-history','payment-add-method','transaction-detail','transaction-history','qr-payment'] },
  vip: { label: 'VIP Club', screens: ['vip-main','vip-tiers','vip-exclusive-events','vip-upgrade-progress','vip-benefits','vip-transaction-history','vip-personal-manager','vip-birthday-bonus'] },
  profile: { label: 'প্রোফাইল', screens: ['profile-main','edit-profile','security-settings','change-password','two-factor-auth','kyc-verification','kyc-document-upload','kyc-status','language-settings','notification-settings','app-settings','help-support','faq','live-support-chat','about-us','terms-conditions','privacy-policy','responsible-gaming'] },
  error: { label: 'Error States', screens: ['no-internet','server-error','maintenance-mode','404-not-found'] },
} as const;

export const screens = Object.entries(screenSections).flatMap(
  ([section, data]) => data.screens.map((screen) => ({ section, screen, routeName: `${section}/${screen}` }))
);
export type ScreenSection = keyof typeof screenSections;
