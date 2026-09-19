import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GoLuckyBD - বাংলাদেশের #১ গেমিং প্ল্যাটফর্ম',
  description: 'GoLuckyBD - প্রিমিয়াম গেমিং, বেটিং এবং ডিজিটাল এন্টারটেইনমেন্ট প্ল্যাটফর্ম। WinGo, Aviator, Crash এবং আরও অনেক গেম খেলুন।',
  keywords: ['GoLuckyBD', 'gaming', 'Bangladesh', 'betting', 'lottery', 'crash', 'aviator'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
