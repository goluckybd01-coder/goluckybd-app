'use client';
import React, { useState } from 'react';
import { AuthService } from '@goluckybd/api-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('+880');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !phone || !password) { setError('সব তথ্য পূরণ করুন'); return; }
    if (password !== confirmPassword) { setError('পাসওয়ার্ড মিলছে না'); return; }
    setLoading(true); setError('');
    const { error: err } = await AuthService.signUpWithPhone(phone, password, username);
    if (err) { setError((err as any).message || 'রেজিস্ট্রেশন ব্যর্থ'); setLoading(false); }
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0B1A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-2">🎰 GoLuckyBD</h1>
        <div className="bg-[#1A1730] rounded-2xl p-8 mt-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">রেজিস্টার করুন</h2>
          {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-xl mb-4 text-center text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="text-gray-400 text-sm mb-1 block">ইউজারনেম</label><input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-[#0D0B1A] border border-[#2A2745] rounded-xl p-3.5 text-white focus:border-purple-500 outline-none" /></div>
            <div><label className="text-gray-400 text-sm mb-1 block">ফোন নম্বর</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#0D0B1A] border border-[#2A2745] rounded-xl p-3.5 text-white focus:border-purple-500 outline-none" /></div>
            <div><label className="text-gray-400 text-sm mb-1 block">পাসওয়ার্ড</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#0D0B1A] border border-[#2A2745] rounded-xl p-3.5 text-white focus:border-purple-500 outline-none" /></div>
            <div><label className="text-gray-400 text-sm mb-1 block">পাসওয়ার্ড নিশ্চিত করুন</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-[#0D0B1A] border border-[#2A2745] rounded-xl p-3.5 text-white focus:border-purple-500 outline-none" /></div>
            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition disabled:opacity-50">
              {loading ? 'রেজিস্টার হচ্ছে...' : 'রেজিস্টার'}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4">অ্যাকাউন্ট আছে? <Link href="/login" className="text-purple-400 font-semibold">লগইন করুন</Link></p>
        </div>
      </div>
    </div>
  );
}
