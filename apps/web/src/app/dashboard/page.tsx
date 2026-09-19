'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers';
import { WalletService, GameService, NotificationService } from '@goluckybd/api-client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isAuthenticated, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [wallets, setWallets] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login');
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([
      WalletService.getWallets(),
      GameService.getFeaturedGames(),
      NotificationService.getUnreadCount()
    ]).then(([w, g, n]) => {
      setWallets(w.wallets || []); setGames(g.games || []); setUnread(n.count); setLoading(false);
    });
  }, [isAuthenticated]);

  if (authLoading || loading) return <div className="min-h-screen bg-[#0D0B1A] flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full" /></div>;

  const bdtWallet = wallets.find(w => w.currency === 'BDT');
  const usdtWallet = wallets.find(w => w.currency === 'USDT');

  return (
    <div className="min-h-screen bg-[#0D0B1A] text-white">
      <header className="bg-[#1A1730] border-b border-[#2A2745] px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-yellow-400">🎰 GoLuckyBD</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">🔔 {unread > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">{unread}</span>}</span>
          <span className="text-sm">{user?.display_name || user?.username}</span>
          <button onClick={signOut} className="text-sm text-gray-400 hover:text-red-400">লগআউট</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6">
            <p className="text-sm text-purple-200">BDT ব্যালেন্স</p>
            <p className="text-3xl font-bold mt-1">৳{bdtWallet?.balance?.toLocaleString() || '0.00'}</p>
            <div className="flex gap-3 mt-4">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm transition">ডিপোজিট</button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm transition">উইথড্র</button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6">
            <p className="text-sm text-green-200">USDT ব্যালেন্স</p>
            <p className="text-3xl font-bold mt-1">${usdtWallet?.balance?.toLocaleString() || '0.00'}</p>
            <div className="flex gap-3 mt-4">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm transition">ডিপোজিট</button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm transition">ট্রান্সফার</button>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">🔥 ফিচার্ড গেমস</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games.map(game => (
              <div key={game.id} className="bg-[#1A1730] rounded-2xl p-4 hover:bg-[#252240] transition cursor-pointer">
                <div className="w-full h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-3xl mb-3">🎮</div>
                <h3 className="font-bold text-sm">{game.name}</h3>
                <p className="text-xs text-gray-400">{game.name_bn}</p>
                <p className="text-xs text-yellow-400 mt-1">৳{game.min_bet} - ৳{game.max_bet?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon:'🏆',label:'VIP Club',desc:'এক্সক্লুসিভ রিওয়ার্ড'},{icon:'🎯',label:'Lucky Hub',desc:'বোনাস ও মিশন'},{icon:'👥',label:'Social Feed',desc:'কমিউনিটি'},{icon:'🤝',label:'Agent',desc:'কমিশন আয়'}].map(item => (
            <div key={item.label} className="bg-[#1A1730] rounded-2xl p-5 hover:bg-[#252240] transition cursor-pointer text-center">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold mt-2">{item.label}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
