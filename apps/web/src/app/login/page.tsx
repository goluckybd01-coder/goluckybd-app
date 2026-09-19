'use client';
import React, { useState } from 'react';
import { AuthService } from '@goluckybd/api-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('+880');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) { setError('ফোন নম্বর ও পাসওয়ার্ড দিন'); return; }
    setLoading(true); setError('');
    const { error: err } = await AuthService.signInWithPhone(phone, password);
    if (err) { setError((err as any).message || 'লগইন ব্যর্থ'); setLoading(false); }
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0B1A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-2">🎰 GoLuckyBD</h1>
        <p className="text-center text-gray-400 mb-8">বাংলাদেশের #১ গেমিং প্ল্যাটফর্ম</p>
        <div className="bg-[#1A1730] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">লগইন করুন</h2>
          {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-xl mb-4 text-center text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">ফোন নম্বর</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#0D0B1A] border border-[#2A2745] rounded-xl p-3.5 text-white focus:border-purple-500 outline-none" placeholder="+880 1XXXXXXXXX" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">পাসওয়ার্ড</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#0D0B1A] border border-[#2A2745] rounded-xl p-3.5 text-white focus:border-purple-500 outline-none" placeholder="পাসওয়ার্ড দিন" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition disabled:opacity-50">
              {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4">অ্যাকাউন্ট নেই? <Link href="/register" className="text-purple-400 font-semibold">রেজিস্টার করুন</Link></p>
        </div>
      </div>
    </div>
  );
}
