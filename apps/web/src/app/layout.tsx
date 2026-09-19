import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
export const metadata: Metadata = { title: 'GoLuckyBD — বাংলাদেশের প্রিমিয়াম গেমিং প্লাটফর্ম', description: 'GoLuckyBD — গেম, বেটিং, এবং ডিজিটাল এন্টারটেইনমেন্ট প্ল্যাটফর্ম' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="bn" className={inter.variable}><body className="antialiased">{children}</body></html>);
}
